import request from "@/utils/http"


/**
 * @description 更新友链
 */
export const updateLink = (data: any): Promise<any> => {
  return request<{ token: string }>({
    url: '/v8/link/update',
    method: 'POST',
    data
  })
}



/**
 * @description 创建友链
 */
export const createLink = (data: any): Promise<any> => {
  return request<{ token: string }>({
    url: '/v8/link/create',
    method: 'POST',
    data
  })
}

/**
 * @description 获取友链列表
 */
export const getLinkList = (data: any): Promise<any> => {
  return request<{ token: string }>({
    url: '/v8/link/getLinkList',
    method: 'POST',
    data
  })
}


