import type { PromiseCallbacks, WorkerMessage } from '@/types'
import { ref, onMounted, onUnmounted, readonly } from 'vue'

let worker: Worker | null = null
let requestId = 0

const pendingPromises = new Map<number, PromiseCallbacks>()
const onReadyCallbacks: (() => Promise<void>)[] = []

const isReady = ref(false)
const error = ref<string | null>(null)
const activeHookCount = ref(0)

function init() {
  if (worker) return

  worker = new Worker(new URL('../sqlite.worker.ts', import.meta.url), {
    type: 'module',
  })

  worker.onmessage = (e: MessageEvent<WorkerMessage>) => {
    const { type, message, results, id } = e.data

    if (type === 'ready') {
      isReady.value = true
      onReadyCallbacks.forEach(async callback => await callback())
      onReadyCallbacks.length = 0
      return
    }

    if (id && pendingPromises.has(id)) {
      const promise = pendingPromises.get(id)!
      if (type === 'result') {
        promise.resolve(results)
      } else if (type === 'error') {
        promise.reject(new Error(message))
      }
      pendingPromises.delete(id)
    } else if (type === 'error') {
      error.value = message ?? 'An unknown worker error occurred.'
    }
  }

  worker.onerror = e => {
    error.value = `Worker error: ${e.message}`
    isReady.value = false
  }
}

function uninit() {
  if (!worker) return

  for (const promise of pendingPromises.values()) {
    promise.reject(new Error('SQLite Worker was terminated.'))
  }

  worker.terminate()

  // reset stats
  worker = null
  isReady.value = false
  pendingPromises.clear()
  onReadyCallbacks.length = 0
  requestId = 0
}

async function onReady(callback: () => Promise<void>) {
  if (isReady.value) {
    await callback()
  } else {
    onReadyCallbacks.push(callback)
  }
}

async function exec(sql: string): Promise<any> {
  if (worker === null || !isReady.value) {
    throw new Error('Worker is not ready to execute query.')
  }

  return new Promise((resolve, reject) => {
    const id = ++requestId
    pendingPromises.set(id, { resolve, reject })
    worker?.postMessage({ type: 'exec', sql, id })
  })
}

export function useSQLite() {
  onMounted(() => {
    if (activeHookCount.value === 0) {
      init()
    }

    activeHookCount.value++
  })

  onUnmounted(() => {
    activeHookCount.value--

    if (activeHookCount.value === 0) {
      uninit()
    }
  })

  return {
    isReady: readonly(isReady),
    error: readonly(error),
    exec,
    onReady,
  }
}
