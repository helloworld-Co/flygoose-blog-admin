<template>
  <a-form :model="newFormData" :label-col="{ span: 5 }" :wrapper-col="{ span: 17 }">
    <a-form-item v-for="item in formConfig" :key="item.field" :label="item.label">
      <template v-if="item.slotType === 'input'">
        <a-input v-model:value="newFormData[item.field]" :placeholder="item.placeholder" />
      </template>

      <template v-if="item.slotType === 'textarea'">
        <a-textarea v-model:value="newFormData[item.field]" show-count :autosize="{ minRows: 3 }" />
      </template>
      <template v-if="item.slotType === 'number'">
        <a-input-number
          v-model:value="newFormData[item.field]"
          :placeholder="item.placeholder"
          :min="item.min"
        />
      </template>
      <template v-if="item.slotType === 'select'">
        <a-select
          v-model:value="newFormData[item.field]"
          :placeholder="item.placeholder"
          :options="item.options"
        >
        </a-select>
      </template>
      <template v-if="item.slotType === 'color'">
        <color-picker v-model:pureColor="newFormData[item.field]" />
      </template>
      <template v-if="item.slotType === 'time'">
        <a-date-picker
          valueFormat="YYYY-MM-DD HH:mm:ss"
          v-model:value="newFormData[item.field]"
          showTime
          format="YYYY-MM-DD HH:mm:ss"
        />
      </template>
      <template v-if="item.slotType === 'upload'">
        <a-upload
          name="uploadfile"
          list-type="picture-card"
          :action="actionUrl"
          :show-upload-list="false"
          @change="
            (info:UploadChangeParam) => {
              handleChange(info, item.field)
            }
          "
        >
          <img
            v-if="newFormData[item.field]"
            :src="newFormData[item.field] as string"
            alt="avatar"
            style="width: 100px; height: 100px"
          />
          <div v-else>
            <plus-outlined></plus-outlined>
          </div>
        </a-upload>
      </template>
    </a-form-item>
  </a-form>
</template>

<script lang="ts" setup>
import { ref, watch, toRefs } from 'vue'
import type { IFormCinfig } from './types/form'
import { ColorPicker } from 'vue3-colorpicker'
import 'vue3-colorpicker/style.css'
import { PlusOutlined } from '@ant-design/icons-vue'
import type { UploadChangeParam } from 'ant-design-vue'

const propsData = withDefaults(
  defineProps<{
    formData: Record<string, string | number | boolean[]>
    formConfig: IFormCinfig[]
    labelAlign?: string
    gutter?: number
    span?: number
    isNeedEditor?: boolean
  }>(),
  {
    gutter: 24,
    span: 6,
    labelAlign: 'right',
    isNeedEditor: false
  }
)
const actionUrl =
  import.meta.env.VITE_API_BASE_URL +
  `${import.meta.env.MODE == 'development' ? '/' : ''}v8/file/uploadImg`
const emit = defineEmits(['newFormDataChange'])

const { formData } = toRefs(propsData)

const newFormData = ref(formData)

const handleChange = (info: UploadChangeParam, key: string) => {
  newFormData.value[key] = info.file?.response?.data?.filename
}
watch(
  newFormData,
  (newValue) => {
    emit('newFormDataChange', newValue)
  },
  {
    deep: true
  }
)
</script>
