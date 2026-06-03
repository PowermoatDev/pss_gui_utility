<template>
  <div class="main-layout">
    <Header />
    
    <main class="main-content">
      <slot></slot>
    </main>
    
    <Footer />
  </div>
</template>

<script setup>
import Header from './Header.vue'
import Footer from './Footer.vue'
</script>

<style scoped>
.main-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  background: #f5f5f5;
}
</style>
