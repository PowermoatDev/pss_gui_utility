<template>
  <header class="app-header">
    <div class="header-content">
      <div class="logo">
        <h1>PSS GUI Utility</h1>
      </div>
      
      <div class="header-info">
        <span class="app-version">v1.0.0</span>
      </div>
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
  height: 60px;
  display: flex;
  align-items: center;
}

.header-content {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo h1 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
}

.header-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.app-version {
  background: rgba(255, 255, 255, 0.2);
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: 500;
}
</style>
