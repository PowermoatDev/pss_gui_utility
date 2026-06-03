<template>
  <div class="home">
    <h1>歡迎使用 PSS GUI Utility</h1>
    
    <div class="info-section">
      <h2>系統資訊</h2>
      <div class="info-cards">
        <Card title="作業系統">
          <p>{{ appStore.platformName }}</p>
        </Card>
        
        <Card title="Node.js">
          <p>{{ systemInfo.node }}</p>
        </Card>
        
        <Card title="Chrome">
          <p>{{ systemInfo.chrome }}</p>
        </Card>
        
        <Card title="Electron">
          <p>{{ systemInfo.electron }}</p>
        </Card>
      </div>
    </div>
    
    <div class="quick-actions">
      <h2>快速操作</h2>
      <div class="actions">
        <button @click="$router.push('/about')" class="action-btn">關於應用</button>
        <button @click="$router.push('/settings')" class="action-btn">應用設定</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAppStore } from '../stores/app'
import { useSystemInfo } from '../composables/useSystemInfo'
import Card from '../components/Card.vue'

const appStore = useAppStore()
const { systemInfo, loadSystemInfo } = useSystemInfo()

// 載入系統資訊
loadSystemInfo()
</script>

<style scoped>
.home {
  padding: 2rem;
}

h1 {
  font-size: 2rem;
  color: #2c3e50;
  margin-bottom: 2rem;
}

h2 {
  font-size: 1.5rem;
  color: #42b983;
  margin-bottom: 1rem;
}

.info-section {
  margin-bottom: 3rem;
}

.info-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.quick-actions {
  margin-top: 2rem;
}

.actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.action-btn {
  padding: 0.75rem 1.5rem;
  background: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.3s;
}

.action-btn:hover {
  background: #369970;
}
</style>
