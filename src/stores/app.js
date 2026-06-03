import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAppStore = defineStore('app', () => {
  // State
  const systemInfo = ref({
    platform: '',
    node: '',
    chrome: '',
    electron: ''
  })
  
  const theme = ref('light')
  const language = ref('zh-TW')
  
  // Getters
  const isDarkTheme = computed(() => theme.value === 'dark')
  const platformName = computed(() => {
    const platforms = {
      'darwin': 'macOS',
      'win32': 'Windows',
      'linux': 'Linux'
    }
    return platforms[systemInfo.value.platform] || systemInfo.value.platform
  })
  
  // Actions
  function setSystemInfo(info) {
    systemInfo.value = info
  }
  
  function toggleTheme() {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
  }
  
  function setLanguage(lang) {
    language.value = lang
  }
  
  return {
    // State
    systemInfo,
    theme,
    language,
    // Getters
    isDarkTheme,
    platformName,
    // Actions
    setSystemInfo,
    toggleTheme,
    setLanguage
  }
})
