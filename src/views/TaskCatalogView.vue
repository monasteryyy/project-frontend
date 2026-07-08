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
          />
          <button class="btn-search">Buscar</button>
        </div>
      </div>
    </header>

    <div class="catalog-container">
      <aside class="filters-sidebar">
        <h3>Filtros</h3>
        
        <div class="filter-group">
          <label>Categoría</label>
          <select v-model="selectedCategory">
            <option value="">Todas</option>
            <option value="Hogar">Hogar</option>
            <option value="Tecnología">Tecnología</option>
            <option value="Mensajería">Mensajería</option>
          </select>
        </div>

        <div class="filter-group">
          <label>Tipo de Pago</label>
          <select v-model="selectedPaymentType">
            <option value="">Todos</option>
            <option value="Por hora">Por hora</option>
            <option value="Por día">Por día</option>
            <option value="Fijo">Fijo</option>
          </select>
        </div>
      </aside>

      <main class="tasks-grid">
        <div v-for="task in filteredTasks" :key="task.id" class="task-card">
          <div class="task-card-header">
            <span class="category-tag">{{ task.category }}</span>
            <span class="price">${{ task.price }} <span>{{ task.paymentType }}</span></span>
          </div>
          
          <h3 class="task-title">{{ task.title }}</h3>
          <p class="task-description">{{ task.description }}</p>
          
          <div class="task-meta">
            <span><i class="pi pi-map-marker"></i> {{ task.location }}</span>
            <span><i class="pi pi-calendar"></i> {{ task.date }}</span>
          </div>
          
          <button class="btn-apply">Ver Detalles</button>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'


const searchQuery = ref('')
const selectedCategory = ref('')
const selectedPaymentType = ref('')

const tasks = ref([
  {
    id: 1,
    title: 'Pasear a mis dos perros',
    description: 'Necesito a alguien responsable para pasear a dos Golden Retrievers por el parque central.',
    category: 'Hogar',
    price: '15.000',
    paymentType: 'Por hora',
    location: 'Norte',
    date: 'Hoy'
  },
  {
    id: 2,
    title: 'Formatear e instalar Windows',
    description: 'Mi computador está muy lento. Necesito respaldo de datos, formateo e instalación de Windows 11.',
    category: 'Tecnología',
    price: '80.000',
    paymentType: 'Fijo',
    location: 'Centro',
    date: 'Mañana'
  },
  {
    id: 3,
    title: 'Entregar paquete urgente',
    description: 'Llevar unos documentos importantes desde la oficina en el sur hasta la notaría.',
    category: 'Mensajería',
    price: '30.000',
    paymentType: 'Fijo',
    location: 'Sur',
    date: 'Hoy'
  },
  {
    id: 4,
    title: 'Ayuda con trasteo pequeño',
    description: 'Ayuda para cargar un par de muebles y cajas a un camión. Trabajo pesado pero rápido.',
    category: 'Hogar',
    price: '60.000',
    paymentType: 'Por día',
    location: 'Occidente',
    date: 'Próximo sábado'
  }
])


const filteredTasks = computed(() => {
  return tasks.value.filter(task => {
    const matchSearch = task.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchCategory = selectedCategory.value === '' || task.category === selectedCategory.value
    const matchPayment = selectedPaymentType.value === '' || task.paymentType === selectedPaymentType.value
    
    return matchSearch && matchCategory && matchPayment
  })
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

.filter-group select {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  outline: none;
}

.tasks-grid {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.task-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  transition: transform 0.2s, box-shadow 0.2s;
}

.task-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.task-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.category-tag {
  background-color: #e0e7ff;
  color: #3730a3;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
}

.price {
  font-weight: bold;
  font-size: 1.25rem;
  color: #16a34a;
}

.price span {
  font-size: 0.875rem;
  color: #64748b;
  font-weight: normal;
}

.task-title {
  margin: 0 0 0.75rem 0;
  font-size: 1.125rem;
  color: #1e293b;
}

.task-description {
  color: #475569;
  font-size: 0.875rem;
  line-height: 1.5;
  margin-bottom: 1.5rem;
  flex: 1;
}

.task-meta {
  display: flex;
  gap: 1rem;
  color: #64748b;
  font-size: 0.875rem;
  margin-bottom: 1.5rem;
  border-top: 1px solid #f1f5f9;
  padding-top: 1rem;
}

.task-meta span {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.btn-apply {
  width: 100%;
  background-color: #f1f5f9;
  color: #3b82f6;
  border: 1px solid transparent;
  padding: 0.75rem;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-apply:hover {
  background-color: #3b82f6;
  color: white;
}
</style>