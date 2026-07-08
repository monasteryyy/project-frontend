<template>
  <div class="task-card">
    <div class="task-header">
      <span class="category-badge">{{ category }}</span>
      <span class="price-tag">${{ price }}</span>
    </div>
    
    <h3 class="task-title">{{ title }}</h3>
    <p class="task-location">
      <i class="pi pi-map-marker"></i> {{ location }}
    </p>
    
    <p class="task-description">{{ description }}</p>
    
    <div class="task-footer">
      <span class="date-info"><i class="pi pi-calendar"></i> {{ formatDate(date) }}</span>
      <div class="task-actions">
        <BaseButton 
          label="Ver Detalles" 
          severity="info" 
          @click="$emit('view-details', id)" 
        />
        <BaseButton 
          v-if="isOwner"
          label="Eliminar" 
          severity="danger" 
          @click="$emit('delete-task', id)" 
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import BaseButton from './BaseButton.vue'

const props = defineProps<{
  id: number
  title: string
  description: string
  price: number
  location: string
  category: string
  date: string
  userId: number
}>()

defineEmits<{
  (e: 'view-details', id: number): void
  (e: 'delete-task', id: number): void
}>()

const currentUser = JSON.parse(localStorage.getItem('user') || '{}')

const isOwner = computed(() => {
  return props.userId === currentUser.id
})

const formatDate = (date: string) => {
  if (!date) return 'Fecha no disponible'
  return new Date(date).toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}
</script>

<style scoped>
.task-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  border: 1px solid #e2e8f0;
  transition: transform 0.2s, box-shadow 0.2s;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.task-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
}

.task-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.category-badge {
  background-color: #dbeafe;
  color: #1e40af;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
}

.price-tag {
  font-weight: bold;
  color: #16a34a;
  font-size: 1.125rem;
}

.task-title {
  margin: 0;
  font-size: 1.25rem;
  color: #1e293b;
}

.task-location {
  margin: 0;
  font-size: 0.875rem;
  color: #64748b;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.task-description {
  margin: 0;
  font-size: 0.875rem;
  color: #475569;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.task-footer {
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px solid #f1f5f9;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.task-actions {
  display: flex;
  gap: 0.5rem;
}

.date-info {
  font-size: 0.75rem;
  color: #94a3b8;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}
</style>