<template>
  <nav class="app-navbar">
    <div class="nav-container">
      <div class="brand" @click="goTo('/')">
        <i class="pi pi-briefcase"></i>
        <span>FreeTime</span>
      </div>

      <div class="nav-links">
        <a href="#" @click.prevent="goTo('/tasks')">Buscar Tareas</a>
        <a href="#" @click.prevent="goTo('/tasks/create')">Publicar Tarea</a>
      </div>

      <div class="user-actions">
        <!-- Si no hay sesión, mostrar Login y Register -->
        <template v-if="!isAuthenticated">
          <a href="#" @click.prevent="goTo('/login')" class="nav-link">
            <i class="pi pi-sign-in"></i> Iniciar Sesión
          </a>
          <BaseButton label="Registrarse" severity="primary" @click="goTo('/register')" />
        </template>

        <!-- Si hay sesión, mostrar perfil y salir -->
        <template v-else>
          <a href="#" @click.prevent="goTo('/profile')" class="profile-link">
            <i class="pi pi-user"></i> Mi Perfil
          </a>
          <BaseButton label="Salir" severity="secondary" @click="logout" />
        </template>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import BaseButton from './BaseButton.vue'

const router = useRouter()
const isAuthenticated = ref(false) // Temporal, luego lo conectaremos con Pinia

const goTo = (route: string) => {
  router.push(route)
}

const logout = () => {
  isAuthenticated.value = false
  router.push('/')
}
</script>

<style scoped>
.app-navbar {
  background-color: white;
  border-bottom: 1px solid #e2e8f0;
  position: sticky;
  top: 0;
  z-index: 50;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.brand {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.25rem;
  font-weight: bold;
  color: #2563eb;
  cursor: pointer;
}

.nav-links {
  display: flex;
  gap: 1.5rem;
  align-items: center;
}

.nav-links a {
  text-decoration: none;
  color: #475569;
  font-weight: 500;
  transition: color 0.2s;
}

.nav-links a:hover {
  color: #2563eb;
}

.user-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.nav-link {
  text-decoration: none;
  color: #475569;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: color 0.2s;
}

.nav-link:hover {
  color: #2563eb;
}

.profile-link {
  text-decoration: none;
  color: #475569;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

@media (max-width: 768px) {
  .nav-links {
    display: none;
  }
}
</style>