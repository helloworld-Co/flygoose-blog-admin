<template>
  <div class="website-info">
    <a-button style="margin-bottom: 10px" class="create" type="primary" @click="handleEdit"
      >更改网站信息</a-button
    >
    <!-- <a-button class="create" type="primary" @click="createSite">创建网站信息</a-button> -->
    <!-- <Table :data-source="dataSource" :columns="columns" ref="table" @edit="edit">
      <template #[item]="data" v-for="item in Object.keys($slots)">
        <slot :name="item" v-bind="data || {}"></slot>
      </template>
    </Table> -->
    <a-descriptions bordered>
      <a-descriptions-item label="网站标题">{{ websiteInfo.title }}</a-descriptions-item>
      <a-descriptions-item label="网站slogan" :span="2">{{
        websiteInfo.slogan
      }}</a-descriptions-item>
      <a-descriptions-item label="网站简介" :span="3">{{ websiteInfo.intro }}</a-descriptions-item>
      <a-descriptions-item label="网站封面" :span="2"
        ><img :src="imageUrl" style="max-width: 200px; max-height: 200px"
      /></a-descriptions-item>
      <a-descriptions-item label="状态">{{
        websiteInfo.status === 1 ? '已上架' : websiteInfo.status === 0 ? '已下架' : ''
      }}</a-descriptions-item>
      <a-descriptions-item label="网站版权信息">{{ websiteInfo.copyright }}</a-descriptions-item>
      <a-descriptions-item label="icp相关信息">
        {{ websiteInfo.icp }}
      </a-descriptions-item>
    </a-descriptions>

    <Modal :title="title" v-model:visible="visible" @confirm="confirm" @cancel="cancel">
      <Form :formData="formData" :formConfig="formConfig" @newFormDataChange="newFormDataChange">
      </Form>
    </Modal>
  </div>
</template>

<script setup lang="ts" name="WebsiteInfo">
import Table from '@/components/table.vue'
import Form from '@/components/form.vue'
import Modal from '@/components/modal.vue'
import { computed, onMounted, reactive, ref } from 'vue'
import type { IFormCinfig } from '@/components/types/form'
import { useWebsiteInfoStoreWithOut } from '@/stores/module/website-info'
import { message } from 'ant-design-vue'

const useWebsiteInfoStore = useWebsiteInfoStoreWithOut()

const dataSource = ref<Record<string, string>[]>([])
const websiteInfo = ref<Record<string, string | number>>({})
const imageUrl = computed(() => {
  return websiteInfo.value.cover ? String(websiteInfo.value.cover) : undefined
})
const title = ref<string>('')
const visible = ref<boolean>(false)
const columns: Record<string, string>[] = [
  {
    title: '网站标题',
    dataIndex: 'title',
    key: 'title'
  },
  {
    title: '网站简介',
    dataIndex: 'intro',
    key: 'title'
  },
  {
    title: '网站slogan',
    dataIndex: 'slogan',
    key: 'slogan'
  },
  {
    title: '网站封面',
    dataIndex: 'cover',
    type: 'img',
    key: 'cover'
  },
  {
    title: '网站版权信息',
    dataIndex: 'copyright',
    key: 'copyright'
  },
  {
    title: 'icp相关信息',
    key: 'icp',
    dataIndex: 'icp'
  },
  {
    title: '状态',
    key: 'status',
    dataIndex: 'status'
  },
  {
    title: '操作',
    dataIndex: 'operation'
  }
]

const formData = ref<Record<string, string | number>>({
  title: '',
  intro: '',
  slogan: '',
  cover: '',
  copyright: '',
  icp: '',
  extra: ''
})

enum Operation {
  Add,
  Edit
}

let curOperation = ref(-1)

const formConfig = computed(() => {
  const arr: IFormCinfig[] = [
    {
      label: '标题',
      field: 'title',
      slotType: 'input',
      placeholder: '请输入标题'
    },
    {
      label: '介绍',
      field: 'intro',
      slotType: 'input',
      placeholder: '请输入介绍'
    },
    {
      label: '宣传语',
      field: 'slogan',
      slotType: 'input',
      placeholder: '请输入宣传语'
    },
    {
      label: '封面',
      field: 'cover',
      slotType: 'upload',
      placeholder: '请输入封面'
    },
    {
      label: '版权信息',
      field: 'copyright',
      slotType: 'input',
      placeholder: '请输入版权信息'
    },
    {
      label: 'icp相关信息',
      field: 'icp',
      slotType: 'input',
      placeholder: '请输入icp相关信息'
    },
    {
      label: '额外信息',
      field: 'extra',
      slotType: 'input',
      placeholder: '请输入额外信息'
    }
  ]
  return curOperation.value === Operation.Edit
    ? arr.concat({
        label: '状态',
        field: 'status',
        slotType: 'select',
        options: [
          { value: 0, label: '已下架' },
          { value: 1, label: '已上架' }
        ]
      })
    : arr
})

onMounted(() => {
  getSiteInfoList()
})

const getSiteInfoList = async () => {
  const siteInfoList = await useWebsiteInfoStore.getSiteInfoListAction()
  dataSource.value = siteInfoList
  if (siteInfoList.length > 0) websiteInfo.value = { ...siteInfoList[0] }
}

const newFormDataChange = (val: any) => {
  formData.value = val
}

const createSite = () => {
  curOperation.value = Operation.Add
  title.value = '创建网站信息'
  visible.value = true
}

const edit = (record: any) => {
  curOperation.value = Operation.Edit
  title.value = '修改网站信息'
  visible.value = true
  formData.value = record
}
// 更改成表单后新编辑逻辑处理
const handleEdit = () => {
  curOperation.value = Operation.Edit
  title.value = '修改网站信息'
  visible.value = true
  formData.value = { ...websiteInfo.value }
}
const confirm = async (cb: any) => {
  try {
    if (curOperation.value === Operation.Add) {
      await useWebsiteInfoStore.createSiteAction(formData.value)
      message.success('添加成功')
    } else if (curOperation.value === Operation.Edit) {
      await useWebsiteInfoStore.updateSiteAction(formData.value)
      message.success('修改成功')
    }
    resetForm()
    cb()
    getSiteInfoList()
  } catch (error) {
    console.log(error)
  }
}

const cancel = (cb: any) => {
  resetForm()
  cb()
}

const resetForm = () => {
  formData.value = {}
}
</script>

<style lang="less">
.website-info {
  .submit {
    margin-left: 100px;
  }
}
</style>
