<template>
  <div class="settings">
    <h1>應用設定</h1>
    
    <Card title="外觀設定">
      <div class="setting-item">
        <label>主題模式</label>
        <div class="theme-toggle">
          <button 
            @click="appStore.toggleTheme()" 
            class="theme-btn"
          >
            {{ appStore.isDarkTheme ? '🌙 深色模式' : '☀️ 淺色模式' }}
          </button>
          <span class="theme-status">
            目前：{{ appStore.theme }}
          </span>
        </div>
      </div>
      
      <div class="setting-item">
        <label>語言設定</label>
        <select 
          v-model="appStore.language" 
          @change="handleLanguageChange"
          class="language-select"
        >
          <option value="zh-TW">繁體中文</option>
          <option value="zh-CN">简体中文</option>
          <option value="en">English</option>
          <option value="ja">日本語</option>
        </select>
      </div>
    </Card>
    
    <Card title="系統資訊" class="system-info">
      <div class="info-grid">
        <div class="info-row">
          <span class="info-label">平台：</span>
          <span class="info-value">{{ appStore.platformName }}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Node.js：</span>
          <span class="info-value">{{ appStore.systemInfo.node }}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Chrome：</span>
          <span class="info-value">{{ appStore.systemInfo.chrome }}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Electron：</span>
          <span class="info-value">{{ appStore.systemInfo.electron }}</span>
        </div>
      </div>
    </Card>
    
    <div class="actions">
      <button @click="$router.push('/')" class="back-btn">返回首頁</button>
    </div>
  </div>
</template>

<script setup>
import { useAppStore } from '../stores/app'
import Card from '../components/Card.vue'

const appStore = useAppStore()

function handleLanguageChange(event) {
  console.log('語言已變更為：', event.target.value)
}
</script>

<style scoped>
.settings {
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
}

h1 {
  font-size: 2rem;
  color: #2c3e50;
  margin-bottom: 2rem;
}

.setting-item {
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #eee;
}

.setting-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
  margin-bottom: 0;
}

.setting-item label {
  display: block;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 0.75rem;
}

.theme-toggle {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.theme-btn {
  padding: 0.5rem 1rem;
  background: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.3s;
}

.theme-btn:hover {
  background: #369970;
}

.theme-status {
  color: #666;
  font-size: 0.9rem;
}

.language-select {
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  background: white;
  min-width: 200px;
}

.language-select:focus {
  outline: none;
  border-color: #42b983;
}

.system-info {
  margin-top: 2rem;
}

.info-grid {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.info-row {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem;
  background: #f8f9fa;
  border-radius: 4px;
}

.info-label {
  font-weight: 600;
  color: #666;
}

.info-value {
  color: #2c3e50;
}

.actions {
  margin-top: 2rem;
  text-align: center;
}

.back-btn {
  padding: 0.75rem 2rem;
  background: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.3s;
}

.back-btn:hover {
  background: #369970;
}
</style>
