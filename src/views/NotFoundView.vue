<template>
  <div class="notfound-wrapper">
    <div class="notfound-card">
      <div class="notfound-icon">
        <i class="pi pi-compass"></i>
      </div>
      <h1 class="notfound-code">404</h1>
      <h2 class="notfound-title">Página no encontrada</h2>
      <p class="notfound-text">
        La página que buscas no existe o fue movida. Revisa la dirección
        o vuelve al catálogo de tareas.
      </p>
      <div class="notfound-actions">
        <button class="btn-secondary" @click="goBack">
          <i class="pi pi-arrow-left"></i> Volver
        </button>
        <button class="btn-primary" @click="goHome">
          <i class="pi pi-home"></i> Ir al inicio
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function goBack() {
  router.back()
}

function goHome() {
  router.push('/')
}
</script>

<style scoped>
.notfound-wrapper {
  min-height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
}

.notfound-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  padding: 3rem 2rem;
  max-width: 480px;
  text-align: center;
}

.notfound-icon {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #eff6ff;
  color: #3b82f6;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  margin: 0 auto 1.5rem;
}

.notfound-code {
  margin: 0;
  font-size: 3rem;
  color: #1e293b;
  line-height: 1;
}

.notfound-title {
  margin: 0.5rem 0 1rem;
  font-size: 1.25rem;
  color: #334155;
}

.notfound-text {
  margin: 0 0 2rem;
  color: #64748b;
  font-size: 0.9rem;
  line-height: 1.5;
}

.notfound-actions {
  display: flex;
  gap: 0.75rem;
  justify-content: center;
  flex-wrap: wrap;
}

.btn-primary {
  background-color: #3b82f6;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: background-color 0.2s;
}

.btn-primary:hover {
  background-color: #2563eb;
}

.btn-secondary {
  background-color: #f1f5f9;
  color: #334155;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: background-color 0.2s;
}

.btn-secondary:hover {
  background-color: #e2e8f0;
}
</style>