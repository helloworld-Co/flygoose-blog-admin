<template>
  <div class="website-info">
    <div class="name">
      <span>专栏名称:</span> <span class="content">{{ $route.query.title }}</span>
    </div>
    <div class="blurb">
      <span>专栏简介:</span> <span class="blurb_content">{{ $route.query.intro }}</span>
    </div>
    <div style="display: flex; justify-content: space-between">
      <a-form :model="state" layout="inline" autocomplete="off">
        <a-form-item label="状态">
          <a-select v-model:value="state.status" :options="state.statusOptions"></a-select>
        </a-form-item>

        <a-form-item>
          <a-button type="primary" @click="getList">查询</a-button>
        </a-form-item>
      </a-form>
      <a-button class="create" type="primary" @click="create">创建小节</a-button>
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

<script setup lang="ts" name="section">
import Form from '@/components/form.vue'
import Modal from '@/components/modal.vue'
import Table from '@/components/table.vue'
import { onMounted, reactive, ref } from 'vue'
import type { IFormCinfig } from '@/components/types/form'
import { message } from 'ant-design-vue'
import * as api from '@/apis/special'
import { useRoute, useRouter } from 'vue-router'
import { STATUSENUM, STATUSLIST } from '@/utils/constant'
const dataSource = ref<Record<string, string>[]>([])

const route = useRoute()
const router = useRouter()
const title = ref<string>('')
const visible = ref<boolean>(false)

const columns: Record<string, any>[] = [
  {
    title: '排序',
    dataIndex: 'seq',
    key: 'seq',
    width: 100
  },
  {
    title: '小节标题',
    dataIndex: 'title',
    key: 'title'
  },
  {
    title: '状态',
    dataIndex: 'status',
    enum: STATUSENUM
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
    type: 'time'
  },
  {
    title: '发布时间',
    dataIndex: 'publishTime',
    key: 'publishTime',
    type: 'time'
  },
  {
    title: '更新时间',
    key: 'updateTime',
    dataIndex: 'updateTime',
    type: 'time'
  },
  {
    title: '操作',
    dataIndex: 'operation'
  }
]

const formData = ref<Record<string, string | number>>({})

const formConfig = ref<IFormCinfig[]>([
  {
    label: '小节标题',
    field: 'title',
    slotType: 'input',
    placeholder: '请输入小节标题名称'
  },
  {
    label: '排序',
    field: 'seq',
    slotType: 'number',
    min: 0
  }
])

onMounted(() => {
  getList()
})

const state = reactive({
  status: 0,
  count: 0,
  word: '',
  pageNum: 1,
  statusOptions: STATUSLIST
})

const getList = async () => {
  const res = await api.getSectionList({
    status: state.status,
    specialId: route.query.id
  })
  dataSource.value = res.data.list
  state.count = res.data.count
}

const newFormDataChange = (val: any) => {
  formData.value = val
}

const create = () => {
  title.value = '创建小节'
  visible.value = true
}

const edit = (item: { id: number }) => {
  router.push({
    name: 'sectionDetail',
    query: {
      id: item.id
    }
  })
}

const confirm = async (cb: any) => {
  await api.addSection({
    specialId: route.query.id,
    title: formData.value.title,
    seq: formData.value.seq
  })
  message.success('添加成功')
  resetForm()
  cb()
  getList()
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
.name {
  line-height: 35px;
  font-size: 16px;
}
.content {
  font-size: 18px;
  font-weight: 600;
}
.blurb {
  font-size: 16px;
  line-height: 35px;
  margin-bottom: 10px;
  .blurb_content {
    font-size: 14px;
    color: #4b587c;
  }
}
</style>
