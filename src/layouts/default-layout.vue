<template>
  <a-layout>
    <a-layout-sider width="200" style="background: #fff">
      <a-menu
        v-model:selectedKeys="selectedKeys"
        mode="inline"
        :style="{ height: '100%', borderRight: 0 }"
        theme="dark"
      >
        <img :src="logo" alt="" height="32" class="logo" />
        <a-menu-item v-for="item in menuConfigList" :key="item.path">
          <RouterLink :to="item.path">{{ item.name }}</RouterLink>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout style="padding: 0 24px 24px">
      <div style="display: flex; justify-content: space-between; align-items: center">
        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item>{{ router.currentRoute.value.meta.name }}</a-breadcrumb-item>
        </a-breadcrumb>
        <div style="cursor: pointer" @click="out">退出登陆</div>
      </div>
      <a-layout-content
        :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '280px' }"
      >
        <RouterView />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import router from '@/router'
import logo from '@/assets/img/logo1.png'
import { useRoute } from 'vue-router'
import { logout } from '@/apis/user'
export default defineComponent({
  setup() {
    const route = useRoute()
    const out = async () => {
      await logout({})
      router.push('/login')
    }
    return {
      router,
      out, // 退出
      logo,
      selectedKeys: ref<string[]>([route.path]),
      menuConfigList: [
        {
          name: '仪表盘',
          path: '/dashboard'
        },
        {
          name: '博客',
          path: '/blog'
        },
        {
          name: '专栏',
          path: '/special'
        },
        {
          name: '分类',
          path: '/category'
        },
        {
          name: '友链',
          path: '/link'
        },
        {
          name: '轮播图',
          path: '/banner'
        },
        {
          name: '网站信息',
          path: '/websiteinfo'
        },
        {
          name: '站长信息',
          path: '/webmasterinfo'
        },
        {
          name: '公告管理',
          path: '/notice'
        }
      ]
    }
  }
})
</script>
<style lang="less">
.ant-layout {
  overflow: scroll;
  height: 100%;

  .ant-layout-content {
    overflow: scroll;
    min-height: initial;
  }

  .logo {
    position: relative;
    left: 35px;
    margin: 10px auto;
  }
}

.ant-breadcrumb {
  font-size: 16px !important;
  color: #21293c !important;
  font-weight: 700 !important;
}
</style>
