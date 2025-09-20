<script setup lang="ts">
import preSql from '@/assets/sql/TYSQL.sql?raw'
// Components
import DatabaseStat from './components/DatabaseStat.vue'
// Hooks
import { useSQLite } from '@/hooks/useSQLite'

const { isReady, exec, onReady } = useSQLite()

onReady(() => exec(preSql))
</script>

<template>
  <aside>
    <hgroup>
      <h1>Hello SQL</h1>
      <DatabaseStat style="transform: translateY(0.05em)" :isReady="isReady" />
    </hgroup>

    <section class="pre-execute">
      <h2>Pre Execute</h2>
      <p>TYSQL</p>
    </section>
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
  padding: 16px;
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

.pre-execute {
  p {
    font-size: 0.875rem;
    font-family: var(--mono);
  }
}
</style>
