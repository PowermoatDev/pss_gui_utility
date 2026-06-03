const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { loadConfig, saveConfig } = require('./utils/configManager');
const { testDatabaseConnection } = require('./utils/dbConnector');

let mainWindow;
const isDev = process.env.NODE_ENV === 'development';

// 創建主視窗
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    }
  });

  // 設置 Content Security Policy
  mainWindow.webContents.session.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        'Content-Security-Policy': [
          isDev
            ? "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; connect-src 'self' ws://localhost:5173"
            : "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline';"
        ]
      }
    });
  });

  // 開發模式載入 Vite 開發服務器，生產模式載入打包後的檔案
  if (isDev) {
    mainWindow.loadURL('http://localhost:5173');
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// 當 Electron 初始化完成
app.whenReady().then(() => {
  // 開發模式下延遲啟動，等待 Vite 服務器就緒
  if (isDev) {
    setTimeout(() => {
      createWindow();
    }, 1000);
  } else {
    createWindow();
  }

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// 關閉所有視窗時退出應用程式 (macOS 除外)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// ==================== IPC 處理器 ====================

// 讀取設定檔
ipcMain.handle('config:load', async () => {
  try {
    const config = await loadConfig();
    return { success: true, data: config };
  } catch (error) {
    return { success: false, message: error.message };
  }
});

// 保存設定檔
ipcMain.handle('config:save', async (event, config) => {
  try {
    const result = await saveConfig(config);
    return result;
  } catch (error) {
    return { success: false, message: error.message };
  }
});

// 測試資料庫連線
ipcMain.handle('config:testConnection', async (event, dbConfig) => {
  try {
    const result = await testDatabaseConnection(dbConfig);
    return result;
  } catch (error) {
    return { success: false, message: '連線測試失敗', error: error.message };
  }
});
