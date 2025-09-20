import type { Sqlite3Static, Database } from '@sqlite.org/sqlite-wasm'
import sqlite3InitModule from '@sqlite.org/sqlite-wasm'

let db: Database | null = null
let sqlite3: Sqlite3Static

const start = async () => {
  try {
    sqlite3 = await sqlite3InitModule({
      print: console.log,
      printErr: console.error,
    })

    db = new sqlite3.oo1.DB(':memory:', 'c')

    self.postMessage({ type: 'ready' })
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error('Worker: Init or database setup failed', err)
      self.postMessage({ type: 'error', message: err.message })
    } else {
      throw err
    }
  }
}

// Listen for messages from the main thread
// Messages now contain an id attribute
self.onmessage = (
  e: MessageEvent<{ type: string; sql: string; id: number }>
) => {
  if (!db) {
    const errorMsg = 'Worker: The database is not ready yet.'
    console.warn(errorMsg)
    self.postMessage({ type: 'error', message: errorMsg, id: e.data.id })
    return
  }

  const { type, sql, id } = e.data

  if (type === 'exec') {
    try {
      const rows: any[] = []

      db.exec(sql, {
        resultRows: rows,
        rowMode: 'object',
      })

      self.postMessage({ type: 'result', results: rows, id })
    } catch (err: any) {
      console.error('Worker: Error executing SQL', err)
      self.postMessage({ type: 'error', message: err.message, id })
    }
  }
}

start()
