import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Settings from '../views/Settings.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: '首頁'
    }
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    meta: {
      title: '關於'
    }
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings,
    meta: {
      title: '設定'
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
