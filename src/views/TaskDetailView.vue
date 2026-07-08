<template>
  <div class="detail-wrapper">
    <div class="detail-container">
      <button class="btn-back" @click="goBack">
        <i class="pi pi-arrow-left"></i> Volver al catálogo
      </button>

      <div v-if="isLoading" class="loading-container">
        <p>Cargando tarea...</p>
      </div>

      <div v-else class="content-grid">
        <main class="task-info-card">
          <div class="task-header">
            <div class="tags">
              <span class="tag-category">{{ task.category }}</span>
              <span class="tag-payment">{{ task.paymentType }}</span>
            </div>
            <h1 class="task-title">{{ task.title }}</h1>
            <p class="task-date">Publicado el {{ formatDate(task.createdAt) }}</p>
          </div>

          <div class="task-body">
            <h3>Descripción de la tarea</h3>
            <p>{{ task.description }}</p>

            <div class="task-requirements">
              <h3>Detalles Adicionales</h3>
              <ul>
                <li><i class="pi pi-map-marker"></i> <strong>Ubicación:</strong> {{ task.location }}</li>
                <li><i class="pi pi-tag"></i> <strong>Estado:</strong> {{ task.status || 'Creada' }}</li>
              </ul>
            </div>

            <div class="status-section" v-if="isOwner">
              <h3>Cambiar Estado</h3>
              <div class="status-buttons">
                <button 
                  v-for="status in availableStatuses" 
                  :key="status"
                  class="status-btn"
                  :class="getStatusClass(status)"
                  :disabled="task.status === status || isUpdating"
                  @click="changeStatus(status)"
                >
                  {{ status }}
                </button>
              </div>
            </div>

            <div class="history-section" v-if="history.length > 0">
              <h3>Historial de Cambios</h3>
              <div class="history-list">
                <div v-for="entry in history" :key="entry.id" class="history-item">
                  <span class="history-status old">{{ entry.oldStatus }}</span>
                  <i class="pi pi-arrow-right"></i>
                  <span class="history-status new">{{ entry.newStatus }}</span>
                  <span class="history-date">{{ formatDate(entry.changedAt) }}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="task-footer">
            <div class="price-section">
              <span class="price-label">Pago ofrecido:</span>
              <span class="price-amount">${{ task.amount }}</span>
            </div>
            <button 
              class="btn-apply" 
              :class="{ 'is-applied': hasApplied }"
              @click="applyForTask"
              :disabled="hasApplied || isApplying || task.userId === currentUser.id"
            >
              {{ isApplying ? 'Postulando...' : hasApplied ? 'Te has postulado' : 'Postularme a esta tarea' }}
            </button>
          </div>
        </main>

        <aside class="employer-card">
          <h3>Acerca del Empleador</h3>
          
          <div class="employer-profile">
            <div class="avatar">{{ task.user?.name?.charAt(0) || 'E' }}</div>
            <div class="employer-name">
              <h4>{{ task.user?.name || 'Empleador' }}</h4>
              <RatingStars :rating="4.5" :readonly="true" :showLabel="true" />
            </div>
          </div>

          <div class="employer-contact">
            <h4>Información de Contacto</h4>
            
            <div v-if="isAccepted" class="contact-info revealed">
              <p><i class="pi pi-envelope"></i> {{ task.user?.email || 'No disponible' }}</p>
              <p><i class="pi pi-phone"></i> {{ task.user?.telephone || 'No disponible' }}</p>
            </div>
            
            <div v-else class="contact-info hidden-info">
              <i class="pi pi-lock lock-icon"></i>
              <p>El correo y teléfono están ocultos por privacidad.</p>
              <span>Se revelarán únicamente si el empleador acepta tu postulación.</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import RatingStars from '../components/RatingStars.vue'
import { taskService } from '../services/tasks.service'
import { postulationService } from '../services/postulations.service'

const route = useRoute()
const router = useRouter()

const isLoading = ref(true)
const isUpdating = ref(false)
const isApplying = ref(false)
const history = ref<any[]>([])

