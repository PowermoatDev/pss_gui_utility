# REQ-012 整合 View UI Plus 元件庫

> **狀態**: 📝 待評估  
> **優先級**: P2  
> **預估工時**: 8-10 小時  
> **建立日期**: 2026-06-03

---

## 📋 需求概述

將現有自定義 UI 元件替換為 **View UI Plus**（Vue 3 版本的 iView）元件庫，提升 UI 一致性、減少維護成本，並獲得更豐富的互動元件。

---

## 🎯 需求背景

### 當前狀況
1. **自定義元件**: 使用簡單的自製 Card 元件
2. **樣式分散**: 各頁面樣式獨立，缺乏統一規範
3. **功能有限**: 缺少常見 UI 元件（Table、Modal、Message 等）
4. **維護成本**: 需要自行處理響應式、主題等問題

### View UI Plus 優勢
1. **成熟穩定**: iView 的 Vue 3 版本，生態成熟
2. **元件豐富**: 60+ 高質量元件
3. **中文友好**: 官方提供完整中文文檔
4. **主題定制**: 支援 Less/SCSS 變數定制
5. **響應式**: 內建柵格系統和響應式支援

---

## 📊 當前 UI 狀態

### 現有元件
```
src/
├── components/
│   └── Card.vue           # 自製卡片元件
└── views/
    ├── Home.vue           # 簡單文字
    ├── SystemInfo.vue     # Card + 系統資訊
    ├── Settings.vue       # Card + Form（原生）
    └── About.vue          # Card + 文字
```

### 使用的原生 HTML 元素
- `<input>` - 輸入框
- `<select>` - 下拉選單
- `<button>` - 按鈕
- `<div class="card">` - 卡片容器

---

## 🎯 目標狀態

### 整合 View UI Plus
```
src/
├── components/
│   └── (移除自製 Card，使用 View UI)
├── views/
│   ├── Home.vue           # Card 元件
│   ├── SystemInfo.vue     # Card + Descriptions
│   ├── Settings.vue       # Card + Form + Input + Select + Button
│   └── About.vue          # Card + Typography
└── plugins/
    └── view-ui.js         # View UI Plus 配置
```

### 使用 View UI Plus 元件
- `Card` - 卡片容器
- `Form` / `FormItem` - 表單
- `Input` - 輸入框
- `Select` / `Option` - 下拉選單
- `Button` - 按鈕
- `Descriptions` - 描述列表
- `Message` - 訊息提示
- `Icon` - 圖標

---

## 🏗️ 技術方案

### 1. 安裝 View UI Plus

```bash
npm install view-ui-plus --save
```

**套件資訊**:
- 名稱: `view-ui-plus`
- 版本: ^1.3.1（Vue 3 支援）
- 官網: https://www.iviewui.com/view-ui-plus
- GitHub: https://github.com/view-design/ViewUIPlus

### 2. 全局引入配置

#### src/plugins/view-ui.js
```javascript
import ViewUIPlus from 'view-ui-plus'
import 'view-ui-plus/dist/styles/viewuiplus.css'
import zhTW from 'view-ui-plus/dist/locale/zh-TW'

export function setupViewUI(app) {
  app.use(ViewUIPlus, {
    locale: zhTW,
    transfer: true,
    capture: false,
    select: {
      arrow: 'ios-arrow-down',
      arrowSize: 20
    }
  })
}
```

#### src/main.js
```javascript
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { setupViewUI } from './plugins/view-ui'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
setupViewUI(app)

app.mount('#app')
```

### 3. 元件替換方案

#### Settings.vue 改造

**改造前（原生元件）**:
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
      <label>主機位址</label>
      <input v-model="dbConfig.host" type="text" />
    </div>
    
    <button @click="testConnection">測試連線</button>
    <button @click="saveConfig">儲存設定</button>
  </Card>
