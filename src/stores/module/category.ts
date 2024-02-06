import { defineStore } from 'pinia'
import { store } from '@/stores'
import { getCategoryList, updateCategory, createCategory } from '@/apis'


const useCategoryStore = defineStore('category', () => {

  async function getCategoryListAction(params: any) {
    return getCategoryList(params).then((result: any) => {
      return Promise.resolve(result.data)
    }).catch((err: any) => {
      throw new Error(err)
    });
  }


  async function updateCategoryAction(p: any) {
    return updateCategory(p).then((result: any) => {
      return Promise.resolve(result.data)
    }).catch((err: any) => {
      throw new Error(err)
    });
  }

  async function createCategoryAction(params: any) {
    return createCategory(params).then((result: any) => {
      return Promise.resolve(result.data)
    }).catch((err: any) => {
      throw new Error(err)
    });
  }


  return { getCategoryListAction, updateCategoryAction, createCategoryAction }
})

export function useCategoryWithOut() {
  return useCategoryStore(store)
}
