<template>
  <a-table :columns="tableColumns" :data-source="dataSource" bordered :pagination="false">
    <template #bodyCell="{ column, record }">
      <slot :name="column.dataIndex" :record="record">
        <template v-if="column.dataIndex === 'operation'">
          <div class="editable-row-operations">
            <template v-if="column.operationList && column.operationList.length > 0">
              <a-button
                v-for="item in column.operationList"
                @click="item.method(record)"
                :key="item"
                type="link"
                >{{ item.name }}</a-button
              >
            </template>
            <a-button type="link" @click="edit(record)">编辑</a-button>
          </div>
        </template>

        <template v-else-if="column.type === 'time'">
          <div>
            {{ dayjs(record[column.dataIndex]).format('YYYY-MM-DD hh:mm:ss') }}
          </div>
        </template>
        <template v-else-if="column.dataIndex === 'status'">
          <span
            style="width: 100px"
            :style="{ color: column.enum && column.enum[record[column.dataIndex]].color }"
          >
            {{
              column.enum
                ? column.enum[record[column.dataIndex]].name
                : record[column.dataIndex] === 1
                ? '已上架'
                : record[column.dataIndex] === 0
                ? '已下架'
                : ''
            }}
          </span>
        </template>
        <template v-else-if="column.type === 'img'">
          <img :src="record[column.dataIndex]" style="max-width: 200px; max-height: 200px" />
        </template>
        <template v-else-if="column.type === 'tag'">
          <a-tag v-for="(item, index) in record[column.dataIndex].split(/,|，|\s+/)" :key="index">{{
            item ? item : '无'
          }}</a-tag>
        </template>
        <template v-else-if="column.type === 'color'">
          <div style="display: flex">
            <span>{{ record[column.dataIndex] }}</span>
            <div
              :style="{
                marginLeft: '10px',
                background: record[column.dataIndex],
                width: '20px',
                height: '20px'
              }"
            ></div>
          </div>
        </template>
        <template v-else>
          <span
            @click="column.method(record)"
            style="max-width: 200px"
            :style="{
              color:
                (column.enum && column.enum[record[column.dataIndex]].color) || column.color
                  ? column.color
                  : null
            }"
            :class="{ cursor: column.method }"
          >
            {{
              column.enum ? column.enum[record[column.dataIndex]].name : record[column.dataIndex]
            }}
          </span>
        </template>
      </slot>
    </template>
  </a-table>
</template>
<script lang="ts" setup>
import { toRefs, computed } from 'vue'
import dayjs from 'dayjs'

const propsData = defineProps<{
  columns: Record<string, string | number>[]
  dataSource: Record<string, string>[]
}>()

const emit = defineEmits(['edit'])

const { dataSource, columns } = toRefs(propsData)

const tableColumns = computed(() => {
  return columns.value.map((item) => {
    if (item.type === 'time') {
      item.width = 120
    }
    return item
  })
})
const edit = (record: any) => {
  emit('edit', { ...record })
}
</script>
<style scoped>
.editable-row-operations a {
  margin-right: 8px;
}

:deep() .ant-btn {
  padding-left: 0;
}
.cursor {
  cursor: pointer;
}
</style>
