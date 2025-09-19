export interface WorkerMessage {
  type: 'ready' | 'result' | 'error'
  results?: unknown
  message?: string
  id?: number // 响应消息现在也包含 id
}

export interface PromiseCallbacks {
  resolve: (value: unknown) => void
  reject: (reason?: unknown) => void
}
