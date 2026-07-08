<template>
  <div class="postulations-wrapper">
    <header class="postulations-header">
      <div class="welcome-text">
        <h1>Mis Postulaciones</h1>
        <p>Revisa el estado de las tareas a las que te has postulado.</p>
      </div>
    </header>

    <section class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon bg-blue"><i class="pi pi-send"></i></div>
        <div class="stat-info">
          <h3>{{ postulations.length }}</h3>
          <p>Postulaciones Enviadas</p>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon bg-yellow"><i class="pi pi-clock"></i></div>
        <div class="stat-info">
          <h3>{{ pendingCount }}</h3>
          <p>Pendientes</p>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon bg-green"><i class="pi pi-check-circle"></i></div>
        <div class="stat-info">
          <h3>{{ acceptedCount }}</h3>
          <p>Aceptadas</p>
        </div>
      </div>
    </section>

    <section class="postulations-section">
      <div class="section-header">
        <h2>Historial de Postulaciones</h2>
      </div>

      <div class="task-list">
        <div v-for="postulation in postulations" :key="postulation.id" class="task-item">
          <div class="task-info">
            <h4>{{ postulation.taskTitle }}</h4>
            <p><i class="pi pi-user"></i> Empleador: {{ postulation.employer }}</p>
            <p><i class="pi pi-calendar"></i> Postulado el {{ postulation.appliedDate }}</p>
          </div>
          <div class="task-item__right">
            <span class="status-badge" :class="postulation.statusClass">
              {{ postulation.statusLabel }}
            </span>
            <button
              v-if="postulation.status === 'pending'"
              class="btn-text-danger"
              @click="$emit('cancel-postulation', postulation.id)"
            >
              Retirar
            </button>
          </div>
        </div>

        <div v-if="postulations.length === 0" class="empty-state">
          <p>Aún no te has postulado a ninguna tarea.</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

// TEMPORAL: mover a src/types/postulation.types.ts cuando Tomás lo publique
interface Postulation {
  id: number
  taskTitle: string
  employer: string
  appliedDate: string
  status: 'pending' | 'accepted' | 'rejected'
  statusLabel: string
  statusClass: string
}

defineEmits<{
  'cancel-postulation': [id: number]
}>()

// TEMPORAL: mock data, reemplazar con postulations.store.ts
const postulations = ref<Postulation[]>([
  {
    id: 1,
    taskTitle: 'Pasear a mis dos perros',
    employer: 'Carlos Gómez',
    appliedDate: '05 Oct 2023',
    status: 'accepted',
    statusLabel: 'Aceptada',
    statusClass: 'status-finished',
  },
  {
    id: 2,
    taskTitle: 'Ayuda con mudanza',
    employer: 'Ana Torres',
    appliedDate: '08 Oct 2023',
    status: 'pending',
    statusLabel: 'Pendiente',
    statusClass: 'status-progress',
  },
  {
    id: 3,
    taskTitle: 'Clases de matemáticas',
    employer: 'Luis Peña',
    appliedDate: '02 Oct 2023',
    status: 'rejected',
    statusLabel: 'Rechazada',
    statusClass: 'status-cancelled',
  },
])

const pendingCount = computed(
  () => postulations.value.filter((p) => p.status === 'pending').length
)
const acceptedCount = computed(
  () => postulations.value.filter((p) => p.status === 'accepted').length
)
</script>

<style scoped>
.postulations-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.postulations-header {
  margin-bottom: 2rem;
}

.welcome-text h1 {
  margin: 0 0 0.5rem 0;
  color: #1e293b;
}

.welcome-text p {
  margin: 0;
  color: #64748b;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2.5rem;
}

.stat-card {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
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

.postulations-section {
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
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
  flex-wrap: wrap;
  gap: 0.75rem;
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

.task-item__right {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.status-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  white-space: nowrap;
}

.status-progress { background-color: #fef3c7; color: #b45309; }
.status-finished { background-color: #dcfce7; color: #166534; }
.status-cancelled { background-color: #fee2e2; color: #b91c1c; }

.btn-text-danger {
  background: none;
  border: none;
  color: #b91c1c;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
  text-decoration: underline;
  padding: 0;
}

.empty-state {
  text-align: center;
  padding: 2rem;
  color: #94a3b8;
  font-style: italic;
}
</style>