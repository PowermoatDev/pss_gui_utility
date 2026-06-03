const sql = require('mssql')
const mysql = require('mysql2/promise')

// 測試 MS SQL 連線
async function testMsSqlConnection(config) {
  let connection
  try {
    const sqlConfig = {
      server: config.host,
      port: config.port || 1433,
      user: config.username,
      password: config.password,
      database: config.database || 'master',
      options: {
        encrypt: true,
        trustServerCertificate: true,
        connectTimeout: 5000,
        requestTimeout: 5000
      }
    }
    
    connection = await sql.connect(sqlConfig)
    await connection.query('SELECT 1')
    
    return { 
      success: true, 
      message: '✅ MS SQL 連線成功',
      details: `已連線至 ${config.host}:${config.port || 1433}`
    }
  } catch (error) {
    return { 
      success: false, 
      message: '❌ MS SQL 連線失敗',
      error: error.message
    }
  } finally {
    if (connection) {
      try {
        await connection.close()
      } catch (e) {
        console.error('關閉 MSSQL 連線失敗:', e)
      }
    }
  }
}

// 測試 MySQL 連線
async function testMySqlConnection(config) {
  let connection
  try {
    const mysqlConfig = {
      host: config.host,
      port: config.port || 3306,
      user: config.username,
      password: config.password,
      database: config.database || undefined,
      connectTimeout: 5000
    }
    
    connection = await mysql.createConnection(mysqlConfig)
    await connection.ping()
    
    return { 
      success: true, 
      message: '✅ MySQL 連線成功',
      details: `已連線至 ${config.host}:${config.port || 3306}`
    }
  } catch (error) {
    return { 
      success: false, 
      message: '❌ MySQL 連線失敗',
      error: error.message
    }
  } finally {
    if (connection) {
      try {
        await connection.end()
      } catch (e) {
        console.error('關閉 MySQL 連線失敗:', e)
      }
    }
  }
}

// 測試資料庫連線（根據類型）
async function testDatabaseConnection(config) {
  if (!config || !config.type) {
    return { 
      success: false, 
      message: '❌ 缺少資料庫類型',
      error: '請選擇資料庫類型'
    }
  }
  
  if (!config.host || !config.username) {
    return { 
      success: false, 
      message: '❌ 缺少必填欄位',
      error: '請填寫主機位址和使用者名稱'
    }
  }
  
  if (config.type === 'mssql') {
    return await testMsSqlConnection(config)
  } else if (config.type === 'mysql') {
    return await testMySqlConnection(config)
  } else {
    return { 
      success: false, 
      message: '❌ 不支援的資料庫類型',
      error: `不支援的類型: ${config.type}`
    }
  }
}

module.exports = {
  testDatabaseConnection,
  testMsSqlConnection,
  testMySqlConnection
}
