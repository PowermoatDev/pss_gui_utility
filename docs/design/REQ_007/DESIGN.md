# Vue 3 完整應用結構 - 需求與設計

> 需求編號：REQ-007  
> 建立日期：2026-06-03  
> 狀態：設計階段  
> 優先級：P1

---

## 📋 需求概述

完善當前 Vue 3 應用結構，從單一文件應用升級為完整的企業級應用架構。

### 當前狀態
- ✅ Vue 3 基礎應用（單一 App.vue）
- ✅ Vite 構建工具
- ✅ Composition API
- ❌ 無路由系統
- ❌ 無狀態管理
- ❌ 無組件化結構

### 目標狀態
- ✅ Vue Router 4（多頁面路由）
- ✅ Pinia（狀態管理）
- ✅ 組件化架構
- ✅ 頁面/組件分離
- ✅ Composables（可重用邏輯）
- ✅ 移除當前簡單頁面，改為完整應用結構

---

## 🎯 設計方案

### 1. 目錄結構設計

```
src/
├── App.vue                 # 根組件
├── main.js                 # 應用入口
├── style.css               # 全局樣式
│
├── router/                 # 路由配置
│   └── index.js            # 路由定義
│
├── stores/                 # Pinia 狀態管理
│   └── app.js              # 應用狀態 store
│
├── views/                  # 頁面組件
│   ├── Home.vue            # 首頁
│   ├── About.vue           # 關於頁面
│   └── Settings.vue        # 設定頁面
│
├── components/             # 可重用組件
│   ├── common/             # 通用組件
│   │   ├── Header.vue      # 頁首
│   │   ├── Footer.vue      # 頁尾
│   │   └── Card.vue        # 卡片組件
│   └── layout/             # 佈局組件
│       └── MainLayout.vue  # 主佈局
│
├── composables/            # 組合式函數
│   └── useSystemInfo.js    # 系統資訊邏輯
│
├── assets/                 # 靜態資源
│   ├── images/             # 圖片
│   └── styles/             # 樣式文件
│       ├── variables.css   # CSS 變數
│       └── common.css      # 通用樣式
│
└── utils/                  # 工具函數
    └── helpers.js          # 輔助函數
```

---

## 🔧 技術實作細節

### 2.1 Vue Router 4 設置

**安裝依賴**
```bash
npm install vue-router@4
```

**路由配置** (`src/router/index.js`)
```javascript
import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import About from '@/views/About.vue'
import Settings from '@/views/Settings.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
```

**為什麼使用 createWebHashHistory？**
- Electron 應用中，使用 Hash 模式更穩定
- 不需要服務器配置
- 避免路由刷新問題

---

### 2.2 Pinia 狀態管理設置

**安裝依賴**
```bash
npm install pinia
```

**Store 配置** (`src/stores/app.js`)
```javascript
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAppStore = defineStore('app', () => {
  // 狀態
  const appName = ref('PSS GUI Utility')
  const version = ref('1.0.0')
  const platform = ref('')
  const nodeVersion = ref('')
  const electronVersion = ref('')
  
  // Computed
  const systemInfo = computed(() => ({
    platform: platform.value,
    node: nodeVersion.value,
    electron: electronVersion.value
  }))
  
  // Actions
  function setSystemInfo(info) {
    if (info.platform) platform.value = info.platform
    if (info.node) nodeVersion.value = info.node
    if (info.electron) electronVersion.value = info.electron
  }
  
  return {
    appName,
    version,
    platform,
    nodeVersion,
    electronVersion,
    systemInfo,
    setSystemInfo
  }
})
```

**主入口更新** (`src/main.js`)
```javascript
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './style.css'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.mount('#app')
```

---

### 2.3 組件化重構

#### MainLayout.vue
```vue
<template>
  <div class="main-layout">
    <Header />
    <main class="main-content">
      <router-view />
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Header from '@/components/common/Header.vue'
import Footer from '@/components/common/Footer.vue'
</script>
```

#### Header.vue
```vue
<template>
  <header class="app-header">
    <h1>🚀 {{ appName }}</h1>
    <nav>
      <router-link to="/">首頁</router-link>
      <router-link to="/about">關於</router-link>
      <router-link to="/settings">設定</router-link>
    </nav>
  </header>
</template>

<script setup>
import { useAppStore } from '@/stores/app'
import { storeToRefs } from 'pinia'

const appStore = useAppStore()
const { appName } = storeToRefs(appStore)
</script>
```

#### Card.vue (可重用組件)
```vue
<template>
  <div class="card">
    <h3 v-if="title">{{ title }}</h3>
    <slot></slot>
  </div>
</template>

<script setup>
defineProps({
  title: String
})
</script>

<style scoped>
.card {
  background: white;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}
</style>
```

---

### 2.4 Composables 設計

**useSystemInfo.js**
```javascript
import { ref, onMounted } from 'vue'
import { useAppStore } from '@/stores/app'

export function useSystemInfo() {
  const appStore = useAppStore()
  const loading = ref(false)
  const error = ref(null)
  
  const loadSystemInfo = () => {
    loading.value = true
    try {
      if (window.api) {
        const info = {
          platform: window.api.platform || 'Unknown',
          node: window.api.versions?.node || 'Unknown',
          electron: window.api.versions?.electron || 'Unknown'
        }
        appStore.setSystemInfo(info)
      }
    } catch (e) {
      error.value = e.message
    } finally {
      loading.value = false
    }
  }
  
  onMounted(() => {
    loadSystemInfo()
  })
  
  return {
    loading,
    error,
    loadSystemInfo
  }
}
```

---

