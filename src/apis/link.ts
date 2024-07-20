import request from '@/utils/http'

/**
 * @description 更新友链
 */
export const updateLink = (data: any): Promise<any> => {
  return request<{ token: string }>({
    url: '/api/link/update',
    method: 'POST',
    data
  })
}

/**
 * @description 创建友链
 */
export const createLink = (data: any): Promise<any> => {
  return request<{ token: string }>({
    url: '/api/link/create',
    method: 'POST',
    data
  })
}

/**
 * @description 获取友链列表
 */
export const getLinkList = (data: any): Promise<any> => {
  return request<{ token: string }>({
    url: '/api/link/getLinkList',
    method: 'POST',
    data
  })
}
