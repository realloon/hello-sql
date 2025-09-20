<script setup lang="ts">
// Compoents
import Aside from './containers/Aside/Aside.vue'
import Playground from './containers/Playground/Playground.vue'
</script>

<template>
  <Aside />

  <main>
    <Playground />
  </main>
</template>

<style scoped>
main {
  box-sizing: border-box;
  width: min(1080px, 100%);
  padding: 16px;
  margin-inline: auto;
}
</style>
