import type { SqlValue, Sqlite3Static } from '@sqlite.org/sqlite-wasm'

export type SqliteVersion = Sqlite3Static['version']
export type ExecResult = Record<string, SqlValue>[]

// MainThreadMessage
export type MainThreadMessage = GetVersionMessage | ExecMessage

interface GetVersionMessage {
  type: 'get_version'
}

interface ExecMessage {
  type: 'exec'
  sql: string
}

// WorkerMessage
export type WorkerMessage =
  | ReadyMessage
  | VersionResultMessage
  | ExecResultMessage
  | ErrorMessage

interface ReadyMessage {
  type: 'ready'
}

interface VersionResultMessage {
  type: 'version_result'
  results: SqliteVersion
}

interface ExecResultMessage {
  type: 'exec_result'
  results: ExecResult
}

interface ErrorMessage {
  type: 'error'
  message: string
}
