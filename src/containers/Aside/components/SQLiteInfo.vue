<script setup lang="ts">
import type { SqliteVersion } from '@/types'
import { computed } from 'vue'
import Details from '@/components/Details.vue'

const { version } = defineProps<{ version: SqliteVersion | null }>()

const date = computed(() => version?.sourceId.split(' ')[0])
</script>

<template>
  <Details title="DBMS">
    <p>
      <span>SQLite</span>
      <span class="version">v{{ version?.libVersion }}</span>
    </p>
    <time :datetime="date">{{ date }}</time>
  </Details>
</template>

<style scoped>
.title {
  font-weight: bold;
}

.version,
time {
  font-family: var(--mono);
  font-size: 0.875em;
  opacity: 0.7;
}

.version {
  margin-inline-start: 0.5em;
}

time {
  min-height: 1em;
}
</style>