</template>
```

**改造後（View UI Plus）**:
```vue
<template>
  <Card dis-hover :bordered="false">
    <template #title>
      <Icon type="ios-settings" />
      資料庫連線設定
    </template>
    
    <Form :model="dbConfig" :label-width="120">
      <FormItem label="資料庫種類">
        <Select v-model="dbConfig.type" placeholder="請選擇資料庫類型">
          <Option value="mssql">MS SQL Server</Option>
          <Option value="mysql">MySQL</Option>
        </Select>
      </FormItem>
      
      <FormItem label="主機位址" required>
        <Input 
          v-model="dbConfig.host" 
          placeholder="localhost"
          clearable
        />
      </FormItem>
      
      <FormItem label="端口號">
        <InputNumber 
          v-model="dbConfig.port" 
          :min="1" 
          :max="65535"
          :placeholder="dbConfig.type === 'mssql' ? '1433' : '3306'"
        />
      </FormItem>
      
      <FormItem label="使用者名稱" required>
        <Input 
          v-model="dbConfig.username" 
          placeholder="admin"
          clearable
        />
      </FormItem>
      
      <FormItem label="密碼">
        <Input 
          v-model="dbConfig.password" 
          type="password"
          password
          placeholder="請輸入密碼"
        />
      </FormItem>
      
      <FormItem label="資料庫名稱">
        <Input 
          v-model="dbConfig.database" 
          placeholder="預設資料庫"
          clearable
        />
      </FormItem>
      
      <FormItem>
        <Button 
          type="primary" 
          icon="md-link"
          :loading="loading"
          @click="testConnection"
        >
          測試連線
        </Button>
        <Button 
          type="success" 
          icon="md-checkmark"
          :loading="loading"
          @click="saveConfiguration"
          style="margin-left: 8px"
        >
          儲存設定
        </Button>
      </FormItem>
    </Form>
  </Card>
</template>

<script setup>
import { ref } from 'vue'
import { Message } from 'view-ui-plus'
import { useConfigStore } from '../stores/config'

const configStore = useConfigStore()
const loading = ref(false)

async function testConnection() {
  loading.value = true
  const result = await configStore.testConnection(dbConfig.value)
  loading.value = false
  
  if (result.success) {
    Message.success(result.message)
  } else {
    Message.error(result.message)
  }
}
</script>
```

#### SystemInfo.vue 改造

**改造後（View UI Plus）**:
```vue
<template>
  <Card dis-hover>
    <template #title>
      <Icon type="ios-information-circle" />
      系統資訊
    </template>
    
    <Descriptions :column="2" border>
      <DescriptionsItem label="作業系統">
        <Tag color="primary">{{ systemInfo.platform }}</Tag>
      </DescriptionsItem>
      <DescriptionsItem label="架構">
        {{ systemInfo.arch }}
      </DescriptionsItem>
      <DescriptionsItem label="Node.js 版本">
        <Tag color="success">{{ systemInfo.node }}</Tag>
      </DescriptionsItem>
      <DescriptionsItem label="Chrome 版本">
        {{ systemInfo.chrome }}
      </DescriptionsItem>
      <DescriptionsItem label="Electron 版本">
        <Tag color="warning">{{ systemInfo.electron }}</Tag>
      </DescriptionsItem>
    </Descriptions>
  </Card>
