<template>
  <div class="page-container">
    <h1>📝 版本歷史</h1>
    
    <div class="version-timeline">
      <Card class="version-card">
        <div class="version-header">
          <span class="version-number">v1.0.0</span>
          <span class="version-date">2026-06-03</span>
          <span class="version-badge current">當前版本</span>
        </div>
        <div class="version-content">
          <h3>🎉 首次發布</h3>
          <ul class="feature-list">
            <li>✅ Vue 3 + Electron 桌面應用框架</li>
            <li>✅ Vue Router 4 路由系統</li>
            <li>✅ Pinia 狀態管理</li>
            <li>✅ 左右分欄布局設計</li>
            <li>✅ 二級菜單導航系統</li>
            <li>✅ 響應式組件架構</li>
            <li>✅ 系統資訊顯示</li>
          </ul>
        </div>
      </Card>
      
      <Card class="version-card">
        <div class="version-header">
          <span class="version-number">v0.2.0</span>
          <span class="version-date">2026-06-02</span>
          <span class="version-badge">Beta</span>
        </div>
        <div class="version-content">
          <h3>🚀 Beta 測試版</h3>
          <ul class="feature-list">
            <li>✅ 基礎 Vue 3 應用結構</li>
            <li>✅ Electron 整合</li>
            <li>✅ 開發環境配置</li>
          </ul>
        </div>
      </Card>
      
      <Card class="version-card">
        <div class="version-header">
          <span class="version-number">v0.1.0</span>
          <span class="version-date">2026-06-01</span>
          <span class="version-badge">Alpha</span>
        </div>
        <div class="version-content">
          <h3>🌱 初始版本</h3>
          <ul class="feature-list">
            <li>✅ 專案初始化</li>
            <li>✅ 基礎架構搭建</li>
          </ul>
        </div>
      </Card>
    </div>
    
    <Card title="更新計劃" class="roadmap-card">
      <div class="roadmap-content">
        <h3>🗓️ 未來規劃</h3>
        <ul class="roadmap-list">
          <li>
            <strong>v1.1.0</strong> - 新增主題切換功能
          </li>
          <li>
            <strong>v1.2.0</strong> - 國際化支援（i18n）
          </li>
          <li>
            <strong>v2.0.0</strong> - 插件系統架構
          </li>
        </ul>
      </div>
    </Card>
  </div>
</template>

<script setup>
import Card from '../components/Card.vue'
</script>

<style scoped>
.page-container {
  padding: 2rem;
  max-width: 900px;
}

h1 {
  font-size: 2rem;
  color: #2c3e50;
  margin-bottom: 1.5rem;
}

.version-timeline {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.version-card {
  transition: transform 0.2s;
}

.version-card:hover {
  transform: translateX(5px);
}

.version-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #f0f0f0;
}

.version-number {
  font-size: 1.5rem;
  font-weight: bold;
  color: #42b883;
}

.version-date {
  color: #666;
  font-size: 0.9rem;
}

.version-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  background: #e9ecef;
  color: #666;
}

.version-badge.current {
  background: #42b883;
  color: white;
}

.version-content h3 {
  color: #2c3e50;
  margin-bottom: 1rem;
  font-size: 1.2rem;
}

.feature-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.feature-list li {
  padding: 0.5rem 0;
  color: #555;
  font-size: 0.95rem;
}

.roadmap-card {
  margin-top: 2rem;
}

.roadmap-content h3 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

.roadmap-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.roadmap-list li {
  padding: 0.75rem;
  margin: 0.5rem 0;
  background: #f8f9fa;
  border-radius: 4px;
  border-left: 4px solid #42b883;
}

.roadmap-list strong {
  color: #42b883;
  margin-right: 0.5rem;
}
</style>
