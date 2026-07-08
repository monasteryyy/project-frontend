<template>
  <div class="app-layout">
    <!-- Navbar siempre visible -->
    <AppNavbar />
    
    <div class="main-content">
      <main class="view-container">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppNavbar from './components/AppNavbar.vue'
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background-color: #f3f4f6;
}

.app-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  display: flex;
  flex: 1;
}

.view-container {
  flex: 1;
  background-color: #f3f4f6;
}
</style>