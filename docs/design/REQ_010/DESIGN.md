# REQ-010 設計方案

## 設計目標

建立基於外部 JSON 檔案的應用設定保存機制，並實現資料庫連線配置功能，支援 MS SQL 和 MySQL 兩種資料庫類型。

---

## 📂 技術架構

### 設定檔管理

```
應用資料目錄/
├─ config/
│  └─ app-config.json    # 應用設定檔
└─ logs/
   └─ app.log            # 應用日誌
```

**設定檔路徑** (Electron)：
- Windows: `%APPDATA%/pss-gui-utility/config/app-config.json`
- macOS: `~/Library/Application Support/pss-gui-utility/config/app-config.json`
- Linux: `~/.config/pss-gui-utility/config/app-config.json`

---

## 🗂️ 設定檔結構

### app-config.json

```json
{
  "version": "1.0.0",
  "database": {
    "type": "mssql",
    "host": "localhost",
    "port": 1433,
    "username": "sa",
    "password": "your_password",
    "database": "master"
  },
  "application": {
    "language": "zh-TW",
    "theme": "light"
  },
  "metadata": {
    "createdAt": "2026-06-03T12:00:00.000Z",
    "lastModified": "2026-06-03T12:00:00.000Z"
  }
}
```

### 欄位說明

| 欄位 | 類型 | 必填 | 說明 |
|-----|------|------|------|
| version | string | ✅ | 設定檔版本 |
| database.type | string | ✅ | 資料庫類型：`mssql` \| `mysql` |
| database.host | string | ✅ | 資料庫主機位址 |
| database.port | number | ⚪ | 端口（預設：MSSQL=1433, MySQL=3306）|
| database.username | string | ✅ | 使用者名稱 |
| database.password | string | ✅ | 密碼 |
| database.database | string | ⚪ | 資料庫名稱 |

---

## 🏗️ 實作架構

> **重要**：資料庫驅動 (mssql, mysql2) 必須在 Electron Main Process (Node.js 環境) 中使用，Vue 前端透過 IPC 通訊呼叫後端功能。

### 1. 後端 (Electron Main Process)

**專案結構**：
```
electron/
├─ main.js              # Main process 入口
├─ preload.js           # IPC 橋接
└─ utils/
   ├─ configManager.js  # 設定檔管理
   └─ dbConnector.js    # 資料庫連線測試 (使用 mssql/mysql2)
```

#### electron/utils/configManager.js
```javascript
// 設定檔管理模組
- getConfigPath()      // 取得設定檔路徑
- loadConfig()         // 讀取設定檔
- saveConfig(config)   // 保存設定檔
- getDefaultConfig()   // 取得預設設定
```

#### electron/preload.js
```javascript
// 新增 IPC 通訊接口
contextBridge.exposeInMainWorld('config', {
  load: () => ipcRenderer.invoke('config:load'),
  save: (config) => ipcRenderer.invoke('config:save', config),
  testConnection: (dbConfig) => ipcRenderer.invoke('config:testConnection', dbConfig)
})
```

#### electron/main.js
```javascript
const { app, BrowserWindow, ipcMain } = require('electron')
const { loadConfig, saveConfig } = require('./utils/configManager')
const { testDatabaseConnection } = require('./utils/dbConnector')

// 註冊 IPC 處理器
ipcMain.handle('config:load', async () => {
  return await loadConfig()
})

ipcMain.handle('config:save', async (event, config) => {
  return await saveConfig(config)
})

ipcMain.handle('config:testConnection', async (event, dbConfig) => {
  return await testDatabaseConnection(dbConfig)
})
```

#### electron/utils/dbConnector.js
```javascript
// 資料庫連線測試模組 (使用 mssql 和 mysql2)
const sql = require('mssql')
const mysql = require('mysql2/promise')

async function testDatabaseConnection(config) {
  if (config.type === 'mssql') {
    return await testMsSqlConnection(config)
  } else if (config.type === 'mysql') {
    return await testMySqlConnection(config)
  }
  return { success: false, message: '不支援的資料庫類型' }
}

module.exports = { testDatabaseConnection }
```

### 2. 前端 (Vue - 渲染進程)

**專案結構**：
```
src/
├─ stores/
│  └─ config.js         # 設定狀態管理
└─ views/
   └─ Settings.vue      # 設定頁面 UI
```

> **注意**：Vue 前端**不直接**使用 mssql/mysql2，所有資料庫操作透過 `window.config.testConnection()` 呼叫後端。

#### src/stores/config.js
```javascript
import { defineStore } from 'pinia'

export const useConfigStore = defineStore('config', () => {
  const config = ref(null)
  
  async function loadConfig() {
    config.value = await window.config.load()
  }
  
  async function saveConfig(newConfig) {
    await window.config.save(newConfig)
    config.value = newConfig
  }
  
  async function testConnection(dbConfig) {
    return await window.config.testConnection(dbConfig)
  }
  
  return { config, loadConfig, saveConfig, testConnection }
})
```

