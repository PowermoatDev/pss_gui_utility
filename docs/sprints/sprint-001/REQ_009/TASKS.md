# REQ-009 任務清單

> Sprint: Sprint-001  
> 需求編號: REQ-009  
> 開始日期: 2026-06-03  
> 預計完成: 2026-06-03

---

## 📋 任務概覽

**總工時估算**: 1 小時  
**已完成**: 6/6 任務

---

## ✅ 任務列表

### TASK-026: 修改 menuConfig.js 移除菜單項目
- **描述**: 移除 dashboard 父菜單，移除 about 下的 version 子項目
- **估時**: 5 分鐘
- **狀態**: ✅ 完成
- **檔案**: src/router/menuConfig.js

### TASK-027: 修改 router/index.js 移除路由
- **描述**: 移除 /dashboard/stats 和 /about/version 路由及對應 import
- **估時**: 5 分鐘
- **狀態**: ✅ 完成
- **檔案**: src/router/index.js

### TASK-028: 修改 menu.js store 預設狀態
- **描述**: 更新預設展開為 system，更新 expandAll 方法
- **估時**: 5 分鐘
- **狀態**: ✅ 完成
- **檔案**: src/stores/menu.js

### TASK-029: 簡化 Settings.vue 移除外觀設定
- **描述**: 移除外觀設定 Card，保留語言設定和系統資訊
- **估時**: 10 分鐘
- **狀態**: ✅ 完成
- **檔案**: src/views/Settings.vue

### TASK-030: 刪除未使用的頁面
- **描述**: 刪除 DashboardStats.vue 和 AboutVersion.vue
- **估時**: 2 分鐘
- **狀態**: ✅ 完成
- **檔案**: src/views/DashboardStats.vue, src/views/AboutVersion.vue

### TASK-031: 測試與驗證
- **描述**: 啟動應用，驗證菜單結構正確，所有功能正常
- **估時**: 10 分鐘
- **狀態**: ✅ 完成

---

## 📝 實作記錄

### 2026-06-03
- 創建任務文檔
- 規劃 6 個任務
- ✅ 完成所有任務實作
- ✅ 測試通過
- ✅ REQ_009 完成

