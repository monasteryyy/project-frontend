<template>
  <div class="postulations-wrapper">
    <div class="postulations-header">
      <h1>Mis Postulaciones</h1>
      <p>Aquí puedes ver todas las tareas a las que te has postulado.</p>
    </div>

    <!-- Tabs para cambiar entre vistas -->
    <div class="tabs">
      <button 
        class="tab-btn" 
        :class="{ active: activeTab === 'mis-postulaciones' }"
        @click="activeTab = 'mis-postulaciones'"
      >
        Mis Postulaciones
      </button>
      <button 
        class="tab-btn" 
        :class="{ active: activeTab === 'postulaciones-recibidas' }"
        @click="activeTab = 'postulaciones-recibidas'"
      >
        Postulaciones Recibidas
      </button>
    </div>

    <!-- Mis Postulaciones (como trabajador) -->
    <div v-if="activeTab === 'mis-postulaciones'">
      <div v-if="isLoading" class="loading-state">
        <p>Cargando postulaciones...</p>
      </div>

      <div v-else-if="myPostulations.length === 0" class="empty-state">
        <i class="pi pi-inbox"></i>
        <p>No te has postulado a ninguna tarea aún.</p>
        <button class="btn-browse" @click="goToCatalog">Explorar Tareas</button>
      </div>

      <div v-else class="postulations-grid">
        <div 
          v-for="postulation in myPostulations" 
          :key="postulation.id" 
          class="postulation-card"
        >
          <div class="card-header">
            <h3>{{ postulation.task?.title || 'Tarea eliminada' }}</h3>
            <span class="status-badge" :class="getStatusClass(postulation.status)">
              {{ postulation.status }}
            </span>
          </div>

          <div class="card-body">
            <p class="task-description">{{ postulation.task?.description || 'Descripción no disponible' }}</p>
            <div class="task-details">
              <span><i class="pi pi-tag"></i> {{ postulation.task?.category || 'Sin categoría' }}</span>
              <span><i class="pi pi-map-marker"></i> {{ postulation.task?.location || 'Sin ubicación' }}</span>
              <span><i class="pi pi-dollar"></i> ${{ postulation.task?.amount || 0 }}</span>
            </div>
            <p class="postulation-date">Postulado el: {{ formatDate(postulation.applicationDate) }}</p>
          </div>

          <div class="card-footer">
            <button 
              class="btn-detail" 
              @click="goToTaskDetail(postulation.taskId)"
            >
              Ver Tarea
            </button>
            <button 
              v-if="postulation.status === 'pendiente'"
              class="btn-cancel" 
              @click="cancelPostulation(postulation.id)"
            >
              Cancelar Postulación
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Postulaciones Recibidas (como empleador) -->
    <div v-if="activeTab === 'postulaciones-recibidas'">
      <div v-if="isLoading" class="loading-state">
        <p>Cargando postulaciones recibidas...</p>
      </div>

      <div v-else-if="receivedPostulations.length === 0" class="empty-state">
        <i class="pi pi-users"></i>
        <p>No has recibido postulaciones en tus tareas aún.</p>
      </div>

      <div v-else class="postulations-grid">
        <div 
          v-for="postulation in receivedPostulations" 
          :key="postulation.id" 
          class="postulation-card"
        >
          <div class="card-header">
            <h3>{{ postulation.task?.title || 'Tarea eliminada' }}</h3>
            <span class="status-badge" :class="getStatusClass(postulation.status)">
              {{ postulation.status }}
            </span>
          </div>

          <div class="card-body">
            <p class="task-description">{{ postulation.task?.description || 'Descripción no disponible' }}</p>
            <div class="task-details">
              <span><i class="pi pi-tag"></i> {{ postulation.task?.category || 'Sin categoría' }}</span>
              <span><i class="pi pi-map-marker"></i> {{ postulation.task?.location || 'Sin ubicación' }}</span>
              <span><i class="pi pi-dollar"></i> ${{ postulation.task?.amount || 0 }}</span>
            </div>
            <p class="postulation-date">
              <strong>Postulante:</strong> {{ postulation.user?.name || 'Usuario desconocido' }}
            </p>
            <p class="postulation-date">Postulado el: {{ formatDate(postulation.applicationDate) }}</p>
          </div>

          <div class="card-footer">
            <button 
              class="btn-detail" 
              @click="goToTaskDetail(postulation.taskId)"
            >
              Ver Tarea
            </button>
            <button 
              v-if="postulation.status === 'pendiente'"
              class="btn-accept" 
              @click="updatePostulationStatus(postulation.id, 'aceptada')"
            >
              Aceptar
            </button>
            <button 
              v-if="postulation.status === 'pendiente'"
              class="btn-reject" 
              @click="updatePostulationStatus(postulation.id, 'rechazada')"
            >
              Rechazar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { postulationService } from '../services/postulations.service'

const router = useRouter()
const isLoading = ref(true)
const activeTab = ref('mis-postulaciones')
const allPostulations = ref<any[]>([])
const myPostulations = ref<any[]>([])
const receivedPostulations = ref<any[]>([])

const currentUser = JSON.parse(localStorage.getItem('user') || '{}')

