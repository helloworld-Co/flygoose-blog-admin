<template>
  <a-modal
    v-model:visible="visible"
    @ok="handleOk"
    :title="title"
    cancelText="取消"
    okText="确认"
    @cancel="handleCancle"
  >
    <slot></slot>
  </a-modal>
</template>
<script lang="ts" setup>
import { toRefs, computed } from 'vue'
const propsData = defineProps<{
  title: string
  visible: boolean
}>()

const emit = defineEmits(['update:visible', 'confirm', 'cancel'])

const { title } = toRefs(propsData)

const visible = computed({
  get: () => propsData.visible,
  set: (val) => {
    emit('update:visible', val)
  }
})

const handleOk = () => {
  emit('confirm', () => {
    visible.value = false
  })
}

const handleCancle = () => {
  emit('cancel', () => {
    visible.value = false
  })
}
</script>
