const { contextBridge } = require('electron');

// 暴露基本資訊給 renderer process
contextBridge.exposeInMainWorld('api', {
  platform: process.platform,
  versions: process.versions
});
