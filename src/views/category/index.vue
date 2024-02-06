<template>
  <div class="website-info">
    <div style="display: flex; justify-content: space-between">
      <a-form :model="state" layout="inline" autocomplete="off">
        <a-form-item label="状态">
          <a-select v-model:value="state.status" :options="state.statusOptions"></a-select>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" @click="getCategoryList">查询</a-button>
        </a-form-item>
      </a-form>
      <a-button class="create" type="primary" @click="createSite">创建分类</a-button>
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
import { onMounted, reactive, ref } from 'vue'
import type { IFormCinfig } from '@/components/types/form'
import { useCategoryWithOut } from '@/stores/module/category'
import { message } from 'ant-design-vue'
import { NORMALSTATUSENUM } from '@/utils/constant'

const useCategory = useCategoryWithOut()

const dataSource = ref<Record<string, string>[]>([])

const title = ref<string>('')
const visible = ref<boolean>(false)

const columns: Record<string, any>[] = [
  {
    title: '排序',
    dataIndex: 'seq',
    key: 'seq'
  },
  {
    title: '分类名字',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '分类图标',
    dataIndex: 'icon',
    key: 'icon',
    type: 'img'
  },
  // {
  //   title: '分类矢量图标',
  //   dataIndex: 'font',
  //   key: 'font'
  // },
  {
    title: '分类颜色',
    dataIndex: 'color',
    key: 'color',
    type: 'color'
  },
  {
    title: '状态',
    key: 'status',
    dataIndex: 'status',
    enum: NORMALSTATUSENUM
  },
  {
    title: '操作',
    dataIndex: 'operation'
  }
]

const formData = ref<Record<string, string | number>>({
  color: 'red',
  status: 1
})

enum Operation {
  Add,
  Edit
}

let curOperation = ref(-1)

const formConfig = ref<IFormCinfig[]>([
  {
    label: '分类名字',
    field: 'name',
    slotType: 'input',
    placeholder: '请输入分类名字'
  },
  {
    label: '排序',
    field: 'seq',
    slotType: 'number',
    placeholder: '请输入介绍',
    min: 0
  },
  {
    label: '分类图',
    field: 'icon',
    slotType: 'upload'
  },
  // {
  //   label: '分类矢量图标',
  //   field: 'font',
  //   slotType: 'input',
  //   placeholder: '请输入分类矢量图标'
  // },
  {
    label: '分类颜色',
    field: 'color',
    slotType: 'color'
  },
  {
    label: '状态',
    field: 'status',
    slotType: 'select',
    options: [
      { value: 0, label: '已下架' },
      { value: 1, label: '已上架' }
    ]
  }
])

onMounted(() => {
  getCategoryList()
})

const state = reactive({
  status: -1,
  statusOptions: [
    { value: -1, label: '全部' },
    { value: 0, label: '已下架' },
    { value: 1, label: '已上架' }
  ]
})

const getCategoryList = async () => {
  const res = await useCategory.getCategoryListAction({
    status: state.status
  })
  dataSource.value = res.list
}

const newFormDataChange = (val: any) => {
  formData.value = val
}

const createSite = () => {
  curOperation.value = Operation.Add
  title.value = '创建分类'
  visible.value = true
  formData.value.status = 1
}

const edit = (record: any) => {
  curOperation.value = Operation.Edit
  title.value = '修改分类'
  visible.value = true
  formData.value = record
}

const confirm = async (cb: any) => {
  try {
    if (curOperation.value === Operation.Add) {
      await useCategory.createCategoryAction(formData.value)
      message.success('添加成功')
    } else if (curOperation.value === Operation.Edit) {
      await useCategory.updateCategoryAction(formData.value)
      message.success('修改成功')
    }
    resetForm()
    cb()
    getCategoryList()
  } catch (error) {
    console.log(error)
  }
}

const cancel = (cb: any) => {
  resetForm()
  cb()
}

const resetForm = () => {
  formData.value = {
    color: 'red',
    status: 1
  }
}
</script>

<style scoped>
.search-bar {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}
</style>
