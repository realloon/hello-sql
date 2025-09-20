<script setup lang="ts">
const model = defineModel<string>({ required: true })
defineProps<{
  items: Array<string>
}>()
</script>

<template>
  <select v-model="model" name="pre-execute">
    <option v-for="item in items" :value="item">{{ item }}</option>
  </select>
</template>

<style scoped>
select {
  font-family: var(--mono);
}
</style>
