<template>
  <div class="webmaster-info">
    <a-button class="create" type="primary" @click="handleInfoClick">{{
      dataSource.length > 0 ? '更新站长信息' : '创建站长信息'
    }}</a-button>
    <!-- <Table :data-source="dataSource" :columns="columns" ref="table" @edit="edit">
      <template #[item]="data" v-for="item in Object.keys($slots)">
        <slot :name="item" v-bind="data || {}"></slot>
      </template>
    </Table> -->
    <a-descriptions bordered>
      <a-descriptions-item label="头像"
        ><img :src="imageUrl" style="max-width: 200px; max-height: 200px"
      /></a-descriptions-item>
      <a-descriptions-item label="昵称">{{ webMasterInfo.nicker }}</a-descriptions-item>
      <a-descriptions-item label="职位">{{ webMasterInfo.job }}</a-descriptions-item>
      <a-descriptions-item label="邮箱">{{ webMasterInfo.email }}</a-descriptions-item>
      <a-descriptions-item label="QQ号">{{ webMasterInfo.qq }}</a-descriptions-item>
      <a-descriptions-item label="微信">{{ webMasterInfo.wechat }}</a-descriptions-item>
      <a-descriptions-item label="简介" :span="3">{{ webMasterInfo.intro }}</a-descriptions-item>
      <a-descriptions-item label="个性签名" :span="3">{{
        webMasterInfo.slogan
      }}</a-descriptions-item>
      <a-descriptions-item label="打赏二维码" :span="2"
        ><img :src="codeImageUrl" style="max-width: 200px; max-height: 200px"
      /></a-descriptions-item>
      <a-descriptions-item label="状态">{{
        webMasterInfo.status === 1 ? '已上架' : webMasterInfo.status === 0 ? '已下架' : ''
      }}</a-descriptions-item>
    </a-descriptions>
    <Modal :title="title" v-model:visible="visible" @confirm="confirm" @cancel="cancel">
      <Form :formData="formData" :formConfig="formConfig" @newFormDataChange="newFormDataChange">
      </Form>
    </Modal>
  </div>
</template>

<script setup lang="ts" name="WebmasterInfo">
import Table from '@/components/table.vue'
import Form from '@/components/form.vue'
import Modal from '@/components/modal.vue'
import { onMounted, computed, ref } from 'vue'
import type { IFormCinfig } from '@/components/types/form'
import { useUserStoreWithOut } from '@/stores/module/user'
import { message } from 'ant-design-vue'

const useUserStore = useUserStoreWithOut()

const dataSource = ref<Record<string, string>[]>([])
const webMasterInfo = ref<Record<string, string | number>>({})
const title = ref<string>('')
const visible = ref<boolean>(false)
const imageUrl = computed(() => {
  return webMasterInfo.value.avatar ? String(webMasterInfo.value.avatar) : undefined
})
const codeImageUrl = computed(() => {
  return webMasterInfo.value.rewardCode ? String(webMasterInfo.value.rewardCode) : undefined
})
const columns: Record<string, string>[] = [
  {
    title: '头像',
    dataIndex: 'avatar'
  },
  {
    title: '简介',
    dataIndex: 'intro'
  },
  {
    title: '个性签名',
    dataIndex: 'slogan'
  },
  {
    title: '昵称',
    dataIndex: 'nicker'
  },
  {
    title: '职位',
    dataIndex: 'job'
  },
  {
    title: '邮箱',
    dataIndex: 'email'
  },
  {
    title: 'qq号',
    dataIndex: 'qq'
  },
  {
    title: '微信号',
    dataIndex: 'wechat'
  },
  {
    title: '打赏二维码',
    dataIndex: 'rewardCode',
    type: 'img'
  },
  {
    title: '状态',
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
  extra: '',
  avatar: ''
})

enum Operation {
  Add,
  Edit
}

let curOperation = ref(-1)

const formConfig = computed(() => {
  const arr: IFormCinfig[] = [
    {
      label: '头像',
      field: 'avatar',
      slotType: 'upload'
    },
    {
      label: '简介',
      field: 'intro',
      slotType: 'input',
      placeholder: '请输入简介'
    },
    {
      label: '宣传语',
      field: 'slogan',
      slotType: 'input',
      placeholder: '请输入宣传语'
    },
    {
      label: '昵称',
      field: 'nicker',
      slotType: 'input',
      placeholder: '请输入昵称'
    },
    {
      label: '职位',
      field: 'job',
      slotType: 'input',
      placeholder: '请输入职位'
    },
    {
      label: '邮箱',
      field: 'email',
      slotType: 'input',
      placeholder: '请输入邮箱'
    },
    {
      label: 'QQ',
      field: 'qq',
      slotType: 'input',
      placeholder: '请输入宣QQ'
    },
    {
      label: '微信',
      field: 'wechat',
      slotType: 'input',
      placeholder: '请输入微信'
    },
    {
      label: '打赏二维码',
      field: 'rewardCode',
      slotType: 'upload'
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
  getWebmasterInfoList()
})

const getWebmasterInfoList = async () => {
  const userInfoList = await useUserStore.getWebmasterInfoListAction()
  dataSource.value = userInfoList
  if (userInfoList.length > 0) webMasterInfo.value = { ...userInfoList[0] }
}

const newFormDataChange = (val: any) => {
  formData.value = val
}
const handleInfoClick = () => {
  if (dataSource.value.length > 0) {
    edit()
  } else {
    createSite()
  }
}
const createSite = () => {
  curOperation.value = Operation.Add
  title.value = '创建网站信息'
  visible.value = true
}

const edit = (record?: any) => {
  curOperation.value = Operation.Edit
  title.value = '修改网站信息'
  visible.value = true
  // formData.value = record
  formData.value = { ...webMasterInfo.value }
}

const confirm = async (cb: any) => {
  try {
    if (curOperation.value === Operation.Add) {
      await useUserStore.createWebmasterInfoAction(formData.value)
      message.success('添加成功')
    } else if (curOperation.value === Operation.Edit) {
      await useUserStore.updateWebmasterInfoAction(formData.value)
      message.success('修改成功')
    }
    resetForm()
    cb()
    getWebmasterInfoList()
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
.webmaster-info {
  .create {
    margin-bottom: 20px;
  }

  .submit {
    margin-left: 100px;
  }
}
</style>
