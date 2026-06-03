# REQ_008 技術設計文檔

> 需求: 左右分欄布局與二級菜單導航  
> 設計日期: 2026-06-03  
> 設計者: AI Assistant  
> 狀態: ✅ 設計完成

---

## 📋 設計概述

實現左側固定寬度的二級菜單導航 + 右側內容區域的分欄布局，提供更好的導航體驗和內容展示空間。

---

## 🏗️ 架構設計

### 整體布局結構

```
MainLayout.vue
├── Header.vue (保留)
├── ContentLayout.vue (新增)
│   ├── Sidebar.vue (新增 - 左側菜單)
│   └── MainContent.vue (新增 - 右側內容)
│       └── <router-view />
└── Footer.vue (保留)
```

### Flexbox 布局方案

```css
/* ContentLayout - 水平布局 */
.content-layout {
  display: flex;
  height: calc(100vh - header高度 - footer高度);
}

/* Sidebar - 固定寬度 */
.sidebar {
  width: 250px;
  flex-shrink: 0;
  overflow-y: auto;
}

/* MainContent - 彈性寬度 */
.main-content {
  flex: 1;
  overflow-y: auto;
}
```

---

## 📁 文件結構

### 新增文件

```
src/
├── components/
│   ├── Sidebar.vue           # 左側菜單組件
│   ├── SidebarMenuItem.vue   # 菜單項目組件（可重用）
│   └── ContentLayout.vue     # 內容布局組件
├── router/
│   └── menuConfig.js         # 菜單配置文件
└── stores/
    └── menu.js               # 菜單狀態管理
```

### 修改文件

```
src/
├── components/
│   └── MainLayout.vue        # 更新為包含 ContentLayout
└── router/
    └── index.js              # 新增更多路由
```

---

## 🗂️ 菜單配置設計

### menuConfig.js

```javascript
// src/router/menuConfig.js
export const menuConfig = [
  {
    id: 'dashboard',
    title: '儀表板',
    icon: '📊',
    children: [
      {
        id: 'dashboard-overview',
        title: '總覽',
        path: '/',
        icon: '🏠'
      },
      {
        id: 'dashboard-stats',
        title: '統計圖表',
        path: '/dashboard/stats',
        icon: '📈'
      }
    ]
  },
  {
    id: 'system',
    title: '系統管理',
    icon: '🔧',
    children: [
      {
        id: 'system-info',
        title: '系統資訊',
        path: '/system/info',
        icon: 'ℹ️'
      },
      {
        id: 'system-settings',
        title: '系統設定',
        path: '/settings',
        icon: '⚙️'
      }
    ]
  },
  {
    id: 'about',
    title: '關於',
    icon: '📖',
    children: [
      {
        id: 'about-app',
        title: '應用資訊',
        path: '/about',
        icon: 'ℹ️'
      },
      {
        id: 'about-version',
        title: '版本歷史',
        path: '/about/version',
        icon: '📝'
      }
    ]
  }
]
```

---

## 🎨 組件設計

### 1. ContentLayout.vue

```vue
<template>
  <div class="content-layout">
    <Sidebar />
    <div class="main-content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import Sidebar from './Sidebar.vue'
</script>

<style scoped>
.content-layout {
  display: flex;
  height: calc(100vh - 60px - 60px); /* 減去 header 和 footer 高度 */
  width: 100%;
}

.main-content {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  background: #f5f5f5;
}

/* 自定義滾動條樣式 */
.main-content::-webkit-scrollbar {
  width: 8px;
}

.main-content::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.main-content::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

.main-content::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
```

### 2. Sidebar.vue

```vue
<template>
  <aside class="sidebar">
    <nav class="sidebar-nav">
      <SidebarMenuItem 
        v-for="item in menuItems" 
        :key="item.id"
        :item="item"
      />
    </nav>
  </aside>
</template>

<script setup>
import { computed } from 'vue'
import { useMenuStore } from '../stores/menu'
import { menuConfig } from '../router/menuConfig'
import SidebarMenuItem from './SidebarMenuItem.vue'

const menuStore = useMenuStore()
const menuItems = computed(() => menuConfig)
</script>

<style scoped>
.sidebar {
  width: 250px;
  background: #2c3e50;
  color: #ecf0f1;
  overflow-y: auto;
  overflow-x: hidden;
  flex-shrink: 0;
}

.sidebar-nav {
  padding: 1rem 0;
}

/* 自定義滾動條樣式 */
.sidebar::-webkit-scrollbar {
  width: 8px;
}

.sidebar::-webkit-scrollbar-track {
  background: #1a252f;
}

.sidebar::-webkit-scrollbar-thumb {
  background: #4a5f7f;
  border-radius: 4px;
}

.sidebar::-webkit-scrollbar-thumb:hover {
  background: #5a7fa0;
}
</style>
```

