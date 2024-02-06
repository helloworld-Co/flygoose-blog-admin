import request from "@/utils/http"

/**
 * @description 获取网站信息
 * @returns {Promise} 请求网站信息
 */
export const getUsedBlogInfo = (): Promise<any> => {
  return request<{ token: string }>({
    url: '/v8/site/getUsedBlogInfo',
    method: 'POST',
  })
}

/**
 * @description 修改网站信息
 * @returns {Promise} 修改网站信息
 */
export const updateBlog = (data: any): Promise<any> => {
  return request<{ token: string }>({
    url: '/v8/blog/updateBlog',
    method: 'POST',
    data
  })
}

/**
 * @description 获取网站信息列表
 * @returns {Promise} 获取网站信息列表
 */
export const searchBlog = (data: any): Promise<any> => {
  return request<{ token: string }>({
    url: '/v8/blog/searchBlog',
    method: 'POST',
    data
  })
}

/**
 * @description 创建网站信息
 * @returns {Promise} 创建网站信息
 */
export const publishBlog = (data: any): Promise<any> => {
  return request<{ token: string }>({
    url: '/v8/blog/publishBlog',
    method: 'POST',
    data
  })
}

/**
 * @description 获取博客详情
 */
export const getBlogDetail = (data: any): Promise<any> => {
  return request<{ token: string }>({
    url: 'v8/blog/getBlogDetail',
    method: 'POST',
    data
  })
}


/**
 * @description 获取博客详情
 */
export const updateBlogStatus = (data: any): Promise<any> => {
  return request<{ token: string }>({
    url: 'v8/blog/updateBlogStatus',
    method: 'POST',
    data
  })
}
