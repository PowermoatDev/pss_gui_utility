import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useMenuStore = defineStore('menu', () => {
  // State: 展開的菜單 ID 列表
  const expandedMenus = ref(new Set(['system'])) // 預設展開系統管理
  
  // Getters
  const isMenuExpanded = computed(() => {
    return (menuId) => expandedMenus.value.has(menuId)
  })
  
  // Actions
  function setMenuExpanded(menuId, expanded) {
    if (expanded) {
      expandedMenus.value.add(menuId)
    } else {
      expandedMenus.value.delete(menuId)
    }
  }
  
  function toggleMenu(menuId) {
    if (expandedMenus.value.has(menuId)) {
      expandedMenus.value.delete(menuId)
    } else {
      expandedMenus.value.add(menuId)
    }
  }
  
  function expandAll() {
    expandedMenus.value = new Set(['system', 'about'])
  }
  
  function collapseAll() {
    expandedMenus.value.clear()
  }
  
  return {
    expandedMenus,
    isMenuExpanded,
    setMenuExpanded,
    toggleMenu,
    expandAll,
    collapseAll
  }
})