onMounted(async () => {
  if (!currentUser.id) {
    router.push('/login')
    return
  }

  try {
    // Obtener todas las postulaciones del usuario (como postulante)
    const myResponse = await postulationService.getByUser(currentUser.id)
    myPostulations.value = myResponse.data

    // Obtener todas las postulaciones de tareas del usuario (como empleador)
    const allResponse = await postulationService.getAll()
    receivedPostulations.value = allResponse.data.filter(
      (p: any) => p.task?.userId === currentUser.id
    )
  } catch (error) {
    console.error('Error al cargar postulaciones:', error)
  } finally {
    isLoading.value = false
  }
})

const goToCatalog = () => {
  router.push('/tasks')
}

const goToTaskDetail = (taskId: number) => {
  router.push(`/tasks/${taskId}`)
}

const cancelPostulation = async (id: number) => {
  if (!confirm('¿Estás seguro de cancelar esta postulación?')) return

  try {
    await postulationService.delete(id)
    myPostulations.value = myPostulations.value.filter(p => p.id !== id)
    alert('Postulación cancelada exitosamente')
  } catch (error: any) {
    alert(error.response?.data?.message || 'Error al cancelar la postulación')
  }
}

const updatePostulationStatus = async (id: number, status: string) => {
  const action = status === 'aceptada' ? 'aceptar' : 'rechazar'
  if (!confirm(`¿Estás seguro de ${action} esta postulación?`)) return

  try {
    await postulationService.update(id, { status })
    
    // Actualizar localmente
    const index = receivedPostulations.value.findIndex(p => p.id === id)
    if (index !== -1) {
      receivedPostulations.value[index].status = status
    }
    
    alert(`Postulación ${status === 'aceptada' ? 'aceptada' : 'rechazada'} exitosamente`)
  } catch (error: any) {
    alert(error.response?.data?.message || `Error al ${status === 'aceptada' ? 'aceptar' : 'rechazar'} la postulación`)
  }
}

const getStatusClass = (status: string) => {
  const classes: Record<string, string> = {
    'pendiente': 'status-pending',
    'aceptada': 'status-accepted',
    'rechazada': 'status-rejected',
    'cancelada': 'status-cancelled'
  }
  return classes[status] || 'status-pending'
}

const formatDate = (date: string) => {
  if (!date) return 'Fecha no disponible'
  return new Date(date).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
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

.postulations-header h1 {
  margin: 0 0 0.5rem 0;
  color: #1e293b;
  font-size: 2rem;
}

.postulations-header p {
  margin: 0;
  color: #64748b;
}

/* Tabs */
.tabs {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  border-bottom: 2px solid #e2e8f0;
}

.tab-btn {
  background: none;
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  color: #64748b;
  cursor: pointer;
  border-bottom: 3px solid transparent;
  transition: all 0.2s;
}

.tab-btn:hover {
  color: #1e293b;
}

.tab-btn.active {
  color: #3b82f6;
  border-bottom-color: #3b82f6;
}

.loading-state {
  text-align: center;
  padding: 4rem;
  color: #64748b;
}

.empty-state {
  text-align: center;
  padding: 4rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.empty-state i {
  font-size: 4rem;
  color: #cbd5e1;
  margin-bottom: 1rem;
}

.empty-state p {
  color: #64748b;
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
}

.btn-browse {
  background-color: #3b82f6;
  color: white;
  border: none;
  padding: 0.75rem 2rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-browse:hover {
  background-color: #2563eb;
}

.postulations-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

@media (min-width: 768px) {
  .postulations-grid {
    grid-template-columns: 1fr 1fr;
  }
}

.postulation-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  border: 1px solid #e2e8f0;
  transition: transform 0.2s, box-shadow 0.2s;
  display: flex;
  flex-direction: column;
}

.postulation-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.card-header h3 {
  margin: 0;
  font-size: 1.1rem;
  color: #1e293b;
  flex: 1;
  margin-right: 1rem;
}

.status-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  white-space: nowrap;
}

.status-pending {
  background-color: #fef3c7;
  color: #b45309;
}

.status-accepted {
  background-color: #dcfce7;
  color: #166534;
}

.status-rejected {
  background-color: #fee2e2;
  color: #b91c1c;
}

.status-cancelled {
  background-color: #f1f5f9;
  color: #64748b;
}

.card-body {
  flex: 1;
  margin-bottom: 1rem;
}

.task-description {
  color: #475569;
  font-size: 0.9rem;
  margin: 0 0 0.75rem 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.task-details {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 0.75rem;
  font-size: 0.85rem;
  color: #64748b;
}

.task-details span {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.postulation-date {
  margin: 0;
  font-size: 0.8rem;
  color: #94a3b8;
}

.card-footer {
  display: flex;
  gap: 0.5rem;
  padding-top: 1rem;
  border-top: 1px solid #f1f5f9;
  flex-wrap: wrap;
}

.btn-detail {
  background-color: #3b82f6;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  flex: 1;
}

.btn-detail:hover {
  background-color: #2563eb;
}

.btn-cancel {
  background-color: #ef4444;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  flex: 1;
}

.btn-cancel:hover {
  background-color: #dc2626;
}

.btn-accept {
  background-color: #22c55e;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  flex: 1;
}

.btn-accept:hover {
  background-color: #16a34a;
}

.btn-reject {
  background-color: #ef4444;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  flex: 1;
}

.btn-reject:hover {
  background-color: #dc2626;
}
</style>