const task = ref({
  id: 0,
  title: '',
  category: '',
  paymentType: '',
  createdAt: '',
  description: '',
  location: '',
  amount: 0,
  status: '',
  userId: 0,
  user: {
    name: '',
    email: '',
    telephone: ''
  }
})

const hasApplied = ref(false)
const isAccepted = ref(false)
const availableStatuses = ['Creada', 'En Progreso', 'Finalizada', 'Cancelada']

const currentUser = JSON.parse(localStorage.getItem('user') || '{}')
const isOwner = computed(() => task.value.userId === currentUser.id)

const applyForTask = async () => {
  if (!currentUser.id) {
    alert('Debes iniciar sesión para postularte')
    router.push('/login')
    return
  }

  if (hasApplied.value) {
    alert('Ya te has postulado a esta tarea')
    return
  }

  if (!confirm('¿Quieres postularte a esta tarea?')) return

  isApplying.value = true
  try {
    await postulationService.create({
      taskId: task.value.id,
      userId: currentUser.id,
    })
    hasApplied.value = true
    alert('¡Te has postulado exitosamente!')
  } catch (error: any) {
    console.error('Error al postularse:', error)
    alert(error.response?.data?.message || 'Error al postularse a la tarea')
  } finally {
    isApplying.value = false
  }
}

onMounted(async () => {
  const id = Number(route.params.id)
  if (!id) {
    router.push('/tasks')
    return
  }

  try {
    const response = await taskService.getOne(id)
    task.value = response.data

    // Verificar si el usuario tiene una postulación aceptada
    if (currentUser.id) {
      const postulations = await postulationService.getByTask(id)
      const userPostulation = postulations.data.find(
        (p: any) => p.userId === currentUser.id
      )
      if (userPostulation) {
        hasApplied.value = true
        if (userPostulation.status === 'aceptada') {
          isAccepted.value = true
        }
      }
    }

    const historyResponse = await taskService.getHistory(id)
    history.value = historyResponse.data
  } catch (error) {
    console.error('Error al cargar tarea:', error)
    router.push('/tasks')
  } finally {
    isLoading.value = false
  }
})

const goBack = () => {
  router.push('/tasks')
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

const changeStatus = async (newStatus: string) => {
  if (!confirm(`¿Cambiar estado de "${task.value.status}" a "${newStatus}"?`)) return

  isUpdating.value = true
  try {
    await taskService.updateStatus(task.value.id, newStatus)
    task.value.status = newStatus

    const historyResponse = await taskService.getHistory(task.value.id)
    history.value = historyResponse.data

    alert('Estado actualizado correctamente')
  } catch (error: any) {
    console.error('Error al cambiar estado:', error)
    alert(error.response?.data?.message || 'Error al cambiar el estado')
  } finally {
    isUpdating.value = false
  }
}

const getStatusClass = (status: string) => {
  const classes: Record<string, string> = {
    'Creada': 'status-published',
    'En Progreso': 'status-progress',
    'Finalizada': 'status-finished',
    'Cancelada': 'status-cancelled'
  }
  return classes[status] || ''
}
</script>

<style scoped>
.detail-wrapper {
  background-color: #f8fafc;
  min-height: 100vh;
  padding: 2rem 1rem;
}

.detail-container {
  max-width: 1000px;
  margin: 0 auto;
}

.btn-back {
  background: none;
  border: none;
  color: #64748b;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  padding: 0;
  transition: color 0.2s;
}

.btn-back:hover {
  color: #1e293b;
}

.loading-container {
  text-align: center;
  padding: 4rem;
  color: #64748b;
}

.content-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  align-items: start;
}

@media (min-width: 800px) {
  .content-grid {
    grid-template-columns: 2fr 1fr;
  }
}

.task-info-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  padding: 2rem;
}

