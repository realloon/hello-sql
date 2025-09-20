<script setup lang="ts">
defineProps<{ title: string }>()
</script>

<template>
  <details open>
    <summary>
      <span class="title">{{ title }}</span>
    </summary>

    <section>
      <slot />
    </section>
  </details>
</template>

<style scoped>
details {
  font-size: 0.875rem;
}

details summary {
  display: flex;
  padding-bottom: 8px;
  cursor: pointer;
}

details section {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
}
</style>
