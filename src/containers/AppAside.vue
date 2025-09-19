<script setup lang="ts">
import preSql from '@/assets/sql/TYSQL.sql?raw'
//
import { useSQLite } from '@/hooks/useSQLite'

const { isReady, exec, onReady } = useSQLite()

onReady(() => exec(preSql))
</script>

<template>
  <aside>
    <h1>hello SQL {{ isReady ? '✅' : '⏳' }}</h1>

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

  height: 100vh;
  padding: 16px;
  border-right: 1px solid var(--color-border);

  flex-shrink: 0;
  flex-basis: 16rem;
}

h1 {
  font-size: 1rem;
  font-weight: bold;
}

.pre-execute {
  p {
    font-size: 0.875rem;
    font-family: var(--mono);
  }
}
</style>
