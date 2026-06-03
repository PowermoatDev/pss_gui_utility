<template>
  <div class="content-layout">
    <Sidebar />
    <div class="main-content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import Sidebar from './Sidebar.vue'
</script>

<style scoped>
.content-layout {
  display: flex;
  height: calc(100vh - 60px - 60px); /* 減去 header 和 footer 高度 */
  width: 100%;
}

.main-content {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  background: #f5f5f5;
}

/* 自定義滾動條樣式 */
.main-content::-webkit-scrollbar {
  width: 8px;
}

.main-content::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.main-content::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

.main-content::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
