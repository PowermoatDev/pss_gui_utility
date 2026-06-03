import { ref, onMounted } from 'vue'
import { useAppStore } from '../stores/app'

export function useSystemInfo() {
  const appStore = useAppStore()
  const systemInfo = ref({
    platform: '',
    node: '',
    chrome: '',
    electron: ''
  })
  const loading = ref(false)
  const error = ref(null)
  
  async function loadSystemInfo() {
    loading.value = true
    error.value = null
    
    try {
      if (window.api && window.api.versions) {
        const versions = window.api.versions
        const platform = window.api.platform || 'unknown'
        
        const info = {
          platform: platform,
          node: versions.node || 'N/A',
          chrome: versions.chrome || 'N/A',
          electron: versions.electron || 'N/A'
        }
        
        systemInfo.value = info
        appStore.setSystemInfo(info)
      } else {
        throw new Error('API 不可用')
      }
    } catch (e) {
      error.value = e.message
      console.error('載入系統資訊失敗：', e)
    } finally {
      loading.value = false
    }
  }
  
  onMounted(() => {
    loadSystemInfo()
  })
  
  return {
    systemInfo,
    loading,
    error,
    loadSystemInfo
  }
}
