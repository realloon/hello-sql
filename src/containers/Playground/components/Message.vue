<script setup lang="ts">
defineProps<{ message?: string | null }>()
</script>

<template>
  <section class="message" v-if="message">
    <pre>{{ message }}</pre>
  </section>
</template>

<style scoped>
.message {
  color: red;
}

pre {
  padding: 8px;
  border: 2px solid var(--color-border);
  border-radius: 4px;
}
</style>
