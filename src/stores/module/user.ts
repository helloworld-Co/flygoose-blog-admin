import { defineStore } from 'pinia'
import { store } from '@/stores'
import { login, getWebmasterInfo, updateWebmasterInfo, getWebmasterInfoList, createWebmasterInfo } from '@/apis'
import router from '@/router'
import { ref, unref } from 'vue'


interface IUserInfo {
  [key: string]: string | number
}

const useUserStore = defineStore('user', () => {
  const token = ref<string>('')
  const userInfo = ref<IUserInfo>({})

  async function loginAction(params: any) {
    const res = await login(params)
    token.value = res.data.token
    localStorage.setItem('token', unref(token))
    await getWebmasterInfoAction()
    router.push('/blog')

  }

  async function getWebmasterInfoAction() {
    getWebmasterInfo().then((result) => {
      userInfo.value = result.data
      localStorage.setItem('userInfo', JSON.stringify(userInfo.value))
    })
  }


  async function updateWebmasterInfoAction(params: any) {
    return updateWebmasterInfo(params).then((result) => {
      return Promise.resolve(result.data)
    })
  }

  async function getWebmasterInfoListAction() {
    return getWebmasterInfoList().then((result) => {
      return Promise.resolve(result.data.list)
    }).catch((err) => {
      console.log("🚀  err:", err)
    });
  }

  async function createWebmasterInfoAction(params: any) {
    return createWebmasterInfo(params).then((result) => {
      return Promise.resolve(result.data)
    }).catch((err) => {
      console.log("🚀  err:", err)
    });
  }


  return { token, userInfo, loginAction, getWebmasterInfoAction, updateWebmasterInfoAction, getWebmasterInfoListAction, createWebmasterInfoAction }
})

export function useUserStoreWithOut() {
  return useUserStore(store)
}
