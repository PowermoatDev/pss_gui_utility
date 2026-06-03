<template>
  <div class="settings">
    <h1>⚙️ 系統設定</h1>
    
    <Card title="資料庫連線設定" class="database-card">
      <div class="setting-item">
        <label>資料庫種類 <span class="required">*</span></label>
        <select v-model="dbConfig.type" class="db-select">
          <option value="mssql">MS SQL Server</option>
          <option value="mysql">MySQL</option>
        </select>
      </div>
      
      <div class="setting-item">
        <label>主機位址 (Host) <span class="required">*</span></label>
        <input 
          v-model="dbConfig.host" 
          type="text"
          placeholder="localhost"
          class="db-input"
        />
      </div>
      
      <div class="setting-item">
        <label>端口 (Port)</label>
        <input 
          v-model.number="dbConfig.port" 
          type="number"
          :placeholder="dbConfig.type === 'mssql' ? '1433' : '3306'"
          class="db-input"
        />
      </div>
      
      <div class="setting-item">
        <label>使用者名稱 <span class="required">*</span></label>
        <input 
          v-model="dbConfig.username" 
          type="text"
          placeholder="admin"
          class="db-input"
        />
      </div>
      
      <div class="setting-item">
        <label>密碼</label>
        <div class="password-input">
          <input 
            v-model="dbConfig.password" 
            :type="showPassword ? 'text' : 'password'"
            placeholder="••••••••"
            class="db-input"
          />
          <button 
            @click="showPassword = !showPassword" 
            class="toggle-password"
            type="button"
          >
            {{ showPassword ? '👁️' : '👁️‍🗨️' }}
          </button>
        </div>
      </div>
      
      <div class="setting-item">
        <label>資料庫名稱</label>
        <input 
          v-model="dbConfig.database" 
          type="text"
          :placeholder="dbConfig.type === 'mssql' ? 'master' : ''"
          class="db-input"
        />
      </div>
      
      <div class="db-actions">
        <button @click="testConnection" class="test-btn" :disabled="configStore.loading">
          {{ configStore.loading ? '測試中...' : '🔌 測試連線' }}
        </button>
        <button @click="saveConfiguration" class="save-btn primary" :disabled="configStore.loading">
          {{ configStore.loading ? '儲存中...' : '💾 儲存設定' }}
        </button>
      </div>
      
      <div v-if="message" :class="['message', messageType]">
        {{ message }}
      </div>
    </Card>
    
    <Card title="語言設定">
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
      <button @click="$router.push('/system/info')" class="back-btn">返回系統資訊</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, toRaw } from 'vue'
import { useAppStore } from '../stores/app'
import { useConfigStore } from '../stores/config'
import Card from '../components/Card.vue'

const appStore = useAppStore()
const configStore = useConfigStore()

const showPassword = ref(false)
const message = ref('')
const messageType = ref('info')

const dbConfig = ref({
  type: 'mssql',
  host: 'localhost',
  port: null,
  username: '',
  password: '',
  database: ''
})

// 載入設定
onMounted(async () => {
  await configStore.loadConfig()
  if (configStore.config?.database) {
    dbConfig.value = { ...configStore.config.database }
  }
})

// 測試資料庫連線
async function testConnection() {
  if (!dbConfig.value.host || !dbConfig.value.username) {
    showMessage('error', '❌ 請填寫必填欄位（主機位址、使用者名稱）')
    return
  }
  
  // 使用 toRaw 將 reactive 物件轉換為純物件
  const result = await configStore.testConnection(toRaw(dbConfig.value))
  
  if (result.success) {
    showMessage('success', result.message + (result.details ? '\n' + result.details : ''))
  } else {
    showMessage('error', result.message + (result.error ? '\n' + result.error : ''))
  }
}

// 儲存設定
async function saveConfiguration() {
  if (!dbConfig.value.host || !dbConfig.value.username) {
    showMessage('error', '❌ 請填寫必填欄位（主機位址、使用者名稱）')
    return
  }
  
  // 使用 toRaw 將 reactive 物件轉換為純物件，避免 IPC 序列化錯誤
  const newConfig = {
    ...toRaw(configStore.config),
    database: toRaw(dbConfig.value)
  }
  
  const result = await configStore.saveConfig(newConfig)
  
  if (result.success) {
    showMessage('success', '✅ 設定已成功儲存')
  } else {
    showMessage('error', '❌ 儲存失敗：' + result.message)
  }
}

function showMessage(type, msg) {
  messageType.value = type
  message.value = msg
  setTimeout(() => {
    message.value = ''
  }, 5000)
}

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
