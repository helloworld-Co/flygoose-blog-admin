import { defineStore } from 'pinia'
import { store } from '@/stores'
import { updateBlog, getBlogListByStatus, createBlog } from '@/apis'


const useBlogStore = defineStore('blog', () => {



  async function updateBlogAction(params: any) {
    updateBlog(params).then((result: any) => {
      console.log("🚀  result:", result)
    }).catch((err: any) => {
      console.log("🚀  err:", err)
    });
  }


  async function getBlogListByStatusAction(p: any) {
    return getBlogListByStatus(p).then((result: any) => {
      return Promise.resolve(result.data)
    }).catch((err: any) => {
      console.log("🚀  err:", err)
    });
  }

  async function createBlogAction(params: any) {
    return createBlog(params).then((result: any) => {
      return Promise.resolve(result.data)
    }).catch((err: any) => {
      console.log("🚀  err:", err)
    });
  }


  return { updateBlogAction, getBlogListByStatusAction, createBlogAction }
})

export function useBlogStoreWithOut() {
  return useBlogStore(store)
}
