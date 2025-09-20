<script setup lang="ts">
import preSql from '@/assets/sql/TYSQL.sql?raw'
import { ref } from 'vue'
// Components
import Select from '@/components/Select.vue'
import DatabaseStat from './components/DatabaseStat.vue'
import SQLiteInfo from './components/SQLiteInfo.vue'
import Details from '@/components/Details.vue'
// Hooks
import { useSQLite } from '@/hooks/useSQLite'

const { version, isReady, exec, onReady } = useSQLite()

const preExecuteOptions = ['TYSQL', 'Custom']
const preExecute = ref(preExecuteOptions[0])

onReady(async () => exec(preSql))
</script>

<template>
  <aside>
    <hgroup>
      <h1>Hello SQL</h1>
      <DatabaseStat style="transform: translateY(0.05em)" :isReady="isReady" />
    </hgroup>

    <SQLiteInfo :version="version" />

    <Details title="Pre Execute">
      <Select v-model="preExecute" :items="preExecuteOptions" />
    </Details>
  </aside>
</template>

<style scoped>
aside {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 16px;

  flex-shrink: 0;
  flex-basis: 14rem;
  height: 100vh;
  padding: 24px;
  border-right: 1px solid var(--color-border);
  background-color: var(--color-aside);
}

hgroup {
  display: flex;
  align-items: center;
  gap: 8px;

  h1 {
    font-size: 1.25rem;
    font-weight: bold;
  }
}
</style>
