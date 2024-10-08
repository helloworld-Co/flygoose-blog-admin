import request from '@/utils/http'

/**
 * @description 获取分类列表
 */
export const getCategoryList = (data: any): Promise<any> => {
  return request<{ token: string }>({
    url: '/admin/category/getCategoryList',
    method: 'POST',
    data
  })
}

/**
 * @description 更新分类
 */
export const updateCategory = (data: any): Promise<any> => {
  return request<{ token: string }>({
    url: '/admin/category/update',
    method: 'POST',
    data
  })
}

/**
 * @description 创建分类
 */
export const createCategory = (data: any): Promise<any> => {
  return request<{ token: string }>({
    url: '/admin/category/create',
    method: 'POST',
    data
  })
}
