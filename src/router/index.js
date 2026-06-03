import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Settings from '../views/Settings.vue'
import SystemInfo from '../views/SystemInfo.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: '總覽'
    }
  },
  {
    path: '/system/info',
    name: 'SystemInfo',
    component: SystemInfo,
    meta: {
      title: '系統資訊'
    }
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings,
    meta: {
      title: '系統設定'
    }
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    meta: {
      title: '應用資訊'
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 路由守衛：更新頁面標題
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'PSS GUI Utility'
  next()
})

export default router
