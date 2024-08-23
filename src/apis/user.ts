import request from '@/utils/http'

/**
 * @description 登陆
 * @returns {Promise} 登陆
 */
export const login = (data: any): Promise<any> => {
  return request<{ token: string }>({
    url: '/admin/access/login',
    method: 'POST',
    data
  })
}
export const logout = (data: any): Promise<any> => {
  return request<{ token: string }>({
    url: '/admin/access/logout',
    method: 'POST',
    data
  })
}

/**
 * @description 获取站长信息
 * @returns {Promise} 请求站长信息
 */
export const getWebmasterInfo = (): Promise<any> => {
  return request<{ token: string }>({
    url: '/admin/site/getWebmasterInfo',
    method: 'POST'
  })
}

/**
 * @description 修改站长信息
 * @returns {promise} 修改站长信息
 */
export const updateWebmasterInfo = (data: any): Promise<any> => {
  return request<{ token: string }>({
    url: '/admin/site/updateWebmasterInfo',
    method: 'POST',
    data
  })
}

/**
 * @description 获取站长信息列表
 * @returns {promise} 获取站长信息列表
 */
export const getWebmasterInfoList = (): Promise<any> => {
  return request<{ token: string }>({
    url: '/admin/site/getWebmasterInfoList',
    method: 'POST'
  })
}

/**
 * @description 获取站长信息列表
 * @returns {promise} 获取站长信息列表
 */
export const createWebmasterInfo = (data: any): Promise<any> => {
  return request<{ token: string }>({
    url: '/admin/site/createWebmasterInfo',
    method: 'POST',
    data
  })
}
