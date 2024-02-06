<template>
  <a-form :model="formState" :label-col="{ span: 2 }" @finish="submit">
    <a-form-item label="小节标题" name="title" :rules="[{ required: true, message: '请输入标题' }]">
      <a-input v-model:value="formState.title" />
    </a-form-item>

    <a-form-item label="小节内容">
      <v-md-editor v-model="formState.content" height="500px"></v-md-editor>
    </a-form-item>
    <a-form-item label="小节标签">
      <a-input v-model:value="formState.tags" placeholder="逗号隔开" />
    </a-form-item>
    <a-form-item label="小节排序">
      <a-input-number v-model:value="formState.seq" :min="0" />
    </a-form-item>
    <a-form-item label="小节状态">
      <a-select
        v-model:value="formState.status"
        :options="statusOptions"
        style="width: 120px"
      ></a-select>
    </a-form-item>

    <a-form-item :wrapper-col="{ offset: 2 }">
      <a-button type="primary" style="margin-right: 10px" html-type="submit">保存</a-button>
      <a-button @click="cancel">取消</a-button>
    </a-form-item>
  </a-form>
</template>

<script setup lang="ts" name="createBlog">
import { onMounted, ref } from 'vue'
import * as api from '@/apis/special'
import { useRouter, useRoute } from 'vue-router'
import { message } from 'ant-design-vue'
import { STATUSLIST } from '@/utils/constant'
const router = useRouter()
const route = useRoute()

const formState = ref({
  title: '',
  content: '',
  tags: '',
  seq: '',
  status: '',
  id: ''
})

const statusOptions = ref([...STATUSLIST.slice(1)])
const getDetail = async (id: string) => {
  const res = await api.getSectionDetail({ sectionId: id })
  formState.value = res.data
}

onMounted(() => {
  if (route.query.id) {
    getDetail(route.query.id as string)
  }
})

const submit = async () => {
  await api.updateSection({
    ...formState.value,
    sectionId: formState.value.id
  })
  message.success('操作成功')
  cancel()
}
const cancel = () => {
  router.go(-1)
}
</script>
<style scoped>
:deep(.ant-input) {
  width: 50%;
}

:deep(.ant-input-number) {
  width: 120px;
}
</style>
