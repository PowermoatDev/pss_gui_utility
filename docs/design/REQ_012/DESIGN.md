# REQ-012 View UI Plus 整合設計方案

> **需求編號**: REQ-012  
> **設計日期**: 2026-06-03  
> **設計者**: AI Assistant

---

## 📐 設計目標

將現有自製和原生 HTML UI 元件全面替換為 View UI Plus 元件庫，提升應用視覺品質和用戶體驗。

---

## 🏗️ 架構設計

### 元件引入策略

採用**全局引入**方式（後續可優化為按需引入）：

```
src/
├── main.js                    # 應用入口（引入 View UI）
├── plugins/
│   └── view-ui.js            # View UI Plus 配置
├── components/
│   └── Card.vue              # [刪除] 改用 View UI Card
├── views/
│   ├── Settings.vue          # [改造] 使用 Form/Input/Select/Button
│   ├── SystemInfo.vue        # [改造] 使用 Card/Descriptions/Tag
│   ├── Home.vue              # [改造] 使用 Card
│   └── About.vue             # [改造] 使用 Card/Descriptions
└── style.css                 # [精簡] 移除自製元件樣式
```

---

## 🎨 元件映射設計

### 1. Settings.vue (資料庫設定頁面)

#### 元件映射表

| 原始元件 | View UI 元件 | 屬性配置 |
|---------|-------------|---------|
| 自製 Card | `<Card>` | `dis-hover`, `:bordered="false"` |
| `<input type="text">` | `<Input>` | `clearable`, `placeholder` |
| `<input type="number">` | `<InputNumber>` | `:min="1"`, `:max="65535"` |
| `<input type="password">` | `<Input>` | `type="password"`, `password` |
| `<select>` | `<Select>` + `<Option>` | `placeholder`, `clearable` |
| `<button>` | `<Button>` | `type="primary"`, `icon`, `:loading` |
| 自製 message div | `Message` | `Message.success()`, `Message.error()` |

#### 表單結構設計

```vue
<Card dis-hover :bordered="false">
  <template #title>
    <Icon type="ios-settings" />
    資料庫連線設定
  </template>
  
  <Form :model="dbConfig" :label-width="120" :rules="rules">
    <FormItem label="資料庫種類" prop="type">
      <Select v-model="dbConfig.type">
        <Option value="mssql">MS SQL Server</Option>
        <Option value="mysql">MySQL</Option>
      </Select>
    </FormItem>
    
    <FormItem label="主機位址" prop="host">
      <Input v-model="dbConfig.host" clearable />
    </FormItem>
    
    <FormItem label="端口號">
      <InputNumber 
        v-model="dbConfig.port" 
        :min="1" 
        :max="65535"
        style="width: 200px"
      />
    </FormItem>
    
    <FormItem label="使用者名稱" prop="username">
      <Input v-model="dbConfig.username" clearable />
    </FormItem>
    
    <FormItem label="密碼">
      <Input 
        v-model="dbConfig.password" 
        type="password"
        password
      />
    </FormItem>
    
    <FormItem label="資料庫名稱">
      <Input v-model="dbConfig.database" clearable />
    </FormItem>
    
    <FormItem>
      <Button 
        type="primary" 
        icon="md-link"
        :loading="configStore.loading"
        @click="testConnection"
      >
        測試連線
      </Button>
      <Button 
        type="success" 
        icon="md-checkmark"
        :loading="configStore.loading"
        @click="saveConfiguration"
        style="margin-left: 8px"
      >
        儲存設定
      </Button>
    </FormItem>
  </Form>
</Card>

<!-- 語言設定區塊 -->
<Card dis-hover :bordered="false" style="margin-top: 16px">
  <template #title>
    <Icon type="ios-globe" />
    語言設定
  </template>
  
  <Form :label-width="120">
    <FormItem label="介面語言">
      <Select v-model="appStore.language" style="width: 200px">
        <Option value="zh-TW">繁體中文</Option>
        <Option value="zh-CN">简体中文</Option>
        <Option value="en">English</Option>
        <Option value="ja">日本語</Option>
      </Select>
    </FormItem>
  </Form>
</Card>

<!-- 系統資訊區塊 -->
<Card dis-hover :bordered="false" style="margin-top: 16px">
  <template #title>
    <Icon type="ios-information-circle" />
    系統資訊
  </template>
  
  <Descriptions :column="2" border>
    <DescriptionsItem label="平台">
      <Tag color="primary">{{ appStore.platformName }}</Tag>
    </DescriptionsItem>
    <DescriptionsItem label="Node.js">
      <Tag color="success">{{ appStore.systemInfo.node }}</Tag>
    </DescriptionsItem>
    <DescriptionsItem label="Chrome">
      {{ appStore.systemInfo.chrome }}
    </DescriptionsItem>
    <DescriptionsItem label="Electron">
      <Tag color="warning">{{ appStore.systemInfo.electron }}</Tag>
    </DescriptionsItem>
  </Descriptions>
</Card>
```

