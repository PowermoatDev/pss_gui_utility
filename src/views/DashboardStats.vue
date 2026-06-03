<template>
  <div class="page-container">
    <h1>📈 統計圖表</h1>
    
    <div class="stats-grid">
      <Card title="今日訪問">
        <div class="stat-value">1,234</div>
        <div class="stat-label">次</div>
      </Card>
      
      <Card title="活躍用戶">
        <div class="stat-value">856</div>
        <div class="stat-label">人</div>
      </Card>
      
      <Card title="系統負載">
        <div class="stat-value">45%</div>
        <div class="stat-label">CPU 使用率</div>
      </Card>
      
      <Card title="記憶體使用">
        <div class="stat-value">2.8 GB</div>
        <div class="stat-label">/ 8 GB</div>
      </Card>
    </div>
    
    <Card title="圖表區域" class="chart-area">
      <div class="chart-placeholder">
        <p>📊 圖表組件區域</p>
        <p class="chart-hint">可在此處整合圖表庫（如 Chart.js、ECharts 等）</p>
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
}

h1 {
  font-size: 2rem;
  color: #2c3e50;
  margin-bottom: 1.5rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-value {
  font-size: 2.5rem;
  font-weight: bold;
  color: #42b883;
  margin: 1rem 0 0.5rem 0;
}

.stat-label {
  color: #666;
  font-size: 0.9rem;
}

.chart-area {
  margin-top: 2rem;
}

.chart-placeholder {
  min-height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #f8f9fa;
  border-radius: 8px;
  border: 2px dashed #ddd;
}

.chart-placeholder p {
  font-size: 1.2rem;
  color: #666;
  margin: 0.5rem 0;
}

.chart-hint {
  font-size: 0.9rem !important;
  color: #999 !important;
}
</style>
