<template>
  <div class="home">
    <h1>🏠 總覽</h1>
    
    <div class="welcome-section">
      <Card>
        <h2>歡迎使用 PSS GUI Utility</h2>
        <p class="welcome-text">
          這是一個基於 Vue 3 和 Electron 的桌面應用程式。
          透過左側選單可以快速訪問各項功能。
        </p>
      </Card>
    </div>
    
    <div class="quick-access">
      <h2>快速訪問</h2>
      <div class="quick-cards">
        <Card 
          class="quick-card" 
          @click="$router.push('/dashboard/stats')"
        >
          <div class="quick-icon">📈</div>
          <div class="quick-title">統計圖表</div>
          <div class="quick-desc">查看系統統計資訊</div>
        </Card>
        
        <Card 
          class="quick-card" 
          @click="$router.push('/system/info')"
        >
          <div class="quick-icon">ℹ️</div>
          <div class="quick-title">系統資訊</div>
          <div class="quick-desc">查看系統詳細資訊</div>
        </Card>
        
        <Card 
          class="quick-card" 
          @click="$router.push('/settings')"
        >
          <div class="quick-icon">⚙️</div>
          <div class="quick-title">系統設定</div>
          <div class="quick-desc">調整應用程式設定</div>
        </Card>
        
        <Card 
          class="quick-card" 
          @click="$router.push('/about')"
        >
          <div class="quick-icon">📖</div>
          <div class="quick-title">關於應用</div>
          <div class="quick-desc">了解更多應用資訊</div>
        </Card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import Card from '../components/Card.vue'

const router = useRouter()
</script>

<style scoped>
.home {
  padding: 2rem;
}

h1 {
  font-size: 2rem;
  color: #2c3e50;
  margin-bottom: 1.5rem;
}

h2 {
  font-size: 1.5rem;
  color: #2c3e50;
  margin-bottom: 1rem;
}

.welcome-section {
  margin-bottom: 3rem;
}

.welcome-text {
  font-size: 1.1rem;
  color: #666;
  line-height: 1.6;
  margin: 1rem 0 0 0;
}

.quick-access {
  margin-top: 2rem;
}

.quick-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.quick-card {
  cursor: pointer;
  text-align: center;
  transition: transform 0.2s, box-shadow 0.2s;
}

.quick-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

.quick-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.quick-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 0.5rem;
}

.quick-desc {
  font-size: 0.9rem;
  color: #666;
}
</style>
