<template>
  <div class="task-filter-card">
    <div class="filter-header">
      <h3><i class="pi pi-filter"></i> Filtros de Búsqueda</h3>
      <button class="clear-btn" @click="clearFilters">Limpiar</button>
    </div>

    <div class="filters-grid">

      <div class="filter-group">
        <label>Categoría</label>
        <select v-model="filters.category" class="custom-select">
          <option value="">Todas las categorías</option>
          <option value="limpieza">Limpieza</option>
          <option value="jardineria">Jardinería</option>
          <option value="tecnologia">Tecnología</option>
          <option value="reparaciones">Reparaciones</option>
        </select>
      </div>


      <BaseInput 
        id="location"
        label="Ubicación"
        v-model="filters.location"
        placeholder="Ej: Bogotá"
      />


      <BaseInput 
        id="minPay"
        type="number"
        label="Pago Mínimo ($)"
        v-model="filters.minPay"
        placeholder="0"
      />


      <BaseInput 
        id="date"
        type="date"
        label="Publicado desde"
        v-model="filters.date"
      />
    </div>

    <div class="filter-actions">
      <BaseButton 
        label="Aplicar Filtros" 
        @click="$emit('apply-filters', filters)" 
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BaseInput from './BaseInput.vue'
import BaseButton from './BaseButton.vue'


const filters = ref({
  category: '',
  location: '',
  minPay: '',
  date: ''
})

const emit = defineEmits(['apply-filters'])

const clearFilters = () => {
  filters.value = {
    category: '',
    location: '',
    minPay: '',
    date: ''
  }

  emit('apply-filters', filters.value)
}
</script>

<style scoped>
.task-filter-card {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  border: 1px solid #e2e8f0;
}

.filter-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.filter-header h3 {
  margin: 0;
  font-size: 1.125rem;
  color: #1e293b;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.clear-btn {
  background: none;
  border: none;
  color: #3b82f6;
  font-size: 0.875rem;
  cursor: pointer;
  font-weight: 500;
}

.clear-btn:hover {
  text-decoration: underline;
}

.filters-grid {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.filter-group label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
}

.custom-select {
  width: 100%;
  padding: 0.75rem;
  border-radius: 6px;
  border: 1px solid #d1d5db;
  font-family: inherit;
  font-size: 1rem;
  color: #1f2937;
  background-color: white;
}

.custom-select:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
}

.filter-actions {
  margin-top: 1rem;
}
</style>