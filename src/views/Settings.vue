<template>
  <div class="settings">
    <h1><Icon type="ios-settings" size="28" /> 系統設定</h1>
    
    <!-- 資料庫連線設定 -->
    <Card dis-hover :bordered="false" class="database-card">
      <template #title>
        <Icon type="ios-link" />
        資料庫連線設定
      </template>
      
      <Form :model="dbConfig" :label-width="120">
        <FormItem label="資料庫種類">
          <Select v-model="dbConfig.type" placeholder="請選擇資料庫類型">
            <Option value="mssql">MS SQL Server</Option>
            <Option value="mysql">MySQL</Option>
          </Select>
        </FormItem>
        
        <FormItem>
          <template #label>
            主機位址 <span style="color: red;">*</span>
          </template>
          <Input 
            v-model="dbConfig.host" 
            placeholder="localhost"
            clearable
          />
        </FormItem>
        
        <FormItem label="端口號">
          <InputNumber 
            v-model="dbConfig.port" 
            :min="1" 
            :max="65535"
            :placeholder="dbConfig.type === 'mssql' ? '1433' : '3306'"
            style="width: 200px"
          />
        </FormItem>
        
        <FormItem>
          <template #label>
            使用者名稱 <span style="color: red;">*</span>
          </template>
          <Input 
            v-model="dbConfig.username" 
            placeholder="admin"
            clearable
          />
        </FormItem>
        
        <FormItem label="密碼">
          <Input 
            v-model="dbConfig.password" 
            type="password"
            password
            placeholder="請輸入密碼"
          />
        </FormItem>
        
        <FormItem label="資料庫名稱">
          <Input 
            v-model="dbConfig.database" 
            :placeholder="dbConfig.type === 'mssql' ? 'master' : ''"
            clearable
          />
        </FormItem>
        
        <FormItem>
          <Button 
            type="primary" 
            icon="md-link"
            :loading="configStore.loading"
            @click="testConnection"
          >
            測試連線
          </Button>
          <Button 
            type="success" 
            icon="md-checkmark"
            :loading="configStore.loading"
            @click="saveConfiguration"
            style="margin-left: 8px"
          >
            儲存設定
          </Button>
        </FormItem>
      </Form>
    </Card>
    
    <!-- 語言設定 -->
    <Card dis-hover :bordered="false" style="margin-top: 16px">
      <template #title>
        <Icon type="ios-globe" />
        語言設定
      </template>
      
      <Form :label-width="120">
        <FormItem label="介面語言">
          <Select 
            v-model="appStore.language" 
            @on-change="handleLanguageChange"
            style="width: 200px"
          >
            <Option value="zh-TW">繁體中文</Option>
            <Option value="zh-CN">简体中文</Option>
            <Option value="en">English</Option>
            <Option value="ja">日本語</Option>
          </Select>
        </FormItem>
      </Form>
    </Card>
    
    <!-- 系統資訊 -->
    <Card dis-hover :bordered="false" style="margin-top: 16px">
      <template #title>
        <Icon type="ios-information-circle" />
        系統資訊
      </template>
      
      <div class="info-grid">
        <div class="info-item">
          <span class="info-label">平台：</span>
          <Tag color="primary">{{ appStore.platformName }}</Tag>
        </div>
        <div class="info-item">
          <span class="info-label">Node.js：</span>
          <Tag color="success">{{ appStore.systemInfo.node }}</Tag>
        </div>
        <div class="info-item">
          <span class="info-label">Chrome：</span>
          <span>{{ appStore.systemInfo.chrome }}</span>
        </div>
        <div class="info-item">
          <span class="info-label">Electron：</span>
          <Tag color="warning">{{ appStore.systemInfo.electron }}</Tag>
        </div>
      </div>
    </Card>
    
    <div class="actions">
      <Button 
        icon="ios-arrow-back"
        @click="$router.push('/system/info')"
      >
        返回系統資訊
      </Button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, toRaw } from 'vue'
import { Message } from 'view-ui-plus'
import { useAppStore } from '../stores/app'
import { useConfigStore } from '../stores/config'

const appStore = useAppStore()
const configStore = useConfigStore()

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
    Message.warning('請填寫必填欄位（主機位址、使用者名稱）')
    return
  }
  
  const result = await configStore.testConnection(toRaw(dbConfig.value))
  
  if (result.success) {
    Message.success({
      content: result.message + (result.details ? '\n' + result.details : ''),
      duration: 3
    })
  } else {
    Message.error({
      content: result.message + (result.error ? '\n' + result.error : ''),
      duration: 5
    })
  }
}

// 儲存設定
async function saveConfiguration() {
  if (!dbConfig.value.host || !dbConfig.value.username) {
    Message.warning('請填寫必填欄位（主機位址、使用者名稱）')
    return
  }
  
  const newConfig = {
    ...toRaw(configStore.config),
    database: toRaw(dbConfig.value)
  }
  
  const result = await configStore.saveConfig(newConfig)
  
  if (result.success) {
    Message.success('設定已成功儲存')
  } else {
    Message.error('儲存失敗：' + result.message)
  }
}

function handleLanguageChange(value) {
  console.log('語言已變更為：', value)
  Message.info('語言設定已更新為：' + value)
}
</script>

<style scoped>
.settings {
  padding: 2rem;
  max-width: 900px;
  margin: 0 auto;
}

h1 {
  font-size: 2rem;
  color: #2c3e50;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.actions {
  margin-top: 2rem;
  text-align: center;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px;
  background: #f8f9fa;
  border-radius: 4px;
}

.info-label {
  font-weight: 600;
  color: #666;
}

.form-hint {
  color: #808695;
  font-size: 12px;
  line-height: 1.5;
  margin-top: 4px;
}
</style>
