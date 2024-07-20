import request from '@/utils/http'

/**
 * @description 搜索专栏
 */
export const searchSpecial = (data: any): Promise<any> => {
  return request<{ token: string }>({
    url: '/api/special/searchSpecial',
    method: 'POST',
    data
  })
}

/**
 * @description 更新专栏
 */
export const updateSpecial = (data: any): Promise<any> => {
  return request<{ token: string }>({
    url: '/api/special/update',
    method: 'POST',
    data
  })
}

/**
 * @description 创建专栏
 */
export const createSpecial = (data: any): Promise<any> => {
  return request<{ token: string }>({
    url: '/api/special/create',
    method: 'POST',
    data
  })
}

/**
 * @description 添加小节
 */
export const addSection = (data: any): Promise<any> => {
  return request<{ token: string }>({
    url: '/api/special/addSection',
    method: 'POST',
    data
  })
}

/**
 * @description 更新小节
 */
export const updateSection = (data: any): Promise<any> => {
  return request<{ token: string }>({
    url: '/api/special/updateSection',
    method: 'POST',
    data
  })
}

/**
 * @description 获取专栏小节列表
 */
export const getSectionList = (data: any): Promise<any> => {
  return request<{ token: string }>({
    url: '/api/special/getSectionList',
    method: 'POST',
    data
  })
}

/**
 * @description 获取小节详情
 */
export const getSectionDetail = (data: any): Promise<any> => {
  return request<{ token: string }>({
    url: 'api/special/getSectionDetail',
    method: 'POST',
    data
  })
}
