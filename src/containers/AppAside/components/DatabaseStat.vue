<script setup lang="ts">
import DatabaseCheck from '@/components/icons/DatabaseCheck.vue'
import DatabaseClock from '@/components/icons/DatabaseClock.vue'

defineProps<{ isReady: boolean }>()
</script>

<template>
  <i class="database-stat">
    <DatabaseCheck v-if="isReady" />
    <DatabaseClock v-else style="transform: translate3d(0.042em, 0.042em, 0)" />
  </i>
</template>

<style scoped>
.database-stat {
  font-size: 1.5rem;
}
</style>
