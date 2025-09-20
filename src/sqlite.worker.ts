import type { Sqlite3Static, Database, SqlValue } from '@sqlite.org/sqlite-wasm'
import type { ExecResult, MainThreadMessage, WorkerMessage } from '@/types'
import sqlite3InitModule from '@sqlite.org/sqlite-wasm'

let db: Database | null = null
let sqlite3: Sqlite3Static | null = null

// init
try {
  sqlite3 = await sqlite3InitModule({
    print: console.log,
    printErr: console.error,
  })

  db = new sqlite3.oo1.DB(':memory:', 'c')

  self.postMessage({ type: 'ready' })
} catch (err: unknown) {
  const message =
    err instanceof Error
      ? err.message
      : 'An unknown error occurred during init.'
  self.postMessage({ type: 'error', message })
}

// Listen for messages from the main thread
// Messages now contain an id attribute
self.onmessage = (event: MessageEvent<MainThreadMessage>) => {
  const { data } = event

  switch (data.type) {
    case 'get_version':
      if (sqlite3) {
        self.postMessage({
          type: 'version_result',
          results: sqlite3.version,
        } satisfies WorkerMessage)
      } else {
        self.postMessage({
          type: 'error',
          message: 'Worker: sqlite3 is not yet initialized.',
        } satisfies WorkerMessage)
      }
      break

    case 'exec':
      if (!db) {
        self.postMessage({
          type: 'error',
          message: 'Worker: The database is not ready yet.',
        } satisfies WorkerMessage)
        return
      }

      try {
        const rows: ExecResult = []

        db.exec(data.sql, {
          resultRows: rows,
          rowMode: 'object',
        })

        self.postMessage({
          type: 'exec_result',
          results: rows,
        } satisfies WorkerMessage)
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : 'An unknown error occurred during exec.'

        self.postMessage({
          type: 'error',
          message,
        })
      }
      break
  }
}
