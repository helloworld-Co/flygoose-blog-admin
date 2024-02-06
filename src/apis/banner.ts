import request from "@/utils/http"


/**
 * @description 创建轮播图
 * @returns {Promise} 创建轮播图
 */
export const bannerCreate = (data: any): Promise<any> => {
  return request<{ token: string }>({
    url: '/v8/banner/create',
    method: 'POST',
    data
  })
}




/**
 * @description 更新轮播图
 */
export const bannerUpdate = (data: any): Promise<any> => {
  return request<{ token: string }>({
    url: '/v8/banner/update',
    method: 'POST',
    data
  })
}


/**
 * @description 获取轮播图列表
 */

export const bannerGetBannerList = (data: any): Promise<any> => {
  return request<{ token: string }>({
    url: '/v8/banner/getBannerList',
    method: 'POST',
    data
  })
}
