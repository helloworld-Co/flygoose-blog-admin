/*
 * @Author: Shaoli
 * @Date: 2023-03-27 22:05:52
 * @LastEditors: Shaoli
 * @LastEditTime: 2023-03-27 22:59:43
 * @Description: 请填写文件描述
 */
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import Login from '@/views/login/login.vue'
import Dashboard from '@/views/dashboard/dashbord.vue'
import Blog from '@/views/blog/blog.vue'
import CreateBlog from '@/views/blog/createBlog.vue'
import { useUserStoreWithOut } from '@/stores/module/user'
import DefaultLayout from '@/layouts/default-layout.vue'
import WebmasterInfo from '@/views/webmaster-info/webmaster-info.vue'
import WebsiteInfo from '@/views/website-info/website-info.vue'
import Editor from '@/views/editor/index.vue'
import Category from '@/views/category/index.vue'
import Special from '@/views/special/index.vue'
import Section from '@/views/special/section.vue'
import SectionDetail from '@/views/special/sectionDetail.vue'
import LinkList from '@/views/link/index.vue'
import Banner from '@/views/banner/index.vue'
import Notice from '@/views/notice/index.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    component: DefaultLayout,
    redirect: '/dashboard',
    children: [
      {
        path: '/notice',
        name: 'Notice',
        component: Notice,
        meta: {
          name: '公告管理'
        }
      },
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard,
        meta: {
          name: '仪表盘'
        }
      },
      {
        path: '/blog',
        name: 'Blog',
        component: Blog,
        meta: {
          name: '博客'
        }
      },
      {
        path: '/link',
        name: 'link',
        component: LinkList,
        meta: {
          name: '友链'
        }
      },
      {
        path: '/createBlog',
        name: 'createBlog',
        component: CreateBlog,
        meta: {
          name: '创建博客'
        }
      },
      {
        path: '/editBlog',
        name: 'editBlog',
        component: CreateBlog,
        meta: {
          name: '编辑博客'
        }
      },
      {
        path: '/websiteinfo',
        name: 'WebsiteInfo',
        component: WebsiteInfo,
        meta: {
          name: '网站信息'
        }
      },
      {
        path: '/webmasterinfo',
        name: 'WebmasterInfo',
        component: WebmasterInfo,
        meta: {
          name: '站长信息'
        }
      },
      {
        path: '/editor',
        name: 'Editor',
        component: Editor,
        meta: {
          name: '编辑器'
        }
      },
      {
        path: '/category',
        name: 'Category',
        component: Category,
        meta: {
          name: '分类'
        }
      },
      {
        path: '/special',
        name: 'special',
        component: Special,
        meta: {
          name: '专栏'
        }
      },
      {
        path: '/section',
        name: 'section',
        component: Section,
        meta: {
          name: '小节'
        }
      },
      {
        path: '/sectionDetail',
        name: 'sectionDetail',
        component: SectionDetail,
        meta: {
          name: '小节详情'
        }
      },
      {
        path: '/banner',
        name: 'banner',
        component: Banner,
        meta: {
          name: '轮播图'
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach(async (to) => {
  if (
    // 检查用户是否已登录
    !useUserStoreWithOut().token &&
    // ❗️ 避免无限重定向
    to.name !== 'Login'
  ) {
    // 将用户重定向到登录页面
    return { name: 'Login' }
  }
})

export default router
