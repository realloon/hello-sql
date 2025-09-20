import type { WorkerMessage, SqliteVersion, ExecResult } from '@/types'
import { ref, onMounted, onUnmounted, readonly } from 'vue'

let worker: Worker | null = null
const onReadyCallbacks: (() => void)[] = []
const activeHookCount = ref(0)

const isReady = ref(false)
const error = ref<string | null>(null)
const result = ref<ExecResult>([])
const version = ref<SqliteVersion | null>(null)

function init() {
  if (worker) return

  worker = new Worker(new URL('../sqlite.worker.ts', import.meta.url), {
    type: 'module',
  })

  worker.onmessage = (event: MessageEvent<WorkerMessage>) => {
    const { data } = event
    error.value = null

    switch (data.type) {
      case 'ready':
        isReady.value = true
        worker?.postMessage({ type: 'get_version' })
        onReadyCallbacks.forEach(callback => callback())
        onReadyCallbacks.length = 0
        break

      case 'version_result':
        version.value = data.results
        break

      case 'exec_result':
        result.value = data.results
        break

      case 'error':
        error.value = data.message
        break
    }
  }

  worker.onerror = e => {
    error.value = `Worker error: ${e.message}`
    isReady.value = false
  }
}

function uninit() {
  if (!worker) return

  worker.terminate()
  // reset stats
  worker = null
  isReady.value = false
  result.value = []
  version.value = null
  onReadyCallbacks.length = 0
}

function onReady(callback: () => void) {
  if (isReady.value) {
    callback()
  } else {
    onReadyCallbacks.push(callback)
  }
}

function exec(sql: string) {
  if (worker === null || !isReady.value) {
    error.value = 'Worker is not ready to execute query.'
    return
  }

  result.value = []
  worker.postMessage({ type: 'exec', sql })
}

function clear() {
  result.value = []
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
    version: readonly(version),
    result: readonly(result),
    error: readonly(error),
    onReady,
    exec,
    clear,
  }
}
