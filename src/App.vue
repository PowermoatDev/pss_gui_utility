<template>
  <MainLayout>
    <router-view />
  </MainLayout>
</template>

<script setup>
import MainLayout from './components/MainLayout.vue';
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  background: #f5f5f5;
  color: #2c3e50;
}

#app {
  min-height: 100vh;
}
</style>
