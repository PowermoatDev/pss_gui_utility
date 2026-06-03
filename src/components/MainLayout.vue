<template>
  <div class="main-layout">
    <Header />
    
    <ContentLayout>
      <slot></slot>
    </ContentLayout>
    
    <Footer />
  </div>
</template>

<script setup>
import Header from './Header.vue'
import Footer from './Footer.vue'
import ContentLayout from './ContentLayout.vue'
</script>

<style scoped>
.main-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>
