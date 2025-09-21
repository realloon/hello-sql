<script setup lang="ts">
import type { ExecResult } from '@/types'
import { useTemplateRef, computed, onMounted } from 'vue'
import { isObejct } from '@/utils'

const { queryResult: data } = defineProps<{
  queryResult: Readonly<ExecResult>
}>()

const wrapper = useTemplateRef('wrapper')

const headers = computed(() => {
  if (!isObejct(data[0])) return []

  return Object.keys(data[0])
})

onMounted(() => {
  if (!wrapper.value) return

  const width = wrapper.value.getBoundingClientRect().width
  wrapper.value.style.width = `${width}px`
})
</script>

<template>
  <section ref="wrapper">
    <table>
      <thead>
        <tr>
          <th v-for="header in headers" scope="col">
            <span class="header">{{ header }}</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in data">
          <td v-for="value in row">
            {{ value }}
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<style scoped>
section {
  height: calc(100vh - 186px);

  overflow: overlay;
  scrollbar-width: thin;
}

table {
  font-size: 14px;
  font-family: var(--mono);
  white-space: nowrap;

  border-collapse: collapse;
  table-layout: fixed;
}

thead {
  .header {
    display: block;
    padding-bottom: 0.75em;
    border-bottom: 2px dashed var(--color-font);
  }
}

tbody {
  border-top: 0.5em solid transparent;

  td {
    padding-block: 0.25em;
  }
}

th,
td {
  text-align: left;
  padding: 0 2em 0 0;
}

tr th:last-of-type,
tr td:last-of-type {
  padding: 0;
}
</style>