#### src/views/Settings.vue
```vue
<template>
  <Card title="資料庫連線設定">
    <div class="setting-item">
      <label>資料庫種類</label>
      <select v-model="dbConfig.type">
        <option value="mssql">MS SQL Server</option>
        <option value="mysql">MySQL</option>
      </select>
    </div>
    
    <div class="setting-item">
      <label>主機位址 (Host)</label>
      <input v-model="dbConfig.host" placeholder="localhost" />
    </div>
    
    <div class="setting-item">
      <label>使用者名稱</label>
      <input v-model="dbConfig.username" placeholder="admin" />
    </div>
    
    <div class="setting-item">
      <label>密碼</label>
      <div class="password-input">
        <input 
          :type="showPassword ? 'text' : 'password'"
          v-model="dbConfig.password" 
        />
        <button @click="showPassword = !showPassword">
          {{ showPassword ? '👁️' : '👁️‍🗨️' }}
        </button>
      </div>
    </div>
    
    <div class="actions">
      <button @click="testConnection">測試連線</button>
      <button @click="saveConfig" class="primary">儲存設定</button>
    </div>
  </Card>
</template>
```

---

## 🔒 安全性設計

### 檔案權限

- 設定檔權限：`600` (僅擁有者可讀寫)
- 目錄權限：`700` (僅擁有者可存取)

> **注意**: 密碼以明文形式保存在設定檔中，請確保設定檔權限正確，避免未授權存取。

---

## 🧪 測試連線功能

### 資料庫連線測試

```javascript
// MS SQL 測試
const sql = require('mssql')

async function testMsSqlConnection(config) {
  try {
    await sql.connect({
      server: config.host,
      user: config.username,
      password: config.password,
      options: {
        encrypt: true,
        trustServerCertificate: true
      }
    })
    return { success: true, message: '連線成功' }
  } catch (err) {
    return { success: false, message: err.message }
  }
}

// MySQL 測試
const mysql = require('mysql2/promise')

async function testMySqlConnection(config) {
  try {
    const connection = await mysql.createConnection({
      host: config.host,
      user: config.username,
      password: config.password
    })
    await connection.ping()
    return { success: true, message: '連線成功' }
  } catch (err) {
    return { success: false, message: err.message }
  }
}
```

---

## 📋 實作任務清單

### Phase 1: 設定檔機制 (1.5 小時)
1. 建立 configManager.js 模組
2. 實現設定檔讀寫功能
3. 建立預設設定
4. 整合 Electron IPC 通訊

### Phase 2: UI 實作 (1.5 小時)
1. 建立 config.js Pinia store
2. 修改 Settings.vue 新增資料庫設定表單
3. 實現表單驗證
4. 實現密碼顯示/隱藏切換
5. 設計表單樣式

### Phase 3: 資料庫連線測試 (0.5 小時)
1. 安裝資料庫驅動 (mssql, mysql2)
2. 實現連線測試功能
3. 顯示測試結果訊息

---

## 🎨 UI 設計

### Settings 頁面新增區塊

```
⚙️ 系統設定
┌─────────────────────────────────┐
│ 資料庫連線設定                    │
├─────────────────────────────────┤
│ 資料庫種類: [MS SQL Server ▼]   │
│ 主機位址: [localhost        ]   │
│ 使用者名稱: [admin            ]   │
│ 密碼: [••••••••] [👁️]          │
│                                  │
│ [測試連線] [儲存設定]            │
└─────────────────────────────────┘
```

---

## ✅ 驗收標準

### 功能驗收
1. ✅ 應用啟動時自動讀取設定檔
2. ✅ 設定檔不存在時創建預設設定檔
3. ✅ 設定頁面正確顯示資料庫連線表單
4. ✅ 表單驗證必填欄位
5. ✅ 儲存後設定立即生效
6. ✅ 測試連線功能正常運作
7. ✅ 連線成功/失敗顯示適當訊息

### 安全驗收
1. ✅ 設定檔權限正確 (600)
2. ✅ 設定檔路徑遵循系統規範

### 效能驗收
1. ✅ 設定讀取 < 100ms
2. ✅ 設定保存 < 200ms
3. ✅ 連線測試超時設定 (5 秒)

---

## 🚀 未來擴展

### Phase 2 功能
- 支援多組資料庫設定
- 資料庫連線池配置
- SQL Server 認證模式選擇
- MySQL SSL 連線設定
- 設定檔備份/還原功能
- 設定匯入/匯出功能

---

## 📝 技術依賴

### NPM 套件

**前端依賴** (package.json - dependencies):
```json
{
  "dependencies": {
    "vue": "^3.5.30",
    "pinia": "^2.1.7"
  }
}
```

**後端依賴** (Electron Main Process):
```json
{
  "dependencies": {
    "electron": "^34.0.0",
    "mssql": "^10.0.1",
    "mysql2": "^3.6.5"
  }
}
```

> **架構說明**：
> - `mssql`, `mysql2`: **僅在 Electron Main Process 使用**
> - Vue 透過 `window.config.*` API (IPC) 與後端通訊
> - 密碼以明文保存，請注意設定檔權限

### Electron API
- `app.getPath('userData')` - 取得應用資料目錄
- `fs` - 檔案系統操作
- `ipcMain` / `ipcRenderer` - IPC 通訊
