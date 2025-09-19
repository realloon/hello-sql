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

    // db.exec(preSql)
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error('Worker: 初始化或数据库设置失败', err)
      self.postMessage({ type: 'error', message: err.message })
    } else {
      throw err
    }
  }
}

// 监听来自主线程的消息
// 消息中现在包含一个 id 属性
self.onmessage = (
  e: MessageEvent<{ type: string; sql: string; id: number }>
) => {
  if (!db) {
    const errorMsg = 'Worker: 数据库尚未就绪。'
    console.warn(errorMsg)
    // 同样，在错误消息中也返回 id
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
      // ✅ 在结果中返回 id
      self.postMessage({ type: 'result', results: rows, id })
    } catch (err: any) {
      console.error('Worker: 执行 SQL 时出错', err)
      // ✅ 在错误中返回 id
      self.postMessage({ type: 'error', message: err.message, id })
    }
  }
}

start()
