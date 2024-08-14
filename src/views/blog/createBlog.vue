<template>
  <a-form :model="formState" :label-col="{ span: 2 }" @finish="submit">
    <a-form-item label="博客标题" name="title" :rules="[{ required: true, message: '请输入标题' }]">
      <a-input v-model:value="formState.title" />
    </a-form-item>

    <a-form-item label="博客简介" name="intro">
      <a-textarea v-model:value="formState.intro" show-count :autosize="{ minRows: 3 }" />
    </a-form-item>

    <a-form-item label="博客内容">
      <v-md-editor v-model="formState.content" height="500px"></v-md-editor>
    </a-form-item>
    <a-form-item label="博客缩略图">
      <a-upload
        name="uploadfile"
        list-type="picture-card"
        :action="actionUrl"
        :show-upload-list="false"
        @change="handleChange"
      >
        <img
          v-if="formState.thumbnail"
          :src="formState.thumbnail"
          alt="avatar"
          style="width: 100px; height: 100px"
        />
        <div v-else>
          <plus-outlined></plus-outlined>
        </div>
      </a-upload>
    </a-form-item>
    <a-form-item label="博客标签">
      <a-input v-model:value="formState.tags" placeholder="逗号隔开" />
    </a-form-item>
    <a-form-item label="是否置顶">
      <a-select
        v-model:value="formState.isTop"
        style="width: 100%"
        :options="[
          { label: '是', value: 1 },
          { label: '否', value: 0 }
        ]"
      />
    </a-form-item>
    <a-form-item label="分类" :rules="[{ required: true, message: '请选择分类' }]" name="cateId">
      <a-select
        v-model:value="formState.cateId"
        style="width: 100%"
        :options="cateList"
        :fieldNames="{
          label: 'name',
          value: 'id'
        }"
      />
    </a-form-item>
    <a-form-item :wrapper-col="{ offset: 2 }">
      <a-button type="primary" style="margin-right: 10px" html-type="submit">{{
        route.query.id ? '保存' : '创建'
      }}</a-button>
      <a-button @click="cancel">取消</a-button>
    </a-form-item>
  </a-form>
</template>

<script setup lang="ts" name="createBlog">
import { onMounted, ref } from 'vue'
import { PlusOutlined } from '@ant-design/icons-vue'
import * as api from '@/apis'
import { useRouter, useRoute } from 'vue-router'
import { message } from 'ant-design-vue'
import type { UploadChangeParam } from 'ant-design-vue'

const router = useRouter()
const route = useRoute()
const cateList = ref([])
const actionUrl = import.meta.env.VITE_API_BASE_URL + 'admin/file/uploadImg'
const formState = ref({
  title: '',
  intro: '',
  content: '',
  tags: '',
  thumbnail: '',
  isTop: 0,
  cateId: null,
  id: ''
})

const getDetail = async (id: string) => {
  const res = await api.getBlogDetail({ id })
  formState.value = res.data
}

onMounted(() => {
  if (route.query.id) {
    getDetail(route.query.id as string)
  }
})

const handleChange = ({ file }: UploadChangeParam) => {
  formState.value.thumbnail =
    import.meta.env.VITE_API_BASE_UPLOAD_IMG_URL + file.response?.data?.filename
}

const submit = async () => {
  const req = {
    title: formState.value.title,
    intro: formState.value.intro,
    content: formState.value.content,
    tags: formState.value.tags,
    thumbnail: formState.value.thumbnail,
    isHtml: 0,
    isTop: formState.value.isTop,
    cateId: formState.value.cateId
  }

  if (route.query.id) {
    await api.updateBlog({
      ...req,
      id: route.query.id
    })
  } else {
    await api.publishBlog(req)
  }
  message.success('创建成功')
  cancel()
}
const cancel = () => {
  router.go(-1)
}

const getCateList = async () => {
  const res = await api.getCategoryList({
    status: 1
  })
  cateList.value = res.data.list
}

getCateList()
</script>

<style scoped>
:deep(.ant-input) {
  width: 50%;
}
</style>
