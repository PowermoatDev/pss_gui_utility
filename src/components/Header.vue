<template>
  <header class="app-header">
    <div class="header-content">
      <div class="logo">
        <h1>PSS GUI Utility</h1>
      </div>
      
      <nav class="nav-menu">
        <router-link to="/" class="nav-link">首頁</router-link>
        <router-link to="/about" class="nav-link">關於</router-link>
        <router-link to="/settings" class="nav-link">設定</router-link>
      </nav>
    </div>
  </header>
</template>

<script setup>
</script>

<style scoped>
.app-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1rem 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo h1 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
}

.nav-menu {
  display: flex;
  gap: 2rem;
}

.nav-link {
  color: white;
  text-decoration: none;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background 0.3s;
}

.nav-link:hover {
  background: rgba(255, 255, 255, 0.1);
}

.nav-link.router-link-active {
  background: rgba(255, 255, 255, 0.2);
  font-weight: 600;
}
</style>
