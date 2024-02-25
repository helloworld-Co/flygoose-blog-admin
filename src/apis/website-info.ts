import request from '@/utils/http'

/**
 * @description 获取网站信息
 * @returns {Promise} 请求网站信息
 */
export const getUsedSiteInfo = (): Promise<any> => {
  return request<{ token: string }>({
    url: '/admin/site/getUsedSiteInfo',
    method: 'POST'
  })
}

/**
 * @description 修改网站信息
 * @returns {Promise} 修改网站信息
 */
export const updateSite = (data: any): Promise<any> => {
  return request<{ token: string }>({
    url: '/admin/site/updateSite',
    method: 'POST',
    data
  })
}

/**
 * @description 获取网站信息列表
 * @returns {Promise} 获取网站信息列表
 */
export const getSiteInfoList = (): Promise<any> => {
  return request<{ token: string }>({
    url: '/admin/site/getSiteInfoList',
    method: 'POST'
  })
}

/**
 * @description 创建网站信息
 * @returns {Promise} 创建网站信息
 */
export const createSite = (data: any): Promise<any> => {
  return request<{ token: string }>({
    url: '/admin/site/createSite',
    method: 'POST',
    data
  })
}
