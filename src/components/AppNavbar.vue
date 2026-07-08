<template>
  <nav class="app-navbar">
    <div class="nav-container">
      <div class="brand" @click="goTo('/')">
        <i class="pi pi-briefcase"></i>
        <span>FreeTime
        </span>
      </div>

      <div class="nav-links">
        <a href="#" @click.prevent="goTo('/tasks')">Buscar Tareas</a>
        <a href="#" @click.prevent="goTo('/tasks/create')">Publicar Tarea</a>
      </div>

      <div class="user-actions">
        <a href="#" @click.prevent="goTo('/profile')" class="profile-link">
          <i class="pi pi-user"></i> Mi Perfil
        </a>
        <BaseButton label="Salir" severity="secondary" @click="logout" />
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import BaseButton from './BaseButton.vue'

// Como el router aún no está listo, simulamos la navegación
const goTo = (route: string) => {
  console.log(`Navegando a: ${route}`)
  // Cuando Tomás arregle el router, aquí usaremos: router.push(route)
}

const logout = () => {
  alert('Cerrando sesión...')
  goTo('/login')
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
  display: none; 
  gap: 1.5rem;
}

@media (min-width: 768px) {
  .nav-links {
    display: flex;
  }
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

.profile-link {
  text-decoration: none;
  color: #475569;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
</style>