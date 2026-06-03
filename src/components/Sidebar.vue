<template>
  <aside class="sidebar">
    <nav class="sidebar-nav">
      <SidebarMenuItem 
        v-for="item in menuItems" 
        :key="item.id"
        :item="item"
      />
    </nav>
  </aside>
</template>

<script setup>
import { computed } from 'vue'
import { menuConfig } from '../router/menuConfig'
import SidebarMenuItem from './SidebarMenuItem.vue'

const menuItems = computed(() => menuConfig)
</script>

<style scoped>
.sidebar {
  width: 250px;
  background: #2c3e50;
  color: #ecf0f1;
  overflow-y: auto;
  overflow-x: hidden;
  flex-shrink: 0;
}

.sidebar-nav {
  padding: 1rem 0;
}

/* 自定義滾動條樣式 */
.sidebar::-webkit-scrollbar {
  width: 8px;
}

.sidebar::-webkit-scrollbar-track {
  background: #1a252f;
}

.sidebar::-webkit-scrollbar-thumb {
  background: #4a5f7f;
  border-radius: 4px;
}

.sidebar::-webkit-scrollbar-thumb:hover {
  background: #5a7fa0;
}
</style>