### 2.5 頁面組件設計

#### Home.vue
```vue
<template>
  <div class="home">
    <Card title="歡迎使用">
      <p>這是一個 Vue 3 + Electron 桌面應用程式</p>
    </Card>
    
    <Card title="快速操作">
      <button @click="navigate('/about')">查看關於</button>
      <button @click="navigate('/settings')">前往設定</button>
    </Card>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import Card from '@/components/common/Card.vue'

const router = useRouter()

const navigate = (path) => {
  router.push(path)
}
</script>
```

#### About.vue
```vue
<template>
  <div class="about">
    <Card title="關於本應用">
      <ul class="tech-stack">
        <li>⚡ Vue 3 - 前端框架</li>
        <li>📦 Vite - 構建工具</li>
        <li>🖥️ Electron - 桌面應用</li>
        <li>🎯 Vue Router - 路由管理</li>
        <li>🗄️ Pinia - 狀態管理</li>
      </ul>
    </Card>
    
    <Card title="版本資訊">
      <p>版本: {{ version }}</p>
      <button @click="router.back()">返回</button>
    </Card>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAppStore } from '@/stores/app'
import { storeToRefs } from 'pinia'
import Card from '@/components/common/Card.vue'

const router = useRouter()
const appStore = useAppStore()
const { version } = storeToRefs(appStore)
</script>
```

#### Settings.vue
```vue
<template>
  <div class="settings">
    <Card title="系統資訊">
      <div v-if="!loading">
        <p>平台: {{ systemInfo.platform }}</p>
        <p>Node: {{ systemInfo.node }}</p>
        <p>Electron: {{ systemInfo.electron }}</p>
      </div>
      <p v-else>載入中...</p>
      <p v-if="error" class="error">{{ error }}</p>
    </Card>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useAppStore } from '@/stores/app'
import { useSystemInfo } from '@/composables/useSystemInfo'
import Card from '@/components/common/Card.vue'

const appStore = useAppStore()
const { systemInfo } = storeToRefs(appStore)
const { loading, error } = useSystemInfo()
</script>
```

---

### 2.6 App.vue 重構

```vue
<template>
  <div id="app">
    <MainLayout />
  </div>
</template>

<script setup>
import MainLayout from '@/components/layout/MainLayout.vue'
</script>

<style scoped>
#app {
  min-height: 100vh;
}
</style>
```

---

### 2.7 Vite 配置更新

**vite.config.js**
```javascript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  base: './',
  server: {
    port: 5173,
    strictPort: true,
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

---

## 📦 需要安裝的依賴

```json
{
  "dependencies": {
    "vue-router": "^4.0.0",
    "pinia": "^2.0.0"
  }
}
```

---

## ✅ 實作步驟（等待 GO SPRINT 指令）

### Phase 1: 安裝依賴
1. 安裝 vue-router@4
2. 安裝 pinia

### Phase 2: 建立目錄結構
1. 創建 `src/router/` 目錄
2. 創建 `src/stores/` 目錄
3. 創建 `src/views/` 目錄
4. 創建 `src/components/common/` 目錄
5. 創建 `src/components/layout/` 目錄
6. 創建 `src/composables/` 目錄
7. 創建 `src/utils/` 目錄
8. 創建 `src/assets/styles/` 目錄

### Phase 3: 路由系統
1. 創建 `router/index.js`
2. 創建 `views/Home.vue`
3. 創建 `views/About.vue`
4. 創建 `views/Settings.vue`
5. 更新 `main.js` 引入路由

### Phase 4: 狀態管理
1. 創建 `stores/app.js`
2. 更新 `main.js` 引入 Pinia

### Phase 5: 組件化
1. 創建 `components/common/Header.vue`
2. 創建 `components/common/Footer.vue`
3. 創建 `components/common/Card.vue`
4. 創建 `components/layout/MainLayout.vue`

### Phase 6: Composables
1. 創建 `composables/useSystemInfo.js`

### Phase 7: 重構主應用
1. 重構 `App.vue`（移除當前所有內容）
2. 更新樣式文件
3. 移除舊的頁面邏輯和組件

### Phase 8: 測試
1. 測試路由切換
2. 測試狀態管理
3. 測試組件互動
4. 驗證應用正常運行

---

## 🎯 預期效果

### 功能
- ✅ 多頁面導航（首頁/關於/設定）
- ✅ 全局狀態管理
- ✅ 可重用組件
- ✅ 清晰的代碼結構
- ✅ 易於維護和擴展

### 性能
- ✅ 按需載入（路由懶加載）
- ✅ 組件級別的代碼分割
- ✅ 優化的構建輸出

### 開發體驗
- ✅ 模組化開發
- ✅ 邏輯可重用
- ✅ 代碼組織清晰
- ✅ 便於團隊協作

---

## 📊 估算

- **工作量**: 4-5 小時
- **複雜度**: 中等
- **風險**: 低

---

## 🔗 相關文檔

- [Vue Router 官方文檔](https://router.vuejs.org/)
- [Pinia 官方文檔](https://pinia.vuejs.org/)
- [Vue 3 Composition API](https://vuejs.org/guide/extras/composition-api-faq.html)

---

## 📝 備註

- 使用 Hash 模式路由，適合 Electron 應用
- Pinia 使用 Composition API 風格
- 所有組件使用 `<script setup>` 語法
- 使用 JavaScript（不使用 TypeScript）
- 遵循 Vue 3 最佳實踐

---

**狀態**: 等待用戶確認實作

**下一步**: 用戶說"實作"時，將此需求加入 SPRINT；用戶說"GO SPRINT"時，開始執行實作。
