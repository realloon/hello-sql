<script setup lang="ts">
import Editor from '@/components/Editor.vue'

defineProps<{
  disabled?: boolean
  handleExec: () => void
  handleClear?: () => void
}>()

const model = defineModel<string>({ required: true })
</script>

<template>
  <section class="sql-editor">
    <Editor v-model="model" />
  </section>
</template>

<style scoped>
.sql-editor {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