</template>
```

### 4. 移除自製元件

- 刪除 `src/components/Card.vue`
- 更新所有引用 Card 的頁面

---

## 📋 實作任務

### Phase 1: 安裝與配置 (1 小時)
1. 安裝 view-ui-plus 套件
2. 建立 plugins/view-ui.js 配置檔
3. 更新 main.js 引入 View UI Plus
4. 測試基本元件顯示
5. 配置中文語系

### Phase 2: Settings.vue 改造 (3 小時)
1. 替換資料庫設定表單為 Form/FormItem
2. 替換輸入框為 Input/InputNumber
3. 替換下拉選單為 Select/Option
4. 替換按鈕為 Button
5. 使用 Message 替換自製訊息提示
6. 調整樣式和佈局
7. 測試表單驗證和互動

### Phase 3: SystemInfo.vue 改造 (1.5 小時)
1. 使用 Card 元件替換自製 Card
2. 使用 Descriptions 顯示系統資訊
3. 使用 Tag 標籤美化版本資訊
4. 調整樣式和佈局

### Phase 4: 其他頁面改造 (1.5 小時)
1. Home.vue 使用 Card 和 Typography
2. About.vue 使用 Card 和 Descriptions
3. 統一各頁面風格

### Phase 5: 樣式優化與測試 (1-2 小時)
1. 自定義主題顏色（可選）
2. 調整全局樣式
3. 測試所有頁面和互動
4. 響應式測試
5. 移除舊的自製元件和樣式

---

## 🎨 視覺效果提升

### 改造前
```
┌─────────────────────┐
│ 資料庫連線設定       │ <- 簡單文字標題
├─────────────────────┤
│ 資料庫種類:         │
│ [下拉選單    ▼]     │ <- 原生 HTML select
│                     │
│ 主機位址:           │
│ [           ]       │ <- 原生 HTML input
│                     │
│ [測試連線][儲存]    │ <- 簡單按鈕
└─────────────────────┘
```

### 改造後
```
┌─────────────────────────┐
│ ⚙️ 資料庫連線設定         │ <- 圖標 + 標題
├─────────────────────────┤
│ 資料庫種類 *            │
│ [MS SQL Server    ▼]   │ <- iView Select（可搜尋）
│                         │
│ 主機位址 *              │
│ [localhost        ✕]   │ <- iView Input（可清除）
│                         │
│ 端口號                  │
│ [▼ 1433 ▲]            │ <- iView InputNumber
│                         │
│ 使用者名稱 *            │
│ [admin            ✕]   │ <- iView Input
│                         │
│ 密碼                    │
│ [••••••••     👁️]     │ <- iView Input password
│                         │
│ [🔗 測試連線] [✓ 儲存]  │ <- iView Button（圖標+狀態）
└─────────────────────────┘
```

**視覺提升點**:
- ✅ 圖標支援（內建大量圖標）
- ✅ 清除按鈕
- ✅ 密碼顯示/隱藏
- ✅ 數字輸入框帶增減按鈕
- ✅ 按鈕載入狀態
- ✅ 統一的視覺風格
- ✅ 更好的互動反饋

---

## 🎨 元件對照表

| 功能 | 原生/自製 | View UI Plus | 提升 |
|-----|----------|--------------|------|
| 卡片容器 | 自製 Card.vue | Card | 更多屬性、陰影效果 |
| 輸入框 | `<input>` | Input | 清除、前後綴、圖標 |
| 數字輸入 | `<input type="number">` | InputNumber | 增減按鈕、精度控制 |
| 下拉選單 | `<select>` | Select | 搜尋、多選、遠程搜尋 |
| 按鈕 | `<button>` | Button | 圖標、載入狀態、尺寸 |
| 表單 | `<form>` | Form/FormItem | 驗證、佈局、響應式 |
| 訊息提示 | 自製 div | Message | 動畫、自動關閉、類型 |
| 描述列表 | 自製 div | Descriptions | 佈局、邊框、響應式 |
| 標籤 | 自製 span | Tag | 顏色、可關閉、動態 |
| 圖標 | emoji/字符 | Icon | 1000+ 圖標庫 |

---

## 📊 工時估算

| 階段 | 任務 | 預估工時 |
|-----|------|---------|
| Phase 1 | 安裝與配置 | 1 小時 |
| Phase 2 | Settings.vue 改造 | 3 小時 |
| Phase 3 | SystemInfo.vue 改造 | 1.5 小時 |
| Phase 4 | 其他頁面改造 | 1.5 小時 |
| Phase 5 | 樣式優化與測試 | 1-2 小時 |
| **總計** | | **8-10 小時** |

---

## ✅ 驗收標準

### 功能驗收
1. ✅ 所有頁面正常顯示，無元件錯誤
2. ✅ 表單輸入和驗證功能正常
3. ✅ 按鈕點擊和載入狀態正常
4. ✅ Message 訊息提示正常顯示
5. ✅ 所有互動功能與原版一致

### 視覺驗收
1. ✅ UI 風格統一，使用 View UI 設計規範
2. ✅ 圖標顯示正確
3. ✅ 響應式佈局正常（不同螢幕尺寸）
4. ✅ 動畫效果流暢
5. ✅ 無樣式衝突或錯位

### 程式碼品質
1. ✅ 移除所有自製 UI 元件
2. ✅ 移除多餘的 CSS 樣式
3. ✅ 程式碼結構清晰
4. ✅ 無 Console 錯誤或警告

---

## 🔄 遷移計畫

### 相容性考量
1. **功能完全對等**: 確保改造後所有功能正常
2. **漸進式替換**: 可以逐頁面替換，降低風險
3. **樣式保留**: 保留現有配色方案
4. **無破壞性變更**: 不影響現有資料和配置

### 風險控制
- 在新分支進行改造
- 每個頁面改造後立即測試
- 保留原始程式碼備份
- 記錄所有變更點

---

## 🚀 後續擴展

### Phase 2 功能
- 使用 Table 元件（資料表格顯示）
- 使用 Modal 元件（對話框）
- 使用 Drawer 元件（抽屜）
- 使用 Tooltip 元件（提示）
- 使用 Tabs 元件（標籤頁）
- 自定義主題（品牌色）
- 深色模式支援

---

## 📝 相關資源

### View UI Plus 官方
- 官網: https://www.iviewui.com/view-ui-plus
- 文檔: https://www.iviewui.com/view-ui-plus/guide/introduce
- GitHub: https://github.com/view-design/ViewUIPlus
- 元件演示: https://www.iviewui.com/view-ui-plus/component/button

### 學習資源
- Vue 3 + View UI Plus 範例
- 表單驗證最佳實踐
- 主題定制指南

---

## 💡 決策建議

### ✅ 強烈建議採用

#### 理由：
1. **成熟穩定**: iView 是國內最受歡迎的 Vue UI 庫之一
2. **中文友好**: 完整中文文檔，適合中文介面
3. **元件豐富**: 60+ 元件覆蓋大部分需求
4. **維護成本低**: 無需自己維護 UI 元件
5. **視覺提升**: 專業設計，提升應用品質
6. **開發效率**: 減少 UI 開發時間，專注業務邏輯

#### 適用情境：
- ✅ 需要專業的 UI 元件庫
- ✅ 追求統一的視覺風格
- ✅ 減少 UI 開發和維護成本
- ✅ 需要豐富的表單元件
- ✅ 中文為主的應用介面

---

## ⚠️ 注意事項

1. **套件體積**: View UI Plus 會增加約 500KB 打包體積（可接受）
2. **學習成本**: 需要熟悉 View UI Plus API（文檔完善，成本低）
3. **版本相容**: 確保使用 Vue 3 相容版本（view-ui-plus）
4. **樣式衝突**: 檢查是否與現有全局樣式衝突
5. **按需引入**: 後續可考慮按需引入減少體積

---

## 📸 效果預覽

### Settings 頁面改造效果

**改造前**:
- 原生 HTML 表單元素
- 簡單的樣式
- 基本的互動

**改造後**:
- 專業的表單佈局
- 豐富的互動效果（清除按鈕、密碼顯示、載入狀態）
- 統一的視覺風格
- 更好的用戶體驗

### 預期提升
- 📈 視覺專業度 +80%
- 📈 互動體驗 +60%
- 📉 維護成本 -50%
- 📉 UI 開發時間 -40%

---

## 變更記錄

### 2026-06-03
- 建立需求文檔
- 定義技術方案
- 評估工時和效益
