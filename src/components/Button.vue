<script setup lang="ts">
defineProps<{
  label?: string
  icon?: boolean
  rounded?: boolean
}>()
</script>

<template>
  <button :class="[rounded && 'rounded', icon && 'icon']">
    <slot name="left" />

    <slot>
      <span v-if="label">{{ label }}</span>
    </slot>

    <slot name="right" />
  </button>
</template>

<style scoped>
button {
  display: flex;
  align-items: center;

  font-size: 1rem;
  color: var(--color-font);
  background-color: var(--color-button);

  height: 32px;
  padding-inline: 12px;
  border: 1px solid var(--color-border);
  border-radius: 6px;

  cursor: pointer;
  transition: 0.2s;

  &:hover {
    opacity: 0.8;
  }
}

button.rounded {
  border-radius: 50%;

  &.icon {
    justify-content: center;
    aspect-ratio: 1 / 1;
    padding: 0;
  }
}

span {
  font-size: 0.875rem;
  font-weight: bold;
}
</style>
