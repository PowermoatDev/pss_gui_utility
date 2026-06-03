const { contextBridge, ipcRenderer } = require('electron');

// 暴露基本資訊給 renderer process
contextBridge.exposeInMainWorld('api', {
  platform: process.platform,
  versions: process.versions
});

// 暴露設定檔 API
contextBridge.exposeInMainWorld('config', {
  load: () => ipcRenderer.invoke('config:load'),
  save: (config) => ipcRenderer.invoke('config:save', config),
  testConnection: (dbConfig) => ipcRenderer.invoke('config:testConnection', dbConfig)
});
