import request from '@/utils/http'

/**
 * @description 获取仪表盘数据
 */
export const getDashboardInfo = (): Promise<any> => {
  return request<{ token: string }>({
    url: '/admin/workStation/getStatistics',
    method: 'POST'
  })
}
