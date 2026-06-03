const { app } = require('electron')
const fs = require('fs')
const path = require('path')

// 取得設定檔路徑
function getConfigPath() {
  const userDataPath = app.getPath('userData')
  const configDir = path.join(userDataPath, 'config')
  
  // 確保目錄存在
  if (!fs.existsSync(configDir)) {
    fs.mkdirSync(configDir, { recursive: true, mode: 0o700 })
  }
  
  return path.join(configDir, 'app-config.json')
}

// 取得預設設定
function getDefaultConfig() {
  return {
    version: '1.0.0',
    database: {
      type: 'mssql',
      host: 'localhost',
      port: 1433,
      username: '',
      password: '',
      database: ''
    },
    application: {
      language: 'zh-TW',
      theme: 'light'
    },
    metadata: {
      createdAt: new Date().toISOString(),
      lastModified: new Date().toISOString()
    }
  }
}

// 讀取設定檔
async function loadConfig() {
  try {
    const configPath = getConfigPath()
    
    // 設定檔不存在時，創建預設設定
    if (!fs.existsSync(configPath)) {
      const defaultConfig = getDefaultConfig()
      await saveConfig(defaultConfig)
      return defaultConfig
    }
    
    // 讀取設定檔
    const configData = fs.readFileSync(configPath, 'utf8')
    const config = JSON.parse(configData)
    
    return config
  } catch (error) {
    console.error('讀取設定檔失敗:', error)
    return getDefaultConfig()
  }
}

// 保存設定檔
async function saveConfig(config) {
  try {
    const configPath = getConfigPath()
    
    // 更新修改時間
    config.metadata = config.metadata || {}
    config.metadata.lastModified = new Date().toISOString()
    
    // 寫入設定檔
    fs.writeFileSync(
      configPath, 
      JSON.stringify(config, null, 2), 
      { encoding: 'utf8', mode: 0o600 }
    )
    
    return { success: true, message: '設定已儲存' }
  } catch (error) {
    console.error('保存設定檔失敗:', error)
    return { success: false, message: error.message }
  }
}

module.exports = {
  getConfigPath,
  getDefaultConfig,
  loadConfig,
  saveConfig
}
