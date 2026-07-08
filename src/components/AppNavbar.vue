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
        <a href="#" @click.prevent="goTo('/dashboard')">Dashboard</a>
        <a href="#" @click.prevent="goTo('/postulations')">Mis Postulaciones</a>
      </div>

      <div class="user-actions">
        <template v-if="!authStore.isAuthenticated">
          <a href="#" @click.prevent="goTo('/login')" class="nav-link">
            <i class="pi pi-sign-in"></i> Iniciar Sesión
          </a>
          <button class="btn-register" @click="goTo('/register')">Registrarse</button>
        </template>

        <template v-else>
          <a href="#" @click.prevent="goTo('/profile')" class="nav-link profile-link">
            <i class="pi pi-user"></i> {{ authStore.user?.name || 'Usuario' }}
          </a>
          <button class="btn-logout" @click="handleLogout">Cerrar Sesión</button>
        </template>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth.store'

const router = useRouter()
const authStore = useAuthStore()

const goTo = (route: string) => {
  router.push(route)
}

const handleLogout = () => {
  authStore.logout()
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
  padding: 0.75rem 1rem;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
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
  flex-wrap: wrap;
}

.nav-links a {
  text-decoration: none;
  color: #475569;
  font-weight: 500;
  transition: color 0.2s;
  font-size: 0.9rem;
  cursor: pointer;
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
  cursor: pointer;
}

.nav-link:hover {
  color: #2563eb;
}

.profile-link {
  text-decoration: none;
  color: #475569;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: color 0.2s;
  cursor: pointer;
}

.profile-link:hover {
  color: #2563eb;
}

.btn-register {
  background-color: #3b82f6;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-register:hover {
  background-color: #2563eb;
}

.btn-logout {
  background-color: #ef4444;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-logout:hover {
  background-color: #dc2626;
}

@media (max-width: 768px) {
  .nav-links {
    display: none;
  }
}
</style>