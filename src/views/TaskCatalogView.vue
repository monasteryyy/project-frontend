<template>
  <div class="catalog-wrapper">
    <header class="catalog-header">
      <div class="header-content">
        <h1>Explorar Tareas</h1>
        <p>Encuentra trabajos cortos y genera ingresos extra hoy mismo.</p>
        
        <div class="search-bar">
          <i class="pi pi-search search-icon"></i>
          <input 
            type="text" 
            placeholder="Buscar por palabra clave (ej. Jardinería, Diseño...)" 
            v-model="searchQuery"
            @input="loadTasks"
          />
          <button class="btn-search" @click="loadTasks">Buscar</button>
        </div>
      </div>
    </header>

    <div class="catalog-container">
      <aside class="filters-sidebar">
        <h3>Filtros</h3>
        
        <div class="filter-group">
          <label>Categoría</label>
          <select v-model="selectedCategory" @change="loadTasks">
            <option value="">Todas</option>
            <option value="Hogar">Hogar</option>
            <option value="Tecnología">Tecnología</option>
            <option value="Mensajería">Mensajería</option>
            <option value="Jardinería">Jardinería</option>
            <option value="Otros">Otros</option>
          </select>
        </div>

        <div class="filter-group">
          <label>Tipo de Pago</label>
          <select v-model="selectedPaymentType" @change="loadTasks">
            <option value="">Todos</option>
            <option value="HOUR">Por hora</option>
            <option value="DAY">Por día</option>
          </select>
        </div>

        <div class="filter-group">
          <label>Monto mínimo</label>
          <input 
            type="number" 
            v-model="minAmount" 
            placeholder="Ej: 10000"
            @input="loadTasks"
            class="filter-input"
          />
        </div>
      </aside>

      <main class="tasks-grid">
        <div v-if="isLoading" class="loading-state">
          <p>Cargando tareas...</p>
        </div>
        
        <div v-else-if="tasks.length === 0" class="empty-state">
          <p>No hay tareas disponibles</p>
        </div>

        <TaskCard 
          v-for="task in tasks" 
          :key="task.id"
          :id="task.id"
          :title="task.title"
          :description="task.description"
          :price="task.amount"
          :location="task.location"
          :category="task.category"
          :date="task.createdAt"
          :user-id="task.userId"
          @view-details="goToDetail"
          @delete-task="deleteTask"
        />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import TaskCard from '../components/TaskCard.vue'
import { taskService } from '../services/tasks.service'

const router = useRouter()
const isLoading = ref(false)
const tasks = ref<any[]>([])
const searchQuery = ref('')
const selectedCategory = ref('')
const selectedPaymentType = ref('')
const minAmount = ref<number | null>(null)

const loadTasks = async () => {
  isLoading.value = true
  try {
    const params: any = {}
    if (searchQuery.value) params.search = searchQuery.value
    if (selectedCategory.value) params.category = selectedCategory.value
    if (selectedPaymentType.value) params.paymentType = selectedPaymentType.value
    if (minAmount.value) params.minAmount = minAmount.value

    const response = await taskService.getAll(params)
    tasks.value = response.data
  } catch (error) {
    console.error('Error al cargar tareas:', error)
  } finally {
    isLoading.value = false
  }
}

const goToDetail = (id: number) => {
  router.push(`/tasks/${id}`)
}

const deleteTask = async (id: number) => {
  if (!confirm('¿Estás seguro de eliminar esta tarea?')) return
  
  try {
    await taskService.delete(id)
    alert('Tarea eliminada')
    await loadTasks()
  } catch (error: any) {
    alert(error.response?.data?.message || 'Error al eliminar la tarea')
  }
}

onMounted(() => {
  loadTasks()
})
</script>

<style scoped>
.catalog-wrapper {
  background-color: #f8fafc;
  min-height: 100vh;
}

.catalog-header {
  background-color: #1e293b;
  color: white;
  padding: 3rem 1rem;
  text-align: center;
}

.header-content {
  max-width: 800px;
  margin: 0 auto;
}

.header-content h1 {
  margin-top: 0;
  font-size: 2.5rem;
}

.search-bar {
  display: flex;
  margin-top: 2rem;
  background: white;
  border-radius: 8px;
  padding: 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.search-icon {
  color: #64748b;
  padding: 0.75rem;
  display: flex;
  align-items: center;
}

.search-bar input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 1rem;
  padding: 0.5rem;
}

.btn-search {
  background-color: #3b82f6;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;
}

.btn-search:hover {
  background-color: #2563eb;
}

.catalog-container {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

@media (min-width: 768px) {
  .catalog-container {
    flex-direction: row;
  }
}

.filters-sidebar {
  width: 100%;
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  height: fit-content;
}

@media (min-width: 768px) {
  .filters-sidebar {
    width: 250px;
    flex-shrink: 0;
  }
}

.filter-group {
  margin-bottom: 1.5rem;
}

.filter-group label {
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
  color: #475569;
  margin-bottom: 0.5rem;
}

.filter-group select,
.filter-input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  outline: none;
  font-size: 0.9rem;
}

.tasks-grid {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.loading-state,
.empty-state {
  grid-column: 1 / -1;
  text-align: center;
  padding: 3rem;
  color: #64748b;
}
</style>