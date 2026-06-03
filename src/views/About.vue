<template>
  <div class="about">
    <h1>關於 PSS GUI Utility</h1>
    
    <Card title="應用資訊">
      <div class="info-item">
        <span class="label">應用名稱：</span>
        <span class="value">PSS GUI Utility</span>
      </div>
      <div class="info-item">
        <span class="label">版本：</span>
        <span class="value">1.0.0</span>
      </div>
      <div class="info-item">
        <span class="label">描述：</span>
        <span class="value">基於 Electron 和 Vue 3 的桌面應用程式</span>
      </div>
    </Card>
    
    <Card title="技術架構" class="tech-stack">
      <div class="tech-list">
        <div class="tech-item">
          <strong>前端框架：</strong> Vue 3 (Composition API)
        </div>
        <div class="tech-item">
          <strong>桌面框架：</strong> Electron
        </div>
        <div class="tech-item">
          <strong>建置工具：</strong> Vite
        </div>
        <div class="tech-item">
          <strong>路由管理：</strong> Vue Router 4
        </div>
        <div class="tech-item">
          <strong>狀態管理：</strong> Pinia
        </div>
      </div>
    </Card>
    
    <div class="actions">
      <button @click="$router.push('/')" class="back-btn">返回首頁</button>
    </div>
  </div>
</template>

<script setup>
import Card from '../components/Card.vue'
</script>

<style scoped>
.about {
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
}

h1 {
  font-size: 2rem;
  color: #2c3e50;
  margin-bottom: 2rem;
}

.info-item {
  margin-bottom: 1rem;
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;
}

.info-item:last-child {
  border-bottom: none;
}

.label {
  font-weight: 600;
  color: #666;
  margin-right: 0.5rem;
}

.value {
  color: #2c3e50;
}

.tech-stack {
  margin-top: 2rem;
}

.tech-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.tech-item {
  padding: 0.75rem;
  background: #f8f9fa;
  border-radius: 4px;
}

.tech-item strong {
  color: #42b983;
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
