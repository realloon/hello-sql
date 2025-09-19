<script setup lang="ts">
defineProps<{
  label: string
}>()
</script>

<template>
  <button>
    <slot />
    <span>{{ label }}</span>
    <slot name="right" />
  </button>
</template>

<style scoped>
button {
  display: flex;
  align-items: center;
  
  font-size: 1rem;
  color: var(--color-font);
  background-color: #323232;

  height: 36px;
  padding-inline: 12px;
  border: 1px solid #3e3e3e;
  border-radius: 6px;

  cursor: pointer;
  transition: 0.2s;

  &:hover {
    opacity: 0.8;
  }
}

span {
  font-size: 0.875rem;
  font-weight: bold;
}
</style>
