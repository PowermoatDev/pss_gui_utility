# 系統架構設計

> 版本：v1.0.0  
> 最後更新：2026-06-03

---

## 📐 整體架構

### 技術棧

```
┌─────────────────────────────────────┐
│     PSS GUI Utility Desktop App     │
├─────────────────────────────────────┤
│                                     │
│  ┌──────────────────────────────┐  │
│  │     Electron (v34.0.0)       │  │  ← 桌面應用框架
│  │  ┌────────────────────────┐  │  │
│  │  │   Main Process         │  │  │  ← 主進程
│  │  │   (Node.js)            │  │  │
│  │  └────────────────────────┘  │  │
│  │           ↕                   │  │
│  │  ┌────────────────────────┐  │  │
│  │  │   Renderer Process     │  │  │  ← 渲染進程
│  │  │   ┌────────────────┐   │  │  │
│  │  │   │   Vue 3        │   │  │  │  ← 前端框架
│  │  │   │   (v3.5.30)    │   │  │  │
│  │  │   └────────────────┘   │  │  │
│  │  └────────────────────────┘  │  │
│  └──────────────────────────────┘  │
│                                     │
│  ┌──────────────────────────────┐  │
│  │   Vite (v8.0.16)             │  │  ← 開發/構建工具
│  └──────────────────────────────┘  │
│                                     │
└─────────────────────────────────────┘
```

---

## 🏗️ 架構層次

### 1. 應用層 (Application Layer)

**Electron 主進程 (Main Process)**
- 檔案位置：`electron/main.js`
- 職責：
  - 創建應用視窗
  - 生命週期管理
  - 系統級操作
  - 安全性控制 (CSP)

**Electron 預載腳本 (Preload)**
- 檔案位置：`electron/preload.js`
- 職責：
  - 橋接主進程與渲染進程
  - 暴露安全的 API 給前端
  - Context Isolation 實現

### 2. 展示層 (Presentation Layer)

**Vue 3 應用**
- 檔案位置：`src/`
- 職責：
  - 使用者介面
  - 互動邏輯
  - 狀態管理
  - 路由控制（未來可加入）

**組件結構**
```
src/
├── App.vue           # 根組件
├── main.js           # 入口文件
├── style.css         # 全局樣式
├── components/       # （未來）可重用組件
├── views/            # （未來）頁面組件
└── composables/      # （未來）組合式函數
```

### 3. 構建層 (Build Layer)

**Vite**
- 配置：`vite.config.js`
- 職責：
  - 開發服務器（HMR）
  - 代碼打包
  - 資源優化
  - 模組解析

**Electron Builder**
- 配置：`package.json` > `build`
- 職責：
  - 應用打包
  - 平台適配（Linux/Windows/Mac）
  - 安裝程式生成

---

## 🔒 安全架構

### Content Security Policy (CSP)

**開發環境**
```javascript
"default-src 'self'; 
 script-src 'self' 'unsafe-inline'; 
 style-src 'self' 'unsafe-inline'; 
 connect-src 'self' ws://localhost:5173"
```

**生產環境**
```javascript
"default-src 'self'; 
 script-src 'self'; 
 style-src 'self' 'unsafe-inline';"
```

### Context Isolation

- ✅ 啟用 `contextIsolation: true`
- ✅ 禁用 `nodeIntegration: false`
- ✅ 使用 `contextBridge` 安全暴露 API

---

## 🔄 資料流

### 當前架構（純前端）

```
使用者操作
    ↓
Vue 組件 (UI Event)
    ↓
本地狀態管理 (ref/reactive)
    ↓
DOM 更新
    ↓
顯示結果
```

### 未來擴展（如需後端）

```
使用者操作
    ↓
Vue 組件
    ↓
window.api (preload)
    ↓
IPC 通訊
    ↓
Electron Main Process
    ↓
外部 API / 本地檔案系統
    ↓
回傳結果
    ↓
更新 UI
```

---

## 📦 模組設計

### 主進程模組