### 3. SidebarMenuItem.vue

```vue
<template>
  <div class="menu-item">
    <!-- 父項目 -->
    <div 
      class="menu-parent" 
      @click="toggleExpand"
    >
      <div class="menu-parent-content">
        <span class="menu-icon">{{ item.icon }}</span>
        <span class="menu-title">{{ item.title }}</span>
      </div>
      <span class="expand-icon" :class="{ expanded: isExpanded }">
        ▶
      </span>
    </div>
    
    <!-- 子項目 -->
    <transition name="expand">
      <div v-show="isExpanded" class="menu-children">
        <router-link
          v-for="child in item.children"
          :key="child.id"
          :to="child.path"
          class="menu-child"
          active-class="active"
        >
          <span class="menu-icon">{{ child.icon }}</span>
          <span class="menu-title">{{ child.title }}</span>
        </router-link>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useMenuStore } from '../stores/menu'

const props = defineProps({
  item: {
    type: Object,
    required: true
  }
})

const route = useRoute()
const menuStore = useMenuStore()

// 判斷是否展開（從 store 獲取狀態）
const isExpanded = computed({
  get: () => menuStore.isMenuExpanded(props.item.id),
  set: (value) => menuStore.setMenuExpanded(props.item.id, value)
})

// 切換展開/收合
function toggleExpand() {
  isExpanded.value = !isExpanded.value
}

// 檢查當前路由是否在此菜單下
const isActive = computed(() => {
  return props.item.children.some(child => child.path === route.path)
})
</script>

<style scoped>
.menu-item {
  margin: 0.25rem 0;
}

.menu-parent {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  cursor: pointer;
  transition: background 0.2s;
}

.menu-parent:hover {
  background: rgba(255, 255, 255, 0.1);
}

.menu-parent-content {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.menu-icon {
  font-size: 1.2rem;
}

.menu-title {
  font-size: 0.95rem;
  font-weight: 500;
}

.expand-icon {
  font-size: 0.7rem;
  transition: transform 0.3s;
}

.expand-icon.expanded {
  transform: rotate(90deg);
}

.menu-children {
  background: rgba(0, 0, 0, 0.2);
  overflow: hidden;
}

.menu-child {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.6rem 1rem 0.6rem 2.5rem;
  color: #bdc3c7;
  text-decoration: none;
  transition: all 0.2s;
}

.menu-child:hover {
  background: rgba(255, 255, 255, 0.05);
  color: #ecf0f1;
}

.menu-child.active {
  background: rgba(66, 184, 131, 0.2);
  color: #42b883;
  border-left: 3px solid #42b883;
}

.menu-child .menu-title {
  font-size: 0.9rem;
  font-weight: 400;
}

/* 展開/收合動畫 */
.expand-enter-active,
.expand-leave-active {
  transition: all 0.3s ease;
  max-height: 500px;
}

.expand-enter-from,
.expand-leave-to {
  max-height: 0;
  opacity: 0;
}
</style>
```

---

## 📦 Pinia Store 設計

### stores/menu.js

```javascript
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useMenuStore = defineStore('menu', () => {
  // State: 展開的菜單 ID 列表
  const expandedMenus = ref(new Set(['dashboard'])) // 預設展開儀表板
  
  // Getters
  const isMenuExpanded = computed(() => {
    return (menuId) => expandedMenus.value.has(menuId)
  })
  
  // Actions
  function setMenuExpanded(menuId, expanded) {
    if (expanded) {
      expandedMenus.value.add(menuId)
    } else {
      expandedMenus.value.delete(menuId)
    }
  }
  
  function toggleMenu(menuId) {
    if (expandedMenus.value.has(menuId)) {
      expandedMenus.value.delete(menuId)
    } else {
      expandedMenus.value.add(menuId)
    }
  }
  
  function expandAll() {
    // 可從 menuConfig 獲取所有菜單 ID
    expandedMenus.value = new Set(['dashboard', 'system', 'about'])
  }
  
  function collapseAll() {
    expandedMenus.value.clear()
  }
  
  return {
    expandedMenus,
    isMenuExpanded,
    setMenuExpanded,
    toggleMenu,
    expandAll,
    collapseAll
  }
})
```

---

## 🛣️ 路由更新

### router/index.js 更新

```javascript
import { createRouter, createWebHashHistory } from 'vue-router'

// 頁面導入
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Settings from '../views/Settings.vue'
// 新增頁面
import DashboardStats from '../views/DashboardStats.vue'
import SystemInfo from '../views/SystemInfo.vue'
import AboutVersion from '../views/AboutVersion.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { title: '總覽' }
  },
  {
    path: '/dashboard/stats',
    name: 'DashboardStats',
    component: DashboardStats,
    meta: { title: '統計圖表' }
  },
  {
    path: '/system/info',
    name: 'SystemInfo',
    component: SystemInfo,
    meta: { title: '系統資訊' }
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings,
    meta: { title: '系統設定' }
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    meta: { title: '應用資訊' }
  },
  {
    path: '/about/version',
    name: 'AboutVersion',
    component: AboutVersion,
    meta: { title: '版本歷史' }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'PSS GUI Utility'
  next()
})

export default router
```

