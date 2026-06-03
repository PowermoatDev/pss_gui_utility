import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useConfigStore = defineStore('config', () => {
  // 設定狀態
  const config = ref(null)
  const loading = ref(false)
  const error = ref(null)

  // 讀取設定檔
  async function loadConfig() {
    loading.value = true
    error.value = null
    
    try {
      const result = await window.config.load()
      
      if (result.success) {
        config.value = result.data
        return result.data
      } else {
        error.value = result.message
        return null
      }
    } catch (err) {
      error.value = err.message
      console.error('讀取設定失敗:', err)
      return null
    } finally {
      loading.value = false
    }
  }

  // 保存設定檔
  async function saveConfig(newConfig) {
    loading.value = true
    error.value = null
    
    try {
      const result = await window.config.save(newConfig)
      
      if (result.success) {
        config.value = newConfig
        return result
      } else {
        error.value = result.message
        return result
      }
    } catch (err) {
      error.value = err.message
      console.error('保存設定失敗:', err)
      return { success: false, message: err.message }
    } finally {
      loading.value = false
    }
  }

  // 測試資料庫連線
  async function testConnection(dbConfig) {
    loading.value = true
    error.value = null
    
    try {
      const result = await window.config.testConnection(dbConfig)
      return result
    } catch (err) {
      error.value = err.message
      console.error('測試連線失敗:', err)
      return { success: false, message: err.message }
    } finally {
      loading.value = false
    }
  }

  // 取得資料庫設定
  function getDatabaseConfig() {
    return config.value?.database || null
  }

  return {
    config,
    loading,
    error,
    loadConfig,
    saveConfig,
    testConnection,
    getDatabaseConfig
  }
})
