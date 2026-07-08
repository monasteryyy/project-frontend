<template>
  <div class="dashboard-wrapper">
    <header class="dashboard-header">
      <div class="welcome-text">
        <h1>¡Hola, {{ userName }}! 👋</h1>
        <p>Aquí tienes un resumen de tu actividad en la plataforma.</p>
      </div>
      <div class="header-actions">
        <button class="btn-primary" @click="goToCreateTask">
          <i class="pi pi-plus"></i> Publicar Nueva Tarea
        </button>
      </div>
    </header>

    <section class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon bg-blue"><i class="pi pi-briefcase"></i></div>
        <div class="stat-info">
          <h3>{{ stats.published }}</h3>
          <p>Tareas Publicadas</p>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon bg-green"><i class="pi pi-check-circle"></i></div>
        <div class="stat-info">
          <h3>{{ stats.finished }}</h3>
          <p>Trabajos Finalizados</p>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon bg-yellow"><i class="pi pi-star"></i></div>
        <div class="stat-info">
          <h3>{{ stats.rating }}</h3>
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
              <p><i class="pi pi-calendar"></i> {{ task.createdAt || task.createdAT }}</p>
            </div>
            <span class="status-badge" :class="getStatusClass(task.status)">
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
              <p><i class="pi pi-user"></i> Empleador: {{ job.employer || 'Desconocido' }}</p>
            </div>
            <span class="status-badge" :class="getStatusClass(job.status)">
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
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth.store';
import { taskService } from '../services/tasks.service';

const router = useRouter();
const authStore = useAuthStore();

const userName = ref('Usuario');
const postedTasks = ref<any[]>([]);
const myJobs = ref<any[]>([]);
const stats = ref({ published: 0, finished: 0, rating: 0 });

onMounted(async () => {
  if (authStore.user) {
    userName.value = authStore.user.name || 'Usuario';
    await loadData();
  }
});

const loadData = async () => {
  try {
    // Obtener tareas del usuario
    const response = await taskService.getMyTasks();
    postedTasks.value = response.data || [];
    
    // Calcular estadísticas
    stats.value.published = postedTasks.value.length;
    stats.value.finished = postedTasks.value.filter(
      (t: any) => t.status === 'Finalizada' || t.status === 'finished'
    ).length;
    
    // Para trabajos, podemos usar las mismas tareas o un endpoint específico
    myJobs.value = postedTasks.value.filter(
      (t: any) => t.status !== 'Creada' && t.status !== 'published'
    );
    
  } catch (error) {
    console.error('Error al cargar datos:', error);
  }
};

const getStatusClass = (status: string) => {
  const map: Record<string, string> = {
    'Creada': 'status-published',
    'published': 'status-published',
    'En Progreso': 'status-progress',
    'progress': 'status-progress',
    'Finalizada': 'status-finished',
    'finished': 'status-finished',
    'Cancelada': 'status-cancelled',
    'cancelled': 'status-cancelled',
  };
  return map[status] || 'status-published';
};

const goToCreateTask = () => {
  router.push('/tasks/create');
};
</script>

<style scoped>
.dashboard-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

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