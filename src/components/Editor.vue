<script setup lang="ts">
const model = defineModel<string>({ required: true })
</script>

<template>
  <textarea v-model="model" name="sql" rows="4" />
</template>

<style scoped>
textarea {
  font-family: var(--mono);
  font-size: 14px;

  color: var(--color-font);
  background-color: var(--color-editor);

  padding: 0.75em;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  outline: none;

  resize: none;
}
</style>
