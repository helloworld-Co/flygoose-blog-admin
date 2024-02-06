import { defineStore } from 'pinia'
import { store } from '@/stores'
import { getUsedSiteInfo, updateSite, getSiteInfoList, createSite } from '@/apis'


const useWebsiteInfoStore = defineStore('websiteInfo', () => {
  async function getUsedSiteInfoAction() {
    getUsedSiteInfo().then((result: any) => {
      console.log("🚀  result:", result)
    }).catch((err: any) => {
      console.log("🚀  err:", err)
    });
  }


  async function updateSiteAction(params: any) {
    updateSite(params).then((result: any) => {
      console.log("🚀  result:", result)
    }).catch((err: any) => {
      console.log("🚀  err:", err)
    });
  }


  async function getSiteInfoListAction() {
    return getSiteInfoList().then((result: any) => {
      return Promise.resolve(result.data.list)
    }).catch((err: any) => {
      console.log("🚀  err:", err)
    });
  }

  async function createSiteAction(params: any) {
    return createSite(params).then((result: any) => {
      return Promise.resolve(result.data)
    }).catch((err: any) => {
      console.log("🚀  err:", err)
    });
  }


  return { getUsedSiteInfoAction, updateSiteAction, getSiteInfoListAction, createSiteAction }
})

export function useWebsiteInfoStoreWithOut() {
  return useWebsiteInfoStore(store)
}
