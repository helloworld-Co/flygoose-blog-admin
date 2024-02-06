<template>
  <div class="website-info">
    <div style="display: flex; justify-content: space-between">
      <a-form :model="state" layout="inline" autocomplete="off">
        <a-form-item label="状态">
          <a-select v-model:value="state.status" :options="state.statusOptions"></a-select>
        </a-form-item>

        <a-form-item>
          <a-button type="primary" @click="getList">查询</a-button>
        </a-form-item>
      </a-form>
      <a-button class="create" type="primary" @click="createSite">创建</a-button>
    </div>
    <Table
      :data-source="dataSource"
      :columns="columns"
      ref="table"
      @edit="edit"
      style="margin-top: 10px"
    >
      <template #[item]="data" v-for="item in Object.keys($slots)">
        <slot :name="item" v-bind="data || {}"></slot>
      </template>
    </Table>

    <a-pagination
      @change="getList"
      v-model:current="state.pageNum"
      :total="state.count"
      show-less-items
      style="margin-top: 10px"
    />

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
import { onMounted, reactive, ref, computed } from 'vue'
import type { IFormCinfig } from '@/components/types/form'
import { message } from 'ant-design-vue'
import * as api from '@/apis/notice'
import { NORMALSTATUS, NORMALSTATUSENUM } from '@/utils/constant'

const dataSource = ref<Record<string, string>[]>([])

const title = ref<string>('')
const visible = ref<boolean>(false)

const columns: Record<string, any>[] = [
  {
    title: '名称',
    dataIndex: 'title',
    key: 'title'
  },
  {
    title: '通知内容',
    dataIndex: 'content'
  },
  // {
  //   title: '创建时间',
  //   dataIndex: 'createTime',
  //   type: 'time'
  // },
  {
    title: '有效时间',
    dataIndex: 'validTime',
    type: 'time'
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
    type: 'time'
  },
  {
    title: '状态',
    dataIndex: 'status',
    enum: NORMALSTATUSENUM
  },
  {
    title: '操作',
    dataIndex: 'operation'
  }
]

const formData = ref<Record<string, string | number>>({
  status: 1
})

enum Operation {
  Add,
  Edit
}

let curOperation = ref(-1)

const formConfig = computed(() => {
  // const options = NORMALSTATUS.slice(1)

  const arr: IFormCinfig[] = [
    {
      label: '通知标题',
      field: 'title',
      slotType: 'input',
      placeholder: '请输入通知标题'
    },
    {
      label: '通知内容',
      field: 'content',
      slotType: 'input',
      placeholder: '请输入通知内容'
    },
    {
      label: '有效时间',
      field: 'validTime',
      slotType: 'time'
    },
    {
      label: '上架状态',
      field: 'status',
      slotType: 'select',
      options: [
        { value: 0, label: '已下架' },
        { value: 1, label: '已上架' }
      ]
    }
  ]
  return arr
})
onMounted(() => {
  getList()
})

const state = reactive({
  status: -1,
  count: 0,
  word: '',
  pageNum: 1,
  statusOptions: NORMALSTATUS
})

const getList = async () => {
  const res = await api.getNoticeList({
    status: state.status,
    pageNum: state.pageNum,
    pageSize: 10
  })
  dataSource.value = res.data.list
  state.count = res.data.count
}

const newFormDataChange = (val: any) => {
  formData.value = val
}

const createSite = () => {
  curOperation.value = Operation.Add
  title.value = '创建'
  visible.value = true
}

const edit = (record: any) => {
  curOperation.value = Operation.Edit
  title.value = '修改'
  visible.value = true
  formData.value = record
}

const confirm = async (cb: any) => {
  try {
    if (curOperation.value === Operation.Add) {
      await api.noticeCreate({
        ...formData.value,
        validTime: +new Date(formData.value.validTime) / 1000
      })
      message.success('添加成功')
    } else if (curOperation.value === Operation.Edit) {
      await api.noticeUpdate({
        ...formData.value,
        validTime: +new Date(formData.value.validTime) / 1000
      })
      message.success('修改成功')
    }
    resetForm()
    cb()
    getList()
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

<style scoped lang="less">
.search-bar {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;

  > div {
    display: flex;

    > div {
      display: flex;
    }
  }
}
</style>