#### 表單驗證規則

```javascript
const rules = {
  type: [
    { required: true, message: '請選擇資料庫類型', trigger: 'change' }
  ],
  host: [
    { required: true, message: '請輸入主機位址', trigger: 'blur' }
  ],
  username: [
    { required: true, message: '請輸入使用者名稱', trigger: 'blur' }
  ]
}
```

### 2. SystemInfo.vue (系統資訊頁面)

#### 元件映射

| 原始元件 | View UI 元件 | 屬性配置 |
|---------|-------------|---------|
| 自製 Card | `<Card>` | `dis-hover` |
| 自製 info-grid | `<Descriptions>` | `:column="2"`, `border` |
| 純文字 | `<Tag>` | `color` 屬性標識不同類型 |

#### 頁面結構設計

```vue
<div class="system-info-page">
  <Card dis-hover>
    <template #title>
      <Icon type="ios-desktop" size="20" />
      系統資訊
    </template>
    
    <Descriptions title="基本資訊" :column="2" border>
      <DescriptionsItem label="作業系統">
        <Tag color="primary">{{ systemInfo.platform }}</Tag>
      </DescriptionsItem>
      <DescriptionsItem label="系統架構">
        {{ systemInfo.arch }}
      </DescriptionsItem>
      <DescriptionsItem label="主機名稱">
        {{ systemInfo.hostname }}
      </DescriptionsItem>
      <DescriptionsItem label="CPU 核心數">
        <Tag color="success">{{ systemInfo.cpus }}</Tag>
      </DescriptionsItem>
    </Descriptions>
    
    <Divider />
    
    <Descriptions title="執行環境" :column="2" border>
      <DescriptionsItem label="Node.js 版本">
        <Tag color="success">v{{ systemInfo.node }}</Tag>
      </DescriptionsItem>
      <DescriptionsItem label="Chrome 版本">
        <Tag color="default">v{{ systemInfo.chrome }}</Tag>
      </DescriptionsItem>
      <DescriptionsItem label="Electron 版本">
        <Tag color="warning">v{{ systemInfo.electron }}</Tag>
      </DescriptionsItem>
      <DescriptionsItem label="應用版本">
        <Tag color="blue">v{{ appStore.version }}</Tag>
      </DescriptionsItem>
    </Descriptions>
  </Card>
  
  <Card dis-hover style="margin-top: 16px">
    <template #title>
      <Icon type="ios-stats" />
      效能資訊
    </template>
    
    <Descriptions :column="1" border>
      <DescriptionsItem label="記憶體使用">
        <Progress 
          :percent="memoryUsage" 
          :stroke-width="10"
          status="active"
        />
      </DescriptionsItem>
    </Descriptions>
  </Card>
</div>
```

### 3. Home.vue (首頁)

#### 設計結構

```vue
<div class="home-page">
  <Card dis-hover :bordered="false">
    <template #title>
      <Icon type="ios-home" size="24" />
      歡迎使用 PSS GUI Utility
    </template>
    
    <div class="welcome-content">
      <Space direction="vertical" size="large">
        <Alert show-icon type="info">
          這是一個基於 Electron + Vue 3 的桌面應用程式
        </Alert>
        
        <Divider orientation="left">快速開始</Divider>
        
        <Space>
          <Button 
            type="primary" 
            icon="ios-settings"
            @click="$router.push('/settings')"
          >
            資料庫設定
          </Button>
          <Button 
            icon="ios-information-circle"
            @click="$router.push('/system/info')"
          >
            系統資訊
          </Button>
        </Space>
      </Space>
    </div>
  </Card>
</div>
```

### 4. About.vue (關於頁面)

#### 設計結構

