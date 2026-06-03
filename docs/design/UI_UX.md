# UI/UX 設計文檔

> 版本：v1.0.0  
> 最後更新：2026-06-03

---

## 🎨 設計理念

### 核心原則

1. **簡潔優先**：介面簡潔清晰，不過度設計
2. **效率至上**：操作流程直觀，減少步驟
3. **一致性**：保持視覺和互動的一致性
4. **響應式**：適應不同視窗大小

---

## 🖼️ 視覺設計

### 色彩系統

#### 主色調

```css
/* 品牌色 */
--primary-color: #2c3e50;      /* 深藍灰 */
--secondary-color: #42b983;     /* 綠色 */
--accent-color: #35495e;        /* 灰藍 */

/* 語義色 */
--success-color: #42b983;       /* 成功 */
--warning-color: #f39c12;       /* 警告 */
--error-color: #e74c3c;         /* 錯誤 */
--info-color: #3498db;          /* 資訊 */
```

#### 中性色

```css
/* 背景 */
--bg-primary: #ffffff;
--bg-secondary: #f8f9fa;
--bg-tertiary: #e9ecef;

/* 文字 */
--text-primary: #213547;
--text-secondary: #535bf2;
--text-muted: #888;

/* 邊框 */
--border-color: #ccc;
```

### 字體系統

```css
/* 字體家族 */
--font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 
               Roboto, Oxygen, Ubuntu, Cantarell, 
               'Helvetica Neue', sans-serif;

--font-family-mono: 'Courier New', Courier, monospace;

/* 字體大小 */
--font-size-xs: 12px;
--font-size-sm: 14px;
--font-size-base: 16px;
--font-size-lg: 18px;
--font-size-xl: 24px;
--font-size-2xl: 32px;

/* 行高 */
--line-height-tight: 1.25;
--line-height-normal: 1.5;
--line-height-relaxed: 1.75;
```

### 間距系統

```css
/* 8px 基準間距系統 */
--space-xs: 4px;
--space-sm: 8px;
--space-md: 16px;
--space-lg: 24px;
--space-xl: 32px;
--space-2xl: 48px;
```

### 圓角系統

```css
--radius-sm: 4px;
--radius-md: 8px;
--radius-lg: 12px;
--radius-full: 9999px;
```

### 陰影系統

```css
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
--shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
--shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.15);
```

---

## 📐 佈局設計

### 應用視窗

```
┌─────────────────────────────────────┐
│           Header (固定高度)          │  80px
├─────────────────────────────────────┤
│                                     │
│                                     │
│         Main Content (彈性)         │  calc(100vh - 80px)
│                                     │
│                                     │
└─────────────────────────────────────┘

視窗尺寸：
- 預設：1200 x 800
- 最小：800 x 600
```

### 網格系統

```css
/* Container */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

/* 卡片佈局 */
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}
```

---

## 🧩 組件設計

### 卡片組件 (Card)

```vue
<div class="card">
  <h2>標題</h2>
  <p>內容</p>
</div>
```

**樣式規範**
- 背景：白色
- 邊框：1px solid #ccc
- 圓角：8px
- 陰影：0 2px 8px rgba(0,0,0,0.1)
- 內距：24px
- 間距：16px

### 按鈕組件 (Button)

**主要按鈕**
```css
.btn {
  background: #42b983;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: 0.3s;
}

.btn:hover {
  background: #33a375;
  transform: translateY(-2px);
}
```

**次要按鈕**
```css
.btn-secondary {
  background: transparent;
  color: #42b983;
  border: 1px solid #42b983;
}
```

### 輸入框組件 (Input)

```css
input[type="text"] {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s;
}

input[type="text"]:focus {
  outline: none;
  border-color: #42b983;
}
```

### 狀態指示器

```css
.status {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 14px;
}

.status.connected {
  background: #d4edda;
  color: #155724;
}

.status.disconnected {
  background: #f8d7da;
  color: #721c24;
}
```

---

## 🎯 互動設計

### 動畫規範

```css
/* 標準過渡 */
transition: all 0.3s ease;

/* 快速回饋 */
transition: all 0.15s ease;

/* 延遲效果 */
transition: all 0.5s ease;
```

### 懸停效果

- 按鈕：輕微上移 + 陰影加深
- 卡片：邊框顏色變化
- 連結：顏色變化 + 底線

### 點擊回饋

- 按鈕：縮小 0.98 倍
- 卡片：微小陰影變化

---

## 📱 響應式設計

### 斷點

```css
/* 小型視窗 */
@media (max-width: 768px) {
  .container {
    padding: 0 16px;
  }
  
  .card-grid {
    grid-template-columns: 1fr;
  }
}

/* 中型視窗 */
@media (min-width: 769px) and (max-width: 1024px) {
  .card-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* 大型視窗 */
@media (min-width: 1025px) {
  .card-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

---

## 🎨 當前介面

### Header 區域

```
┌─────────────────────────────────────┐
│  🚀 PSS GUI Utility                 │
│  Vue 3 + Electron 應用程式          │
└─────────────────────────────────────┘
```

**設計規範**
- 背景：深色漸層
- 文字：白色
- 高度：80px
- 對齊：居中

### 內容區域

**卡片式佈局**
```
┌──────────┐ ┌──────────┐ ┌──────────┐
│  卡片 1  │ │  卡片 2  │ │  卡片 3  │
│          │ │          │ │          │
└──────────┘ └──────────┘ └──────────┘
```

---

## 🌈 主題系統（未來）

### 淺色主題

```css
:root {
  --theme-bg: #ffffff;
  --theme-text: #213547;
  --theme-border: #ccc;
}
```

### 深色主題

```css
:root[data-theme="dark"] {
  --theme-bg: #1a1a1a;
  --theme-text: #ffffff;
  --theme-border: #333;
}
```

---

## ♿ 無障礙設計

### 鍵盤導航

- Tab 鍵：順序導航
- Enter：確認操作
- Esc：取消/關閉

### 對比度

- 文字與背景對比度 ≥ 4.5:1
- 大文字對比度 ≥ 3:1

### ARIA 標籤

```html
<button aria-label="關閉">×</button>
<input aria-describedby="error-message">
```

---

## 📊 設計檢查清單

### 視覺一致性
- [ ] 色彩使用統一
- [ ] 字體大小一致
- [ ] 間距規範統一
- [ ] 圓角使用一致

### 互動體驗
- [ ] 懸停效果明確
- [ ] 點擊回饋清晰
- [ ] 載入狀態顯示
- [ ] 錯誤提示友善

### 響應式
- [ ] 小螢幕適配
- [ ] 中螢幕適配
- [ ] 大螢幕適配

### 無障礙
- [ ] 鍵盤可操作
- [ ] 螢幕閱讀器友善
- [ ] 對比度符合標準

---

## 🔄 版本歷史

### v1.0.0 (2026-06-03)
- 初始 UI/UX 設計規範
- 定義色彩系統
- 定義組件規範
- 建立響應式斷點

---

## 🎯 未來改進

### 短期
- [ ] 完善組件庫
- [ ] 建立設計系統文件
- [ ] 加入圖標系統

### 中期
- [ ] 深色模式實作
- [ ] 動畫效果增強
- [ ] 自訂主題功能

### 長期
- [ ] 完整設計語言
- [ ] 多平台適配
- [ ] 使用者偏好設定

---

## 📖 相關資源

- [Material Design](https://material.io/design)
- [Ant Design](https://ant.design/)
- [Element Plus](https://element-plus.org/)