```javascript
// electron/main.js
- Window Management
  ├─ createWindow()       // 創建視窗
  ├─ CSP Configuration    // 安全設定
  └─ Lifecycle Handlers   // 生命週期

- App Events
  ├─ app.whenReady()      // 應用就緒
  ├─ window-all-closed    // 視窗關閉
  └─ activate             // macOS 啟動
```

### 渲染進程模組

```javascript
// src/main.js
- Vue App Initialization
  ├─ createApp()          // 創建應用
  └─ mount('#app')        // 掛載

// src/App.vue
- Root Component
  ├─ Template             // 模板
  ├─ Script (Composition API)  // 邏輯
  └─ Style (Scoped)       // 樣式
```

---

## 🚀 啟動流程

### 開發模式

```
1. npm run dev
   ↓
2. concurrently 同時執行
   ├─ npm run dev:vite    → Vite 開發服務器 (Port 5173)
   └─ npm run dev:electron → Electron 應用
   ↓
3. Electron Main Process 啟動
   ↓
4. 延遲 1000ms（等待 Vite 就緒）
   ↓
5. 創建視窗，載入 http://localhost:5173
   ↓
6. 開發者工具自動開啟
   ↓
7. HMR 啟用，即時更新
```

### 生產模式

```
1. npm run build
   ↓
2. Vite 打包 → dist/
   ↓
3. npm run dist
   ↓
4. Electron Builder 打包
   ↓
5. 生成安裝程式 → release/
```

---

## 🎨 目錄結構

```
pss_gui_utility/
├── docs/                    # 📚 專案文檔
│   ├── AI_COLLABORATION_RULES.md
│   ├── requirements/        # 需求文檔
│   ├── design/             # 設計文檔
│   └── sprints/            # Sprint 記錄
│
├── electron/               # ⚡ Electron 主進程
│   ├── main.js
│   └── preload.js
│
├── src/                    # 🎨 Vue 前端源碼
│   ├── App.vue
│   ├── main.js
│   └── style.css
│
├── dist/                   # 📦 構建輸出（自動生成）
├── release/                # 🚀 打包輸出（自動生成）
├── build/                  # 🛠️ 構建資源
│
├── index.html             # HTML 模板
├── vite.config.js         # Vite 配置
├── package.json           # 專案配置
└── README.md             # 專案說明
```

---

## 🔧 配置檔案

### package.json 核心配置

```json
{
  "main": "electron/main.js",    // Electron 入口
  "scripts": {
    "dev": "concurrently ...",   // 開發模式
    "build": "vite build",       // 前端打包
    "start": "...",              // 生產運行
    "dist": "electron-builder"   // 應用打包
  }
}
```

### vite.config.js

```javascript
{
  plugins: [vue()],              // Vue 3 插件
  base: './',                    // 相對路徑
  server: { port: 5173 },        // 開發端口
  build: { outDir: 'dist' }      // 輸出目錄
}
```

---

## 📊 效能考量

### 當前優化

1. **Vite HMR**：快速熱更新
2. **代碼分割**：按需載入
3. **Tree Shaking**：移除無用代碼
4. **資源壓縮**：生產構建優化

### 未來優化計劃

- [ ] Lazy Loading 路由
- [ ] 圖片資源優化
- [ ] 應用啟動時間優化
- [ ] 記憶體使用監控

---

## 🔄 版本歷史

### v1.0.0 (2026-06-03)
- 初始架構設計
- 純前端應用架構
- 移除 Go 後端依賴
- 建立文檔系統

---

## 🎯 未來擴展方向

### 短期（1-2個月）
- 加入狀態管理（Pinia）
- 實作路由系統（Vue Router）
- 建立組件庫

### 中期（3-6個月）
- 加入測試框架（Vitest）
- CI/CD 流程
- 自動更新機制

### 長期（6個月以上）
- 插件系統
- 主題系統
- 多語言支援

---

## 📖 相關文檔

- [UI/UX 設計](./UI_UX.md)
- [需求文檔](../requirements/BACKLOG.md)
- [AI 協作規則](../AI_COLLABORATION_RULES.md)
