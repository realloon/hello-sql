<script setup lang="ts">
import { ref, useTemplateRef, onMounted } from 'vue'
// Hooks
import { useSQLite } from '@/hooks/useSQLite'
// Utils
import { isEmpty } from '@/utils'
// Compoents
import Message from './components/Message.vue'
import SQLEditor from './components/SQLEditor.vue'
import Table from './components/Table.vue'
import Button from '@/components/Button.vue'
import Clear from '@/components/icons/Clear.vue'

const { result, error, exec, clear } = useSQLite()

const sql = ref('SELECT * FROM Products;')

const wrapper = useTemplateRef('wrapper')
const wrapperWidth = ref(0)

onMounted(() => {
  if (!wrapper.value) return

  wrapperWidth.value = wrapper.value.getBoundingClientRect().width
})
</script>

<template>
  <section class="playground" ref="wrapper">
    <SQLEditor
      v-model="sql"
      :handleExec="() => exec(sql)"
      :handle-clear="() => exec(' ')"
    />

    <section class="btns">
      <Button @click="() => exec(sql)" label="Execute" />

      <Button v-show="!isEmpty(result)" @click="clear" icon rounded>
        <Clear />
      </Button>
    </section>

    <Table
      class="display-result"
      v-show="result"
      :query-result="result"
      :width="wrapperWidth"
    />

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
