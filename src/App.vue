<template>
  <div id="app">
    <header>
      <h1>🚀 PSS GUI Utility</h1>
      <p>Vue 3 + Electron + Go 應用程式</p>
    </header>
    
    <div class="container">
      <div class="card">
        <h2>後端連線狀態</h2>
        <span :class="['status', statusClass]">{{ statusText }}</span>
        <button @click="checkBackend" class="btn">檢查連線</button>
      </div>
      
      <div class="card">
        <h2>測試 API</h2>
        <input 
          v-model="name" 
          type="text" 
          placeholder="輸入您的名字"
          @keyup.enter="sendMessage"
        />
        <button @click="sendMessage" class="btn">發送訊息到 Go 後端</button>
        <div v-if="response" class="response">{{ response }}</div>
      </div>

      <div class="card">
        <h2>技術棧</h2>
        <ul class="tech-stack">
          <li>⚡ Vue 3 - 前端框架</li>
          <li>📦 Vite - 構建工具</li>
          <li>🖥️ Electron - 桌面應用</li>
          <li>🚀 Go 1.26 - 後端服務</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const name = ref('');
const response = ref('');
const statusText = ref('未連線');
const statusClass = ref('disconnected');

// 檢查後端連線狀態
const checkBackend = async () => {
  try {
    const result = await window.api.healthCheck();
    if (result.success) {
      statusText.value = '已連線';
      statusClass.value = 'connected';
      console.log('Backend is healthy:', result.data);
    } else {
      statusText.value = '未連線';
      statusClass.value = 'disconnected';
      console.error('Backend connection failed:', result.error);
    }
  } catch (error) {
    statusText.value = '未連線';
    statusClass.value = 'disconnected';
    console.error('Backend connection failed:', error);
  }
};

// 發送訊息到 Go 後端
const sendMessage = async () => {
  if (!name.value) {
    response.value = '請輸入名字';
    return;
  }
  
  try {
    const result = await window.api.greet(name.value);
    if (result.success) {
      response.value = JSON.stringify(result.data, null, 2);
    } else {
      response.value = `錯誤: ${result.error}`;
    }
  } catch (error) {
    response.value = `錯誤: ${error.message}`;
  }
};

// 頁面載入時檢查後端
onMounted(() => {
  // 延遲檢查，等待 Go 後端啟動
  setTimeout(() => {
    checkBackend();
  }, 2000);
});
</script>

<style scoped>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

header {
  background: rgba(255, 255, 255, 0.95);
  padding: 20px 30px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

h1 {
  color: #42b883;
  font-size: 28px;
  margin: 0;
}

header p {
  margin: 5px 0 0 0;
  color: #666;
}

.container {
  flex: 1;
  padding: 30px;
  overflow-y: auto;
}

.card {
  background: white;
  border-radius: 12px;
  padding: 30px;
  margin-bottom: 20px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
}

.card h2 {
  color: #42b883;
  margin-bottom: 20px;
  font-size: 22px;
}

.btn {
  background: linear-gradient(135deg, #42b883 0%, #35495e 100%);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  transition: transform 0.2s, box-shadow 0.2s;
  margin-left: 15px;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(66, 184, 131, 0.4);
}

.btn:active {
  transform: translateY(0);
}

input {
  width: calc(100% - 30px);
  padding: 10px;
  margin: 10px 0;
  border: 2px solid #e0e0e0;
  border-radius: 6px;
  font-size: 14px;
  transition: border-color 0.3s;
}

input:focus {
  outline: none;
  border-color: #42b883;
}

.response {
  margin-top: 20px;
  padding: 15px;
  background: #f5f5f5;
  border-radius: 6px;
  border-left: 4px solid #42b883;
  font-family: 'Courier New', monospace;
  white-space: pre-wrap;
  max-height: 200px;
  overflow-y: auto;
}

.status {
  display: inline-block;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
}

.status.connected {
  background: #4caf50;
  color: white;
}

.status.disconnected {
  background: #f44336;
  color: white;
}

.tech-stack {
  list-style: none;
  padding: 0;
}

.tech-stack li {
  padding: 10px;
  margin: 8px 0;
  background: #f8f9fa;
  border-radius: 6px;
  border-left: 4px solid #42b883;
  font-size: 16px;
}
</style>
