const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { spawn } = require('child_process');

let mainWindow;
let goProcess;
const isDev = process.env.NODE_ENV === 'development';

// 啟動 Go 後端服務器
function startGoBackend() {
  // 處理 asar 打包後的路徑
  let backendDir;
  if (app.isPackaged) {
    backendDir = path.join(process.resourcesPath, 'app.asar.unpacked', 'backend');
  } else {
    backendDir = path.join(__dirname, '..', 'backend');
  }
  
  const goBackendPath = path.join(backendDir, 'server');
  const goBinaryPath = process.platform === 'win32' ? `${goBackendPath}.exe` : goBackendPath;
  
  console.log('Starting Go backend:', goBinaryPath);
  goProcess = spawn(goBinaryPath);
  
  goProcess.stdout.on('data', (data) => {
    console.log(`[Go Backend] ${data}`);
  });
  
  goProcess.stderr.on('data', (data) => {
    console.error(`[Go Backend Error] ${data}`);
  });
  
  goProcess.on('close', (code) => {
    console.log(`Go backend exited with code ${code}`);
  });
}

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
  startGoBackend();
  
  // 延遲啟動視窗，等待 Go 後端啟動
  setTimeout(() => {
    createWindow();
  }, 1000);

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// 關閉所有視窗時退出應用程式 (macOS 除外)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    if (goProcess) {
      goProcess.kill();
    }
    app.quit();
  }
});

// 應用程式退出時清理
app.on('quit', () => {
  if (goProcess) {
    goProcess.kill();
  }
});

// IPC 處理器 - 調用 Go 後端
ipcMain.handle('go-backend-call', async (event, { endpoint, method, data }) => {
  return new Promise((resolve, reject) => {
    // 直接調用 Go 子進程的標準輸入/輸出
    const requestData = JSON.stringify({ endpoint, method, data });
    
    // 由於我們使用 HTTP server，這裡保留 HTTP 調用但通過 IPC 包裝
    const http = require('http');
    const options = {
      hostname: 'localhost',
      port: 8080,
      path: endpoint,
      method: method || 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    };
    
    const req = http.request(options, (res) => {
      let responseData = '';
      
      res.on('data', (chunk) => {
        responseData += chunk;
      });
      
      res.on('end', () => {
        try {
          resolve(JSON.parse(responseData));
        } catch (e) {
          resolve(responseData);
        }
      });
    });
    
    req.on('error', (error) => {
      reject(error);
    });
    
    if (method === 'POST' && data) {
      req.write(JSON.stringify(data));
    }
    
    req.end();
  });
});

// IPC 處理器 - 健康檢查
ipcMain.handle('health-check', async () => {
  try {
    const result = await new Promise((resolve, reject) => {
      const http = require('http');
      const options = {
        hostname: 'localhost',
        port: 8080,
        path: '/health',
        method: 'GET'
      };
      
      const req = http.request(options, (res) => {
        let data = '';
        res.on('data', (chunk) => { data += chunk; });
        res.on('end', () => {
          try {
            resolve(JSON.parse(data));
          } catch (e) {
            resolve({ status: 'ok' });
          }
        });
      });
      
      req.on('error', reject);
      req.end();
    });
    
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error: error.message };
  }
});

// IPC 處理器 - 問候 API
ipcMain.handle('greet', async (event, name) => {
  try {
    const result = await new Promise((resolve, reject) => {
      const http = require('http');
      const postData = JSON.stringify({ name });
      
      const options = {
        hostname: 'localhost',
        port: 8080,
        path: '/api/greet',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(postData)
        }
      };
      
      const req = http.request(options, (res) => {
        let data = '';
        res.on('data', (chunk) => { data += chunk; });
        res.on('end', () => {
          try {
            resolve(JSON.parse(data));
          } catch (e) {
            resolve(data);
          }
        });
      });
      
      req.on('error', reject);
      req.write(postData);
      req.end();
    });
    
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error: error.message };
  }
});