```vue
<div class="about-page">
  <Card dis-hover>
    <template #title>
      <Icon type="ios-information-circle" size="24" />
      關於應用
    </template>
    
    <Descriptions :column="1" border>
      <DescriptionsItem label="應用名稱">
        PSS GUI Utility
      </DescriptionsItem>
      <DescriptionsItem label="版本">
        <Tag color="primary">{{ version }}</Tag>
      </DescriptionsItem>
      <DescriptionsItem label="描述">
        基於 Electron 和 Vue 3 的桌面應用程式，提供資料庫連線管理功能
      </DescriptionsItem>
      <DescriptionsItem label="技術棧">
        <Space>
          <Tag color="success">Vue 3</Tag>
          <Tag color="blue">Electron</Tag>
          <Tag color="purple">Vite</Tag>
          <Tag color="orange">View UI Plus</Tag>
        </Space>
      </DescriptionsItem>
      <DescriptionsItem label="開發日期">
        2026-06-03
      </DescriptionsItem>
    </Descriptions>
  </Card>
</div>
```

---

## 🎨 樣式設計

### 全局樣式調整

```css
/* src/style.css - 精簡後 */

/* 全局變數（與 View UI 配合） */
:root {
  --primary-color: #2d8cf0;
  --success-color: #19be6b;
  --warning-color: #ff9900;
  --error-color: #ed4014;
}

/* 頁面容器 */
.page-container {
  padding: 20px;
  min-height: 100vh;
  background: #f5f7f9;
}

/* 卡片間距 */
.ivu-card + .ivu-card {
  margin-top: 16px;
}

/* 表單項間距調整 */
.ivu-form-item {
  margin-bottom: 20px;
}

/* 移除所有自製元件樣式 */
/* 以下樣式全部刪除：
.card { ... }
.setting-item { ... }
.db-input { ... }
.toggle-password { ... }
等等
*/
```

### View UI Plus 主題配置

```javascript
// src/plugins/view-ui.js

import ViewUIPlus from 'view-ui-plus'
import 'view-ui-plus/dist/styles/viewuiplus.css'
import zhTW from 'view-ui-plus/dist/locale/zh-TW'

export function setupViewUI(app) {
  app.use(ViewUIPlus, {
    // 語系設定
    locale: zhTW,
    
    // 全局配置
    transfer: true,  // 將元件插入到 body（避免層級問題）
    capture: false,
    
    // Select 配置
    select: {
      arrow: 'ios-arrow-down',
      arrowSize: 20
    },
    
    // Modal 配置
    modal: {
      maskClosable: false  // 點擊遮罩不關閉
    },
    
    // Message 配置
    message: {
      top: 50,
      duration: 3
    }
  })
}
```

---

## 🔄 訊息提示重構

### 原始實作（自製）

```javascript
// 舊版本
const message = ref('')
const messageType = ref('info')

function showMessage(type, msg) {
  messageType.value = type
  message.value = msg
  setTimeout(() => {
    message.value = ''
  }, 5000)
}

// 使用
showMessage('success', '✅ 設定已成功儲存')
```

### View UI Plus 實作

```javascript
// 新版本
import { Message } from 'view-ui-plus'

// 直接使用
Message.success('設定已成功儲存')
Message.error('儲存失敗：' + error.message)
Message.info('正在測試連線...')
Message.warning('請填寫必填欄位')

// 或帶配置
Message.success({
  content: '資料庫連線成功',
  duration: 3,
  closable: true
})
```

**優勢**：
- 自動管理生命週期
- 支援多個同時顯示
- 內建圖標和動畫
- 可堆疊顯示

---

## 📦 依賴安裝

### package.json 更新

```json
{
  "dependencies": {
    "vue": "^3.5.30",
    "vue-router": "^4.2.5",
    "pinia": "^2.1.7",
    "view-ui-plus": "^1.3.1",
    "electron": "^34.0.0",
    "mssql": "^10.0.1",
    "mysql2": "^3.6.5"
  }
}
```

### 安裝指令

```bash
npm install view-ui-plus --save
```

---

## 🧪 測試設計

### 視覺測試清單

#### Settings.vue
- [ ] 資料庫類型下拉選單正常切換
- [ ] 端口號隨資料庫類型顯示預設值（1433/3306）
- [ ] 輸入框清除按鈕正常運作
- [ ] 密碼顯示/隱藏切換正常
- [ ] 測試連線按鈕顯示 loading 狀態
- [ ] 儲存按鈕顯示 loading 狀態
- [ ] Message 訊息提示正確顯示

