<template>
  <div class="menu-item">
    <!-- 父項目 -->
    <div 
      class="menu-parent" 
      @click="toggleExpand"
    >
      <div class="menu-parent-content">
        <span class="menu-icon">{{ item.icon }}</span>
        <span class="menu-title">{{ item.title }}</span>
      </div>
      <span class="expand-icon" :class="{ expanded: isExpanded }">
        ▶
      </span>
    </div>
    
    <!-- 子項目 -->
    <transition name="expand">
      <div v-show="isExpanded" class="menu-children">
        <router-link
          v-for="child in item.children"
          :key="child.id"
          :to="child.path"
          class="menu-child"
          active-class="active"
        >
          <span class="menu-icon">{{ child.icon }}</span>
          <span class="menu-title">{{ child.title }}</span>
        </router-link>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useMenuStore } from '../stores/menu'

const props = defineProps({
  item: {
    type: Object,
    required: true
  }
})

const route = useRoute()
const menuStore = useMenuStore()

// 判斷是否展開（從 store 獲取狀態）
const isExpanded = computed({
  get: () => menuStore.isMenuExpanded(props.item.id),
  set: (value) => menuStore.setMenuExpanded(props.item.id, value)
})

// 切換展開/收合
function toggleExpand() {
  isExpanded.value = !isExpanded.value
}

// 檢查當前路由是否在此菜單下
const isActive = computed(() => {
  return props.item.children.some(child => child.path === route.path)
})

// 當路由變化時，自動展開包含當前路由的菜單
watch(() => route.path, (newPath) => {
  const hasActivePath = props.item.children.some(child => child.path === newPath)
  if (hasActivePath && !isExpanded.value) {
    isExpanded.value = true
  }
}, { immediate: true })
</script>

<style scoped>
.menu-item {
  margin: 0.25rem 0;
}

.menu-parent {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  cursor: pointer;
  transition: background 0.2s;
}

.menu-parent:hover {
  background: rgba(255, 255, 255, 0.1);
}

.menu-parent-content {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.menu-icon {
  font-size: 1.2rem;
}

.menu-title {
  font-size: 0.95rem;
  font-weight: 500;
}

.expand-icon {
  font-size: 0.7rem;
  transition: transform 0.3s;
}

.expand-icon.expanded {
  transform: rotate(90deg);
}

.menu-children {
  background: rgba(0, 0, 0, 0.2);
  overflow: hidden;
}

.menu-child {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.6rem 1rem 0.6rem 2.5rem;
  color: #bdc3c7;
  text-decoration: none;
  transition: all 0.2s;
}

.menu-child:hover {
  background: rgba(255, 255, 255, 0.05);
  color: #ecf0f1;
}

.menu-child.active {
  background: rgba(66, 184, 131, 0.2);
  color: #42b883;
  border-left: 3px solid #42b883;
}

.menu-child .menu-title {
  font-size: 0.9rem;
  font-weight: 400;
}

/* 展開/收合動畫 */
.expand-enter-active,
.expand-leave-active {
  transition: all 0.3s ease;
  max-height: 500px;
}

.expand-enter-from,
.expand-leave-to {
  max-height: 0;
  opacity: 0;
}
</style>
