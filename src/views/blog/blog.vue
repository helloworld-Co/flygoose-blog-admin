<template>
  <div class="blog">
    <div style="display: flex; justify-content: space-between">
      <a-form :model="state" layout="inline" autocomplete="off">
        <a-form-item label="博客标题">
          <a-input v-model:value="state.word" style="width: 300px"> </a-input>
        </a-form-item>

        <a-form-item label="状态">
          <a-select v-model:value="state.status" :options="state.statusOptions"></a-select>
        </a-form-item>

        <a-form-item>
          <a-button type="primary" @click="getList">查询</a-button>
        </a-form-item>
      </a-form>
      <a-button class="create" type="primary" @click="createBlog">创建博客</a-button>
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
      :total="state.total"
      show-less-items
      style="margin-top: 10px"
    />

    <a-modal v-model:visible="visible" @ok="handleOk" title="编辑状态">
      <a-select
        v-model:value="state.pickStatus"
        style="width: 100%"
        :options="state.statusOptions.filter((item) => item.value)"
      >
      </a-select
    ></a-modal>
  </div>
  <a-drawer v-model:visible="open" @close="onClose" :width="800" title="查看博客" placement="right">
    <a-descriptions title="博客基本信息">
      <a-descriptions-item label="博客标题" :span="3">{{ detailInfo.title }}</a-descriptions-item>
      <a-descriptions-item label="创建时间">
        {{ dayjs(detailInfo.createTime).format('YYYY-MM-DD hh:mm:ss') }}
      </a-descriptions-item>
      <a-descriptions-item label="更新时间">
        {{ dayjs(detailInfo.updateTime).format('YYYY-MM-DD hh:mm:ss') }}
      </a-descriptions-item>
      <a-descriptions-item label="发布时间">
        {{ dayjs(detailInfo.publishTime).format('YYYY-MM-DD hh:mm:ss') }}
      </a-descriptions-item>
      <a-descriptions-item label="简介" :span="3">{{ detailInfo.intro }}</a-descriptions-item>
    </a-descriptions>
    <a-descriptions title="博客内容">
      <a-descriptions-item> <div v-html="htmlContent"></div></a-descriptions-item>
    </a-descriptions>
  </a-drawer>
</template>

<script setup lang="ts" name="Blog">
import Table from '@/components/table.vue'
import { onMounted, reactive, ref } from 'vue'
import VueMarkdownEditor, { xss } from '@kangc/v-md-editor'
import { useRouter } from 'vue-router'
import * as api from '@/apis/blog'
import { message } from 'ant-design-vue'
import { STATUSENUM, STATUSLIST } from '@/utils/constant'
import dayjs from 'dayjs'
const router = useRouter()
const dataSource = ref<Record<string, string>[]>([])
const detailInfo = reactive<Record<string, string | number>>({})
type blog = {
  status: number
  id: number
}
type blogTitle = {
  content: string
}
const htmlContent = ref<string>('')
const editStatus = (blog: blog) => {
  state.pickStatus = blog.status
  state.pickId = blog.id
  visible.value = true
}
const handleTitleClick = (blogTitle: blogTitle) => {
  open.value = true
  Object.assign(detailInfo, blogTitle)
  htmlContent.value = xss.process(
    VueMarkdownEditor.vMdParser.themeConfig.markdownParser.render(blogTitle.content)
  )
}
const onClose = () => {
  open.value = false
}
const columns: Record<string, any>[] = [
  {
    title: '博客标题',
    dataIndex: 'title',
    method: handleTitleClick,
    color: '#1890ff'
  },
  // {
  //   title: '简介',
  //   dataIndex: 'intro'
  // },
  {
    title: '标签',
    dataIndex: 'tags',
    type: 'tag'
  },
  // {
  //   title: '创建时间',
  //   dataIndex: 'createTime',
  //   type: 'time'
  // },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
    type: 'time'
  },

  // {
  //   title: '发布时间',
  //   dataIndex: 'publishTime',
  //   type: 'time'
  // },
  {
    title: '是否置顶',
    dataIndex: 'isTop',
    width: '100px',
    enum: {
      0: {
        name: '未置顶'
      },
      1: {
        name: '已置顶',
        color: 'red'
      }
    },
    align: 'center'
  },
  {
    title: '状态',
    dataIndex: 'status',
    enum: STATUSENUM,
    align: 'center',
    width: '100px'
  },
  {
    title: '操作',
    dataIndex: 'operation',
    type: 'blog',
    operationList: [
      {
        name: '编辑状态',
        method: editStatus
      }
    ]
  }
]

const visible = ref(false)
const open = ref(false)

const handleOk = async () => {
  await api.updateBlogStatus({
    id: state.pickId,
    status: state.pickStatus
  })
  message.success('操作成功')
  visible.value = false
  getList()
}
onMounted(() => {
  getList()
})

const state = reactive({
  word: '',
  pageNum: 1,
  pageSize: 10,
  total: 0,
  status: 0,
  pickId: 0,
  pickStatus: 0, // 编辑状态
  statusOptions: STATUSLIST
})

const getList = async () => {
  const res = await api.searchBlog({
    word: state.word,
    pageNum: state.pageNum,
    pageSize: state.pageSize,
    status: state.status
  })
  dataSource.value = res.data.list
  state.total = res.data.count
}

const createBlog = () => {
  router.push({
    name: 'createBlog'
  })
}

const edit = (record: { id: number }) => {
  router.push({
    name: 'editBlog',
    query: {
      id: record.id
    }
  })
}
</script>

<style lang="less" scoped>
.blog {
  .submit {
    margin-left: 100px;
  }
}
</style>
