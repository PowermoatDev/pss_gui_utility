<template>
  <footer class="app-footer">
    <div class="footer-content">
      <p class="copyright">
        © 2026 PSS GUI Utility. All rights reserved.
      </p>
      
      <div class="footer-info">
        <span>Version 1.0.0</span>
        <span class="separator">|</span>
        <span>Built with Vue 3 & Electron</span>
      </div>
    </div>
  </footer>
</template>

<script setup>
</script>

<style scoped>
.app-footer {
  background: #2c3e50;
  color: #ecf0f1;
  padding: 1.5rem 2rem;
  margin-top: auto;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.copyright {
  margin: 0;
  font-size: 0.9rem;
}

.footer-info {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.85rem;
  color: #95a5a6;
}

.separator {
  color: #7f8c8d;
}

@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
    text-align: center;
  }
}
</style>