.tags {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.tag-category {
  background-color: #e0e7ff;
  color: #3730a3;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
}

.tag-payment {
  background-color: #f1f5f9;
  color: #475569;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
}

.task-title {
  margin: 0 0 0.5rem 0;
  font-size: 2rem;
  color: #0f172a;
}

.task-date {
  color: #94a3b8;
  font-size: 0.875rem;
  margin: 0 0 2rem 0;
}

.task-body h3 {
  color: #1e293b;
  margin-bottom: 1rem;
}

.task-body p {
  color: #475569;
  line-height: 1.6;
  margin-bottom: 2rem;
}

.task-requirements ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.task-requirements li {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #475569;
}

.task-requirements i {
  color: #3b82f6;
  font-size: 1.25rem;
}

.status-section {
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e2e8f0;
}

.status-section h3 {
  margin-bottom: 0.75rem;
  color: #1e293b;
}

.status-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.status-btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 0.875rem;
}

.status-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.status-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.status-published {
  background-color: #e0e7ff;
  color: #3730a3;
}

.status-published:hover:not(:disabled) {
  background-color: #c7d2fe;
}

.status-progress {
  background-color: #fef3c7;
  color: #b45309;
}

.status-progress:hover:not(:disabled) {
  background-color: #fde68a;
}

.status-finished {
  background-color: #dcfce7;
  color: #166534;
}

.status-finished:hover:not(:disabled) {
  background-color: #bbf7d0;
}

.status-cancelled {
  background-color: #fee2e2;
  color: #b91c1c;
}

.status-cancelled:hover:not(:disabled) {
  background-color: #fecaca;
}

.history-section {
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e2e8f0;
}

.history-section h3 {
  margin-bottom: 0.75rem;
  color: #1e293b;
}

.history-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.history-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 0.75rem;
  background-color: #f8fafc;
  border-radius: 6px;
  font-size: 0.875rem;
}

.history-status {
  padding: 0.15rem 0.5rem;
  border-radius: 4px;
  font-weight: 600;
  font-size: 0.75rem;
}

.history-status.old {
  background-color: #f1f5f9;
  color: #64748b;
}

.history-status.new {
  background-color: #dcfce7;
  color: #166534;
}

.history-date {
  margin-left: auto;
  color: #94a3b8;
  font-size: 0.75rem;
}

.task-footer {
  margin-top: 2.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

@media (min-width: 600px) {
  .task-footer {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
}

.price-section {
  display: flex;
  flex-direction: column;
}

.price-label {
  font-size: 0.875rem;
  color: #64748b;
  font-weight: 600;
  text-transform: uppercase;
}

.price-amount {
  font-size: 2rem;
  font-weight: bold;
  color: #16a34a;
}

.btn-apply {
  background-color: #3b82f6;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-apply:hover:not(:disabled) {
  background-color: #2563eb;
  transform: translateY(-2px);
}

.btn-apply.is-applied {
  background-color: #cbd5e1;
  color: #475569;
  cursor: not-allowed;
}

.employer-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  padding: 1.5rem;
}

.employer-card h3 {
  margin-top: 0;
  margin-bottom: 1.5rem;
  color: #0f172a;
  border-bottom: 1px solid #e2e8f0;
  padding-bottom: 0.75rem;
}

.employer-profile {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.avatar {
  width: 60px;
  height: 60px;
  background-color: #f1f5f9;
  color: #475569;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
}

.employer-name h4 {
  margin: 0 0 0.25rem 0;
  font-size: 1.125rem;
  color: #1e293b;
}

.employer-contact h4 {
  font-size: 0.875rem;
  color: #64748b;
  text-transform: uppercase;
  margin-bottom: 1rem;
}

.revealed p {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #334155;
  margin: 0.5rem 0;
  font-weight: 500;
}

.hidden-info {
  background-color: #f8fafc;
  border: 1px dashed #cbd5e1;
  border-radius: 8px;
  padding: 1.5rem 1rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.lock-icon {
  font-size: 1.5rem;
  color: #94a3b8;
  margin-bottom: 0.5rem;
}

.hidden-info p {
  margin: 0;
  font-weight: 600;
  color: #475569;
  font-size: 0.9rem;
}

.hidden-info span {
  font-size: 0.8rem;
  color: #94a3b8;
}
</style>