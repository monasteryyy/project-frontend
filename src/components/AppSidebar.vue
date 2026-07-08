<template>
  <aside class="app-sidebar">
    <div class="sidebar-header">
      <h4>Panel de Control</h4>
    </div>
    
    <nav class="sidebar-nav">

      <a href="#" class="nav-item active" @click.prevent="navigate('Mis Tareas')">
        <i class="pi pi-list"></i>
        <span>Mis Tareas</span>
      </a>
      

      <a href="#" class="nav-item" @click.prevent="navigate('Historial')">
        <i class="pi pi-history"></i>
        <span>Historial de Actividad</span>
      </a>
      
      <a href="#" class="nav-item" @click.prevent="navigate('Mensajes')">
        <i class="pi pi-envelope"></i>
        <span>Mensajes</span>
      </a>

      <a href="#" class="nav-item" @click.prevent="navigate('Configuración')">
        <i class="pi pi-cog"></i>
        <span>Configuración</span>
      </a>
    </nav>

    <div class="sidebar-footer">
      <div class="reputation-summary">
        <p>Tu Reputación</p>
        <RatingStars :rating="4" :readonly="true" />
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import RatingStars from './RatingStars.vue'

const navigate = (section: string) => {
  console.log(`Navegar a la sección: ${section}`)
}
</script>

<style scoped>
.app-sidebar {
  width: 250px;
  background-color: white;
  border-right: 1px solid #e2e8f0;
  height: 100vh;
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: column;
}

.sidebar-header {
  padding: 1.5rem;
  border-bottom: 1px solid #f1f5f9;
}

.sidebar-header h4 {
  margin: 0;
  color: #0f172a;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.sidebar-nav {
  padding: 1rem 0;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1.5rem;
  color: #475569;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.2s;
}

.nav-item:hover {
  background-color: #f8fafc;
  color: #2563eb;
}

.nav-item.active {
  background-color: #eff6ff;
  color: #2563eb;
  border-right: 3px solid #2563eb;
}

.sidebar-footer {
  padding: 1.5rem;
  border-top: 1px solid #f1f5f9;
  background-color: #f8fafc;
}

.reputation-summary p {
  margin: 0 0 0.5rem 0;
  font-size: 0.75rem;
  font-weight: 600;
  color: #64748b;
  text-transform: uppercase;
}
</style>