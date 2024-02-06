import type { option } from '@/components/types/form'
export const STATUSENUM: { [key: number]: { name: string; color: string } } = {
  10: {
    name: '已创建',
    color: '#00B5CE'
  },
  20: {
    name: '已下架',
    color: '#F4212E'
  },
  30: {
    name: '已发布',
    color: '#1BC47D'
  }
}

// const d = Object.keys(STATUSENUM).map((item: string) => {
//   return {
//     label: STATUSENUM[parseInt(item)].name
//   }
// })
export const STATUSLIST: option[] = [
  { label: '全部', value: 0 },
  { label: '已创建  ', value: 10 },
  { label: '已下架', value: 20 },
  { label: '已发布', value: 30 }
]

export const NORMALSTATUS = [
  { label: '全部', value: -1 },
  { label: '已上架', value: 1 },
  { label: '已下架', value: 0 }
]
export const NORMALSTATUSENUM = {
  1: {
    name: '已上架',
    color: '#1BC47D'
  },
  0: {
    name: '已下架',
    color: '#F4212E'
  }
}
