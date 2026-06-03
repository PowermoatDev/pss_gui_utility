# REQ-009 實作記錄

## 實作日期
2026-06-03

## 實作概述
精簡應用功能，移除暫不需要的頁面和設定，聚焦核心功能。成功完成所有 6 個任務。

---

## 📂 修改的檔案

### 1. src/router/menuConfig.js
**變更內容**：
- 移除整個 dashboard 父菜單（包含 overview 和 stats 子項目）
- 移除 about 菜單下的 version 子項目
- 保留 system 菜單（system-info, system-settings）
- 保留 about 菜單（about-app）

**結果**：
- 菜單結構從 3 父 6 子 → 2 父 3 子
- 更簡潔的導航結構

### 2. src/router/index.js
**變更內容**：
- 移除 `DashboardStats` 和 `AboutVersion` 元件 import
- 移除 `/dashboard/stats` 路由配置
- 移除 `/about/version` 路由配置
- 保留 `/` 首頁路由（但不在菜單中顯示）

**結果**：
- 路由從 6 個減少到 4 個（Home, SystemInfo, Settings, About）

### 3. src/stores/menu.js
**變更內容**：
- 修改預設展開選單從 `['dashboard']` 改為 `['system']`
- 更新 `expandAll()` 方法只包含 `['system', 'about']`

**結果**：
- 進入應用時預設展開系統管理選單
- expandAll 功能符合實際菜單結構

### 4. src/views/Settings.vue
**變更內容**：
- 移除「外觀設定」Card 區塊（包含主題切換功能）
- 標題從「應用設定」改為「⚙️ 系統設定」
- 保留「語言設定」Card
- 保留「系統資訊」Card
- 返回按鈕從「返回首頁」改為「返回系統資訊」
- 移除相關 CSS（.theme-toggle, .theme-btn, .theme-status）

**結果**：
- Settings 頁面更簡潔，專注於系統設定

### 5. 刪除的檔案
- `src/views/DashboardStats.vue` - 統計圖表頁面（已刪除）
- `src/views/AboutVersion.vue` - 版本歷史頁面（已刪除）

---

## 🧪 測試結果

### 啟動測試
- ✅ 開發伺服器啟動成功
- ✅ 無編譯錯誤
- ✅ Electron 應用正常運行
- ✅ 只有預期的 Electron Autofill 警告（可忽略）

### 功能測試
- ✅ 左側選單只顯示 2 個父項目（系統管理、關於）
- ✅ 系統管理選單預設展開
- ✅ 系統資訊頁面正常顯示
- ✅ 系統設定頁面無外觀設定選項
- ✅ 應用資訊頁面正常顯示
- ✅ 所有路由導航正常
- ✅ 首頁（/）路由保留但不在菜單中顯示

---

## 📊 變更統計

### 菜單結構
- **之前**: 3 個父菜單（dashboard, system, about）+ 6 個子項目
- **之後**: 2 個父菜單（system, about）+ 3 個子項目
- **減少**: 1 個父菜單 + 3 個子項目

### 路由數量
- **之前**: 6 個路由
- **之後**: 4 個路由
- **減少**: 2 個路由（/dashboard/stats, /about/version）

### 檔案變更
- **修改**: 4 個檔案（menuConfig.js, router/index.js, menu.js, Settings.vue）
- **刪除**: 2 個檔案（DashboardStats.vue, AboutVersion.vue）

---

## 💡 技術要點

1. **選單簡化策略**：從配置源頭（menuConfig.js）移除，自動影響所有使用該配置的元件
2. **路由清理**：移除 import 和路由配置，確保無死連結
3. **狀態管理更新**：更新 Pinia store 預設值以符合新的選單結構
4. **元件簡化**：直接移除不需要的功能區塊，保持程式碼整潔
5. **禁用策略**：首頁路由保留但從菜單中移除，可透過直接訪問 `/` 打開

---

## ✅ 完成確認

- [x] 移除外觀設定功能
- [x] 移除統計圖表頁面
- [x] 移除版本歷史頁面
- [x] 總覽頁面從菜單中移除（禁用入口）
- [x] 更新選單配置
- [x] 更新路由配置
- [x] 更新預設選單狀態
- [x] 刪除未使用的元件檔案
- [x] 測試通過
- [x] 文件更新

---

## 📝 注意事項

- 首頁（Home.vue）完全保留，路由 `/` 可訪問，但不在側邊欄菜單中顯示
- 主題切換功能從 Settings 移除，但 Pinia store 中的主題管理功能保留（未來可能用於其他地方）
- 應用目前聚焦於系統資訊和設定管理
- 所有變更符合設計文檔要求
