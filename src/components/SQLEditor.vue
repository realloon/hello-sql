<script setup lang="ts">
import Editor from './Editor.vue'
import Button from './Button.vue'
import Run from './icons/Run.vue'

defineProps<{
  disabled: boolean
  handle: () => Promise<void>
}>()

const model = defineModel<string>({ required: true })
</script>

<template>
  <section class="sql-editor">
    <Editor v-model="model" />

    <footer>
      <Button @click="handle" :disabled="disabled" label="Execute" />
    </footer>
  </section>
</template>

<style scoped>
.sql-editor {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
