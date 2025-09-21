<script setup lang="ts">
import { ref } from 'vue'
// Hooks
import { useSQLite } from '@/hooks/useSQLite'
// Utils
import { isEmpty } from '@/utils'
// Compoents
import Message from './components/Message.vue'
import Table from './components/Table.vue'
import Button from '@/components/Button.vue'
import Clear from '@/components/icons/Clear.vue'
import Editor from '@/components/Editor.vue'

const { result, error, exec, clear } = useSQLite()

const sql = ref('SELECT * FROM Products;')
</script>

<template>
  <section class="playground">
    <Editor v-model="sql" />

    <section class="btns">
      <Button @click="() => exec(sql)" label="Execute" />

      <Button v-show="!isEmpty(result)" @click="clear" icon rounded>
        <Clear />
      </Button>
    </section>

    <Table class="display-result" v-show="result" :query-result="result" />

    <Message :message="error" />
  </section>
</template>

<style scoped>
.playground {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.btns {
  display: flex;
  align-items: center;
  gap: 8px;

  button:last-of-type {
    color: var(--color-page);
    background-color: var(--color-page);
    border-color: var(--color-page);
    transition: 0.4s;
  }

  &:hover button:last-of-type {
    color: var(--color-font);
    background-color: var(--color-button);
    border-color: var(--color-border);
  }
}

.display-result {
  margin-top: 8px;
}
</style>
