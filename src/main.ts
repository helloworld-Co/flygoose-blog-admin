/*
 * @Author: Shaoli
 * @Date: 2023-03-27 22:05:52
 * @LastEditors: Shaoli
 * @LastEditTime: 2023-03-27 23:10:36
 * @Description: 请填写文件描述
 */
import { createApp } from 'vue'
import router from './router'
import { setupStore } from '@/stores'
import App from './App.vue'

import './assets/css/main.css'
import 'normalize.css'
import { useUserStoreWithOut } from './stores/module/user'

// md编辑器
import VueMarkdownEditor from '@kangc/v-md-editor'
import '@kangc/v-md-editor/lib/style/base-editor.css'
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js'
import '@kangc/v-md-editor/lib/theme/style/vuepress.css'
import Prism from 'prismjs'

import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

VueMarkdownEditor.use(vuepressTheme, {
  Prism
})

async function bootstrap() {
  const app = createApp(App)
  app.use(router)
  app.use(VueMarkdownEditor)
  app.use(Antd);
  setupStore(app)
  // 刷新页面的时候重新赋值token
  if (!localStorage.getItem('token')) {
    useUserStoreWithOut().token = ''
  } else {
    useUserStoreWithOut().token = localStorage.getItem('token') as string
    useUserStoreWithOut().userInfo = JSON.parse(localStorage.getItem('userInfo') as string)
  }
  app.mount('#app')
}

bootstrap()
