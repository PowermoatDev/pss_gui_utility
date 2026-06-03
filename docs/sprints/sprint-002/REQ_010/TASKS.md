# REQ-010 任務清單

> Sprint: Sprint-002  
> 需求編號: REQ-010  
> 開始日期: 2026-06-03  
> 預計完成: 2026-06-03

---

## 📋 任務概覽

**總工時估算**: 3.5 小時  
**已完成**: 8/8 任務

---

## ✅ 任務列表

### TASK-032: 安裝資料庫驅動套件
- **描述**: 安裝 mssql 和 mysql2 套件
- **估時**: 5 分鐘
- **狀態**: ✅ 已完成
- **指令**: `npm install mssql mysql2`

### TASK-033: 建立 configManager.js 模組
- **描述**: 實現設定檔讀寫、預設設定功能
- **估時**: 45 分鐘
- **狀態**: ✅ 已完成
- **檔案**: electron/utils/configManager.js

### TASK-034: 建立 dbConnector.js 模組
- **描述**: 實現 MS SQL 和 MySQL 連線測試功能
- **估時**: 30 分鐘
- **狀態**: ✅ 已完成
- **檔案**: electron/utils/dbConnector.js

### TASK-035: 更新 preload.js IPC 接口
- **描述**: 新增 config 相關 IPC 通訊接口
- **估時**: 15 分鐘
- **狀態**: ✅ 已完成
- **檔案**: electron/preload.js

### TASK-036: 更新 main.js IPC 處理器
- **描述**: 註冊 config 相關 IPC 處理器
- **估時**: 15 分鐘
- **狀態**: ✅ 已完成
- **檔案**: electron/main.js

### TASK-037: 建立 config.js Pinia store
- **描述**: 實現設定狀態管理和 IPC 呼叫封裝
- **估時**: 30 分鐘
- **狀態**: ✅ 已完成
- **檔案**: src/stores/config.js

### TASK-038: 修改 Settings.vue 新增資料庫設定表單
- **描述**: 新增資料庫連線設定 UI 和表單驗證
- **估時**: 60 分鐘
- **狀態**: ✅ 已完成
- **檔案**: src/views/Settings.vue

### TASK-039: 測試與驗證
- **描述**: 測試設定檔讀寫、資料庫連線測試功能
- **估時**: 20 分鐘
- **狀態**: ✅ 已完成

---

## 📝 實作記錄

### 2026-06-03
- 創建任務文檔
- 規劃 8 個任務
- 加入 Sprint-002
