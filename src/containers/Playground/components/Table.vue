<script setup lang="ts">
import type { ExecResult } from '@/types'
import { computed } from 'vue'
import { isObejct } from '@/utils'

const { queryResult: data, width } = defineProps<{
  queryResult: Readonly<ExecResult>
  width: number
}>()

const headers = computed(() => {
  if (!isObejct(data[0])) return []

  return Object.keys(data[0])
})
</script>

<template>
  <section :style="`width: ${width}px`">
    <table>
      <thead>
        <tr>
          <th class="header" v-for="header in headers" scope="col">
            {{ header }}
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
  overflow: overlay hidden;
  scrollbar-width: thin;
}

table {
  font-size: 14px;
  font-family: var(--mono);

  border-collapse: collapse;
  table-layout: fixed;
}

thead th {
  padding-bottom: 1em;
  border-bottom: 2px dashed var(--color-font);
}

tbody {
  white-space: nowrap;

  tr:first-of-type td {
    padding-top: 1em;
  }

  tr {
    border-bottom: 1em solid transparent;
  }
}

td {
  padding: 0;
}

th {
  padding: 0;
  text-align: left;
}

tr > th:not(:last-of-type),
tr > td:not(:last-of-type) {
  border-right: 2em solid transparent;
}
</style>
