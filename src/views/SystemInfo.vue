<template>
  <div class="page-container">
    <h1>ℹ️ 系統資訊</h1>
    
    <div class="info-grid">
      <Card title="作業系統">
        <div class="info-item">
          <span class="info-icon">💻</span>
          <div class="info-content">
            <div class="info-value">{{ appStore.platformName }}</div>
            <div class="info-label">平台類型</div>
          </div>
        </div>
      </Card>
      
      <Card title="Node.js">
        <div class="info-item">
          <span class="info-icon">🟢</span>
          <div class="info-content">
            <div class="info-value">{{ systemInfo.node }}</div>
            <div class="info-label">版本號</div>
          </div>
        </div>
      </Card>
      
      <Card title="Chrome">
        <div class="info-item">
          <span class="info-icon">🌐</span>
          <div class="info-content">
            <div class="info-value">{{ systemInfo.chrome }}</div>
            <div class="info-label">瀏覽器引擎</div>
          </div>
        </div>
      </Card>
      
      <Card title="Electron">
        <div class="info-item">
          <span class="info-icon">⚡</span>
          <div class="info-content">
            <div class="info-value">{{ systemInfo.electron }}</div>
            <div class="info-label">框架版本</div>
          </div>
        </div>
      </Card>
    </div>
    
    <Card title="系統詳細資訊" class="detail-card">
      <div class="detail-list">
        <div class="detail-row">
          <span class="detail-label">應用名稱：</span>
          <span class="detail-value">PSS GUI Utility</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">應用版本：</span>
          <span class="detail-value">1.0.0</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">架構：</span>
          <span class="detail-value">{{ systemInfo.platform }}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">啟動時間：</span>
          <span class="detail-value">{{ new Date().toLocaleString('zh-TW') }}</span>
        </div>
      </div>
    </Card>
  </div>
</template>

<script setup>
import { useAppStore } from '../stores/app'
import { useSystemInfo } from '../composables/useSystemInfo'
import Card from '../components/Card.vue'

const appStore = useAppStore()
const { systemInfo, loadSystemInfo } = useSystemInfo()

// 載入系統資訊
loadSystemInfo()
</script>

<style scoped>
.page-container {
  padding: 2rem;
}

h1 {
  font-size: 2rem;
  color: #2c3e50;
  margin-bottom: 1.5rem;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 0;
}

.info-icon {
  font-size: 2.5rem;
}

.info-content {
  flex: 1;
}

.info-value {
  font-size: 1.5rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 0.25rem;
}

.info-label {
  font-size: 0.85rem;
  color: #666;
}

.detail-card {
  margin-top: 2rem;
}

.detail-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.detail-row {
  display: flex;
  padding: 0.75rem;
  background: #f8f9fa;
  border-radius: 4px;
}

.detail-label {
  font-weight: 600;
  color: #666;
  min-width: 120px;
}

.detail-value {
  color: #2c3e50;
  flex: 1;
}
</style>
