<template>
  <div>
    <a-row :gutter="16">
      <a-col :span="6" v-for="item in cardData" :key="item.title">
        <a-card class="statisticClass">
          <a-statistic :title="item.title" :value="item.num" :value-style="valStyle"> </a-statistic>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>
<script lang="ts" setup>
import * as api from '@/apis'
import { reactive, ref } from 'vue'

const cardData = ref([
  { title: '博客数', num: 0, objName: 'blogCnt' },
  { title: '专栏数', num: 0, objName: 'specialCnt' },
  { title: '友链数', num: 0, objName: 'linkCnt' },
  { title: '管理员个数', num: 0, objName: 'adminCnt' },
  { title: '轮播图个数', num: 0, objName: 'bannerCnt' },
  { title: '今日新增博客', num: 0, objName: 'newBlogToday' },
  { title: '今日新增专栏', num: 0, objName: 'blonewSpecialTodayCntgCnt' }
])
const valStyle = reactive({
  color: '#3f8600',
  fontWeight: 600
})
const initData = async () => {
  const res = await api.getDashboardInfo()
  cardData.value.forEach((item) => {
    item.num = res.data[item.objName]
  })
}
initData()
</script>
<style lang="less" scoped>
.statisticClass {
  margin-bottom: 10px !important;
}
:deep(.ant-statistic-title) {
  font-size: 16px;
  font-weight: bold;
  color: #000000;
}
</style>