---

## 📄 新增頁面

### 需要創建的頁面

1. **DashboardStats.vue** - 統計圖表頁面
2. **SystemInfo.vue** - 系統資訊頁面（整合現有 Home.vue 內容）
3. **AboutVersion.vue** - 版本歷史頁面

### 頁面模板範例

```vue
<!-- views/DashboardStats.vue -->
<template>
  <div class="page-container">
    <h1>統計圖表</h1>
    <p>這裡顯示應用的統計圖表資訊</p>
    <!-- 後續可加入圖表組件 -->
  </div>
</template>

<script setup>
</script>

<style scoped>
.page-container {
  padding: 2rem;
}

h1 {
  font-size: 2rem;
  color: #2c3e50;
  margin-bottom: 1.5rem;
}
</style>
```

---

## 🎨 樣式規範

### 顏色配置

```css
:root {
  /* 側邊欄 */
  --sidebar-bg: #2c3e50;
  --sidebar-text: #ecf0f1;
  --sidebar-hover: rgba(255, 255, 255, 0.1);
  --sidebar-active: rgba(66, 184, 131, 0.2);
  
  /* 滾動條 */
  --scrollbar-track: #f1f1f1;
  --scrollbar-thumb: #888;
  --scrollbar-thumb-hover: #555;
  
  /* 主題色 */
  --primary-color: #42b883;
}
```

### 響應式設計

```css
/* 平板以下隱藏側邊欄或調整為抽屜式 */
@media (max-width: 768px) {
  .sidebar {
    position: fixed;
    left: -250px;
    transition: left 0.3s;
    z-index: 1000;
  }
  
  .sidebar.open {
    left: 0;
  }
}
```

---

## ✅ 實作檢查清單

### 組件開發
- [ ] 創建 ContentLayout.vue
- [ ] 創建 Sidebar.vue
- [ ] 創建 SidebarMenuItem.vue
- [ ] 更新 MainLayout.vue

### 配置文件
- [ ] 創建 menuConfig.js
- [ ] 創建 menu.js store
- [ ] 更新 router/index.js

### 頁面開發
- [ ] 創建 DashboardStats.vue
- [ ] 創建 SystemInfo.vue
- [ ] 創建 AboutVersion.vue
- [ ] 重構 Home.vue（簡化為總覽頁）

### 功能實現
- [ ] 左右分欄布局
- [ ] 二級菜單展開/收合
- [ ] 點擊切換路由
- [ ] 當前頁面高亮
- [ ] 獨立滾動條
- [ ] 展開狀態管理

### 測試驗證
- [ ] 菜單展開/收合功能
- [ ] 路由切換正常
- [ ] 滾動條獨立運作
- [ ] 高亮狀態正確
- [ ] 響應式布局（可選）

---

## 🚀 實作順序建議

1. **階段一：布局基礎** (1h)
   - 創建 ContentLayout 組件
   - 實現左右分欄布局
   - 設置獨立滾動條

2. **階段二：側邊欄** (2h)
   - 創建 Sidebar 組件
   - 創建 SidebarMenuItem 組件
   - 創建 menuConfig.js

3. **階段三：狀態管理** (1h)
   - 創建 menu store
   - 實現展開/收合邏輯

4. **階段四：路由與頁面** (1.5h)
   - 更新路由配置
   - 創建新頁面
   - 整合路由切換

5. **階段五：樣式與測試** (0.5h)
   - 美化樣式
   - 功能測試
   - 修復 bugs

**總估算**: 6 小時

---

## 📝 設計決策記錄

### 為什麼使用 Flexbox 而非 Grid？
- Flexbox 更適合單向布局（水平分欄）
- 瀏覽器支援度更好
- 代碼更簡潔

### 為什麼用 Pinia 管理展開狀態？
- 跨組件狀態共享
- 易於實現持久化（未來可加入 LocalStorage）
- 便於測試和維護

### 為什麼使用 Set 存儲展開的菜單？
- 快速查詢 O(1)
- 自動去重
- API 簡潔（add/delete/has）

---

## 🔗 參考資源

- [Vue Router - Nested Routes](https://router.vuejs.org/guide/essentials/nested-routes.html)
- [Pinia - State Management](https://pinia.vuejs.org/)
- [MDN - Flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout)
- [Electron - Layout Patterns](https://www.electronjs.org/docs/latest/tutorial/ui)

---

**設計完成日期**: 2026-06-03  
**設計者**: AI Assistant  
**狀態**: ✅ 待評審
