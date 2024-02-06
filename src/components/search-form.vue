<template>
  <a-form
    :model="newSearchFormData"
    labelAlign="right"
    :labelCol="labelCol"
    :wrapperCol="wrapperCol"
  >
    <a-form-item v-for="item in formConfig" v-bind="item" :key="item.id">
      <template v-if="item.slotType === 'input'">
        <a-input v-model:value="newSearchFormData[item.field]" :placeholder="item.placeholder" />
      </template>
    </a-form-item>
    <a-form-item>
      <slot></slot>
    </a-form-item>
  </a-form>
</template>

<script lang="ts" setup>
import { ref, watch, toRefs } from 'vue'

import type { IFormCinfig } from './types/form'
const propsData = defineProps<{
  formData: Record<string, string | number>
  formConfig: IFormCinfig[]
}>()

const emit = defineEmits(['newSearchFormDataChange'])

const labelCol = { style: { width: '100px' } }

const wrapperCol = { span: 14 }

const { formData } = toRefs(propsData)

const newSearchFormData = ref(formData)

watch(
  newSearchFormData,
  (newValue) => {
    emit('newSearchFormDataChange', newValue)
  },
  {
    deep: true
  }
)
</script>
