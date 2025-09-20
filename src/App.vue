<script setup lang="ts">
//
import { ref } from 'vue'
// Hooks
import { useSQLite } from '@/hooks/useSQLite'
// Components
import AppAside from './containers/AppAside/AppAside.vue'
import SQLEditor from './components/SQLEditor.vue'
import ResultTable from './components/ResultTable.vue'
import Message from './components/Message.vue'

const { error, exec } = useSQLite()

const sql = ref('SELECT * FROM Products;')

const queryResult = ref<any>(null)
const isLoading = ref(false)
const componentError = ref<string | null>(null)

async function hanldExec() {
  isLoading.value = true
  componentError.value = null
  queryResult.value = null

  try {
    const result = await exec(sql.value)
    queryResult.value = result
  } catch (error: unknown) {
    if (error instanceof Error) {
      componentError.value = error.message
    } else {
      throw error
    }
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <AppAside />

  <main>
    <SQLEditor v-model="sql" :handle="hanldExec" :disabled="isLoading" />

    <ResultTable :query-result="queryResult" />

    <Message :message="componentError ?? error" />
  </main>
</template>

<style scoped>
main {
  box-sizing: border-box;
  width: min(1080px, 100%);
  padding: 16px;
  margin-inline: auto;
}
</style>