#### SystemInfo.vue
- [ ] 系統資訊 Descriptions 正確顯示
- [ ] Tag 標籤顏色正確
- [ ] 卡片標題圖標正確顯示

#### Home.vue
- [ ] 歡迎卡片正常顯示
- [ ] 快速開始按鈕導航正常
- [ ] Alert 提示正常顯示

#### About.vue
- [ ] 應用資訊 Descriptions 正確顯示
- [ ] 技術棧標籤正確顯示

### 響應式測試

- [ ] 1920x1080 (桌面) - 完整顯示
- [ ] 1366x768 (筆電) - 正常顯示
- [ ] 1024x768 (小螢幕) - 表單堆疊顯示

### 互動測試

- [ ] 表單驗證正常運作
- [ ] 按鈕 hover 效果正常
- [ ] Select 下拉動畫流暢
- [ ] Input focus 狀態正常
- [ ] Message 自動關閉正常

---

## 📋 實作檢查清單

### Phase 1: 環境準備
- [ ] 安裝 view-ui-plus 套件
- [ ] 建立 `src/plugins/view-ui.js`
- [ ] 更新 `src/main.js` 引入配置
- [ ] 測試基本 Button 元件顯示
- [ ] 確認中文語系生效

### Phase 2: Settings.vue
- [ ] 匯入 View UI 元件
- [ ] 替換資料庫設定表單
- [ ] 替換語言設定區塊
- [ ] 替換系統資訊區塊
- [ ] 更新 Message 訊息提示
- [ ] 移除舊的樣式
- [ ] 測試所有互動功能

### Phase 3: SystemInfo.vue
- [ ] 替換為 Card 元件
- [ ] 使用 Descriptions 顯示資訊
- [ ] 使用 Tag 標籤美化
- [ ] 移除舊的樣式
- [ ] 測試顯示效果

### Phase 4: Home.vue
- [ ] 替換為 Card 元件
- [ ] 使用 Alert 和 Button
- [ ] 優化佈局
- [ ] 測試路由跳轉

### Phase 5: About.vue
- [ ] 替換為 Card 元件
- [ ] 使用 Descriptions 顯示資訊
- [ ] 使用 Tag 顯示技術棧
- [ ] 測試顯示效果

### Phase 6: 清理
- [ ] 刪除 `src/components/Card.vue`
- [ ] 清理 `src/style.css` 中的舊樣式
- [ ] 移除所有自製元件相關程式碼
- [ ] 檢查無 Console 錯誤

### Phase 7: 測試與優化
- [ ] 全頁面功能測試
- [ ] 響應式測試
- [ ] 效能檢查
- [ ] 樣式微調
- [ ] 文檔更新

---

## 🎯 效能考量

### 打包體積

**改造前**:
- Vue 3: ~500KB
- 自製元件: ~10KB
- 總計: ~510KB

**改造後**:
- Vue 3: ~500KB
- View UI Plus: ~600KB (gzipped ~200KB)
- 總計: ~1.1MB (gzipped ~700KB)

**結論**: 體積增加可接受，換取的是：
- 豐富的元件庫
- 更好的用戶體驗
- 減少維護成本

### 效能優化方案（可選）

#### 按需引入（Phase 2）

```javascript
// 僅引入使用的元件
import { 
  Button, 
  Card, 
  Form, 
  FormItem, 
  Input, 
  Select, 
  Option,
  Message 
} from 'view-ui-plus'

// 手動註冊
app.component('Button', Button)
app.component('Card', Card)
// ...
```

**預期效果**: 體積減少 30-40%

---

## 🔗 參考資源

### View UI Plus 文檔
- Button: https://www.iviewui.com/view-ui-plus/component/button
- Form: https://www.iviewui.com/view-ui-plus/component/form
- Input: https://www.iviewui.com/view-ui-plus/component/input
- Select: https://www.iviewui.com/view-ui-plus/component/select
- Card: https://www.iviewui.com/view-ui-plus/component/card
- Message: https://www.iviewui.com/view-ui-plus/component/message
- Descriptions: https://www.iviewui.com/view-ui-plus/component/descriptions
- Tag: https://www.iviewui.com/view-ui-plus/component/tag
- Icon: https://www.iviewui.com/view-ui-plus/component/icon

---

## 變更記錄

### 2026-06-03
- 完成設計文檔
- 定義元件映射方案
- 設計各頁面改造方案
- 制定測試計畫
