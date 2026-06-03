const { contextBridge, ipcRenderer } = require('electron');

// 暴露 API 給 renderer process (使用 IPC 通訊)
contextBridge.exposeInMainWorld('api', {
  // 通用的後端調用方法
  callBackend: async (endpoint, method, data) => {
    return await ipcRenderer.invoke('go-backend-call', { endpoint, method, data });
  },
  
  // 健康檢查
  healthCheck: async () => {
    return await ipcRenderer.invoke('health-check');
  },
  
  // 問候 API
  greet: async (name) => {
    return await ipcRenderer.invoke('greet', name);
  }
});
