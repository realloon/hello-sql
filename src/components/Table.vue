<script setup lang="ts" generic="T extends Array<Record<string, unknown>>">
import { computed } from 'vue'
const { queryResult } = defineProps<{
  queryResult: T
}>()

const headers = computed(() => {
  if (!queryResult) return []

  return Object.keys(queryResult[0])
})
</script>

<template>
  <section>
    <table>
      <thead>
        <tr>
          <th class="header" v-for="header in headers" scope="col">
            {{ header }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in queryResult">
          <td v-for="value in row">
            {{ value }}
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<style scoped>
table {
  font-size: 14px;
  font-family: var(--mono);

  border-collapse: collapse;
  table-layout: fixed;

  /* text-wrap-mode: nowrap; */
}

th,
td {
  padding: 0;
}

th {
  text-align: left;
}

tr > th,
tr > td {
  border-right: 2em solid transparent;
}

.header {
  /* padding-bottom: 0.75em; */
  border-bottom: 2px dashed var(--color-font);
}
</style>
