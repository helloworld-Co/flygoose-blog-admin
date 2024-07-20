import request from '@/utils/http'

/**
 * @description 创建通知
 */
export const noticeCreate = (data: any): Promise<any> => {
  return request<{ token: string }>({
    url: '/api/notice/create',
    method: 'POST',
    data
  })
}

/**
 * @description 更新通知
 */
export const noticeUpdate = (data: any): Promise<any> => {
  return request<{ token: string }>({
    url: '/api/notice/update',
    method: 'POST',
    data
  })
}

/**
 * @description 通知列表
 */

export const getNoticeList = (data: any): Promise<any> => {
  return request<{ token: string }>({
    url: '/api/notice/getNoticeList',
    method: 'POST',
    data
  })
}
