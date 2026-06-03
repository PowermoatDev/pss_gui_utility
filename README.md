# PSS GUI Utility

一個使用 Vue 3 + Electron + Go 構建的桌面應用程式。

## 技術棧

- **前端**: Vue 3 + Vite
- **桌面框架**: Electron
- **後端**: Go 1.26
- **構建工具**: Vite + Electron Builder

## 專案結構

```
pss_gui_utility/
├── backend/           # Go 後端服務
│   ├── main.go       # Go 主程式
│   └── go.mod        # Go 模組配置
├── electron/          # Electron 主進程
│   ├── main.js       # Electron 主程式
│   └── preload.js    # 預載腳本
├── src/              # Vue 3 前端源碼
│   ├── App.vue       # 主組件
│   ├── main.js       # 入口文件
│   └── style.css     # 全局樣式
├── index.html        # HTML 模板
├── vite.config.js    # Vite 配置
└── package.json      # 專案配置
```

## 開發

### 前置需求

1. Node.js (已安裝 v18.17.1)
2. Go 1.26 (通過 GVM 安裝)
3. npm 或 yarn

### 首次設置

1. 編譯 Go 後端:
```bash
npm run build:go
```

2. 啟動開發模式:
```bash
npm run dev
```

這會同時啟動:
- Vite 開發服務器 (http://localhost:5173)
- Electron 應用
- Go 後端服務 (http://localhost:8080)

### 可用命令

- `npm run dev` - 啟動開發模式
- `npm run build` - 構建前端
- `npm run build:go` - 編譯 Go 後端
- `npm run start` - 構建並啟動生產版本
- `npm run dist` - 打包應用程式

## 功能

- ✅ Vue 3 Composition API
- ✅ Vite 快速開發
- ✅ Electron 桌面應用
- ✅ Go 後端服務
- ✅ 前後端通信
- ✅ 熱重載開發模式

## API 端點

- `GET /health` - 健康檢查
- `POST /api/greet` - 問候 API

## 許可證

ISC
加入一個資料夾來管理需求 , 設計說明, 實作用SPRINT 管理 ,不要問什麼就直接實做並在說明文件註明未來AI尊照這個規則