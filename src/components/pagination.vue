<template>
  <a-pagination
    class="pagination"
    v-model:current="current"
    :total="total"
    v-model:pageSize="pageSize"
  />
</template>

<script setup lang="ts">
import { toRefs, computed } from 'vue'
const propsData = defineProps<{
  current: number
  total: number
  pageSize: number
}>()

const { total, pageSize } = toRefs(propsData)

const emit = defineEmits(['update:current', 'changePageNum'])

const current = computed({
  get: () => propsData.current,
  set: (val) => {
    emit('update:current', val)
    emit('changePageNum', val)
  }
})
</script>

<style lang="less">
.pagination {
  float: right;
  margin-top: 20px;
}
</style>
