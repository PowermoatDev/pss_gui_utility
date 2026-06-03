# REQ-009 設計方案

## 設計目標

精簡應用功能，移除暫不需要的頁面和設定選項，保持程式碼整潔並聚焦核心功能。

---

## 📂 影響範圍

### 需要修改的檔案

1. **src/router/menuConfig.js**
   - 移除 dashboard 父菜單（包含 overview, stats 子項目）
   - 移除 about 菜單下的 version 子項目
   - 注意：總覽頁面不在菜單中顯示，但路由 `/` 保留

2. **src/router/index.js**
   - 移除 `/dashboard/stats` 路由
   - 移除 `/about/version` 路由
   - 移除對應的元件 import
   - 保留 `/` 首頁路由（但不在菜單中顯示）

3. **src/stores/menu.js**
   - 更新預設展開選單（從 dashboard 改為 system）
   - 更新 expandAll 方法以符合新的選單結構

4. **src/views/Settings.vue**
   - 移除「外觀設定」Card 區塊
   - 移除主題切換功能
   - 保留語言設定和系統資訊

### 需要刪除的檔案

1. **src/views/DashboardStats.vue** - 統計圖表頁面
2. **src/views/AboutVersion.vue** - 版本歷史頁面

### 保留但禁用的頁面

1. **src/views/Home.vue** - 首頁總覽（路由保留，但不在側邊欄菜單中顯示）

---

## 🎨 選單結構變更

### 變更前（REQ_008）
```
├─ 📊 儀表板 (dashboard)
│  ├─ 總覽 (overview)
│  └─ 統計圖表 (stats)
├─ 🛠️ 系統管理 (system)
│  ├─ 系統資訊 (info)
│  └─ 系統設定 (settings)
└─ ℹ️ 關於 (about)
   ├─ 應用資訊 (app)
   └─ 版本歷史 (version)
```

### 變更後（REQ_009）
```
├─ 🛠️ 系統管理 (system)
│  ├─ 系統資訊 (info)
│  └─ 系統設定 (settings)
└─ ℹ️ 關於 (about)
   └─ 應用資訊 (app)
```

---

## 🔄 路由變更

### 移除的路由
- `/dashboard/stats` → 刪除
- `/about/version` → 刪除

### 保留的路由
- `/` - 首頁（Home）
- `/system/info` - 系統資訊
- `/settings` - 系統設定
- `/about` - 應用資訊

---

## 🛠️ 技術實作要點

### 1. menuConfig.js 修改
```javascript
// 移除整個 dashboard 父菜單
// 移除 about 下的 version 子項目
export const menuConfig = [
  {
    id: 'system',
    title: '🛠️ 系統管理',
    children: [
      { id: 'system-info', title: '系統資訊', path: '/system/info' },
      { id: 'system-settings', title: '系統設定', path: '/settings' }
    ]
  },
  {
    id: 'about',
    title: 'ℹ️ 關於',
    children: [
      { id: 'about-app', title: '應用資訊', path: '/about' }
    ]
  }
]
```

### 2. router/index.js 修改
```javascript
// 移除以下 import
// import DashboardStats from '../views/DashboardStats.vue'
// import AboutVersion from '../views/AboutVersion.vue'

// 移除以下 routes
// { path: '/dashboard/stats', ... }
// { path: '/about/version', ... }
```

### 3. menu.js store 修改
```javascript
// 更新預設展開
const expandedMenus = ref(new Set(['system'])) // 從 'dashboard' 改為 'system'

// 更新 expandAll
function expandAll() {
  expandedMenus.value = new Set(['system', 'about']) // 移除 'dashboard'
}
```

### 4. Settings.vue 修改
```vue
<!-- 移除外觀設定 Card -->
<template>
  <div class="settings">
    <h1>⚙️ 系統設定</h1>
    
    <!-- 保留語言設定 Card -->
    <Card title="語言設定">
      <!-- ... -->
    </Card>
    
    <!-- 保留系統資訊 Card -->
    <Card title="系統資訊">
      <!-- ... -->
    </Card>
  </div>
</template>
```

---

## ✅ 驗收標準

1. ✅ 左側選單只顯示「系統管理」和「關於」兩個父項目
2. ✅ 「系統管理」下有「系統資訊」和「系統設定」
3. ✅ 「關於」下只有「應用資訊」
4. ✅ Settings 頁面無外觀設定選項
5. ✅ 無法訪問 /dashboard/stats 和 /about/version 路由
6. ✅ 應用啟動時預設展開「系統管理」選單
7. ✅ 所有保留的頁面功能正常
8. ✅ 無編譯錯誤或警告

---

## 📊 影響評估

### 優點
- 程式碼更簡潔，減少維護成本
- 選單結構更清晰，用戶導航更簡單
- 聚焦核心功能，避免分散開發資源

### 風險
- 低 - 只是移除功能，不影響現有核心功能
- 未來若需要恢復，可從 git 歷史中還原

### 注意事項
- 首頁（Home.vue）完全保留，路由 `/` 可訪問，但不在側邊欄菜單中顯示
- 用戶可以透過瀏覽器直接訪問 `/` 或透過其他方式（如快捷鍵）訪問首頁
- 主題功能從 UI 移除，但 store 中保留（未來可能用於其他地方）
- 側邊欄選單聚焦於系統管理功能，首頁作為獨立入口存在
