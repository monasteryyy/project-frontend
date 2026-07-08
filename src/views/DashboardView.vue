<template>
  <div class="dashboard-wrapper">
    <header class="dashboard-header">
      <div class="welcome-text">
        <h1>¡Hola, julian! 👋</h1>
        <p>Aquí tienes un resumen de tu actividad en la plataforma.</p>
      </div>
      <div class="header-actions">
        <button class="btn-primary">
          <i class="pi pi-plus"></i> Publicar Nueva Tarea
        </button>
      </div>
    </header>

    <section class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon bg-blue"><i class="pi pi-briefcase"></i></div>
        <div class="stat-info">
          <h3>3</h3>
          <p>Tareas Publicadas</p>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon bg-green"><i class="pi pi-check-circle"></i></div>
        <div class="stat-info">
          <h3>5</h3>
          <p>Trabajos Finalizados</p>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon bg-yellow"><i class="pi pi-star"></i></div>
        <div class="stat-info">
          <h3>4.8</h3>
          <p>Calificación Promedio</p>
        </div>
      </div>
    </section>

    <section class="dashboard-content">
      
      <div class="tasks-section">
        <div class="section-header">
          <h2>Mis Tareas Publicadas</h2>
        </div>
        
        <div class="task-list">
          <div v-for="task in postedTasks" :key="task.id" class="task-item">
            <div class="task-info">
              <h4>{{ task.title }}</h4>
              <p><i class="pi pi-calendar"></i> {{ task.date }}</p>
            </div>
            <span class="status-badge" :class="task.statusClass">
              {{ task.status }}
            </span>
          </div>
          
          <div v-if="postedTasks.length === 0" class="empty-state">
            <p>No has publicado ninguna tarea aún.</p>
          </div>
        </div>
      </div>

      <div class="tasks-section">
        <div class="section-header">
          <h2>Mis Trabajos</h2>
        </div>
        
        <div class="task-list">
          <div v-for="job in myJobs" :key="job.id" class="task-item">
            <div class="task-info">
              <h4>{{ job.title }}</h4>
              <p><i class="pi pi-user"></i> Empleador: {{ job.employer }}</p>
            </div>
            <span class="status-badge" :class="job.statusClass">
              {{ job.status }}
            </span>
          </div>

          <div v-if="myJobs.length === 0" class="empty-state">
            <p>No tienes trabajos activos en este momento.</p>
          </div>
        </div>
      </div>

    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'



const postedTasks = ref([
  {
    id: 1,
    title: 'Pintar la fachada de mi casa',
    date: '15 Oct 2023',
    status: 'En proceso',
    statusClass: 'status-progress'
  },
  {
    id: 2,
    title: 'Arreglar tubería del lavaplatos',
    date: '10 Oct 2023',
    status: 'Finalizada',
    statusClass: 'status-finished'
  },
  {
    id: 3,
    title: 'Limpieza profunda de apartamento',
    date: '01 Oct 2023',
    status: 'Cancelada',
    statusClass: 'status-cancelled'
  }
])

const myJobs = ref([
  {
    id: 101,
    title: 'Pasear a mis dos perros',
    employer: 'Carlos Gómez',
    status: 'Publicada (Postulado)',
    statusClass: 'status-published'
  },
  {
    id: 102,
    title: 'Entregar paquete urgente',
    employer: 'María Rodríguez',
    status: 'Finalizada',
    statusClass: 'status-finished'
  }
])
</script>

<style scoped>
.dashboard-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

/* --- Header --- */
.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.welcome-text h1 {
  margin: 0 0 0.5rem 0;
  color: #1e293b;
}

.welcome-text p {
  margin: 0;
  color: #64748b;
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

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2.5rem;
}

.stat-card {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.stat-icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
}

.bg-blue { background-color: #eff6ff; color: #3b82f6; }
.bg-green { background-color: #f0fdf4; color: #22c55e; }
.bg-yellow { background-color: #fefce8; color: #eab308; }

.stat-info h3 {
  margin: 0;
  font-size: 1.75rem;
  color: #1e293b;
}

.stat-info p {
  margin: 0;
  color: #64748b;
  font-size: 0.875rem;
  font-weight: 500;
}


.dashboard-content {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

@media (min-width: 768px) {
  .dashboard-content {
    grid-template-columns: 1fr 1fr;
  }
}

.tasks-section {
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  overflow: hidden;
}

.section-header {
  padding: 1.5rem;
  border-bottom: 1px solid #e2e8f0;
}

.section-header h2 {
  margin: 0;
  font-size: 1.25rem;
  color: #0f172a;
}

.task-list {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.task-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  transition: border-color 0.2s;
}

.task-item:hover {
  border-color: #cbd5e1;
}

.task-info h4 {
  margin: 0 0 0.5rem 0;
  color: #334155;
  font-size: 1rem;
}

.task-info p {
  margin: 0;
  color: #64748b;
  font-size: 0.875rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}


.status-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
}

.status-published {
  background-color: #e0e7ff;
  color: #3730a3;
}

.status-progress {
  background-color: #fef3c7;
  color: #b45309;
}

.status-finished {
  background-color: #dcfce7;
  color: #166534;
}

.status-cancelled {
  background-color: #fee2e2;
  color: #b91c1c;
}

.empty-state {
  text-align: center;
  padding: 2rem;
  color: #94a3b8;
  font-style: italic;
}
</style>