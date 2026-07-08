<template>
  <div class="app-layout">
    <div class="main-content">
      <main class="view-container">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
// No necesitamos importar nada, router-view se encarga
</script>

<style scoped>
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