<template>
  <div class="detail-wrapper">
    <div class="detail-container">
      
      <button class="btn-back">
        <i class="pi pi-arrow-left"></i> Volver al catálogo
      </button>

      <div class="content-grid">
        
        <main class="task-info-card">
          <div class="task-header">
            <div class="tags">
              <span class="tag-category">{{ task.category }}</span>
              <span class="tag-payment">{{ task.paymentType }}</span>
            </div>
            <h1 class="task-title">{{ task.title }}</h1>
            <p class="task-date">Publicado el {{ task.publishDate }}</p>
          </div>

          <div class="task-body">
            <h3>Descripción de la tarea</h3>
            <p>{{ task.description }}</p>

            <div class="task-requirements">
              <h3>Detalles Adicionales</h3>
              <ul>
                <li><i class="pi pi-map-marker"></i> <strong>Ubicación:</strong> {{ task.location }}</li>
                <li><i class="pi pi-calendar"></i> <strong>Fecha requerida:</strong> {{ task.requiredDate }}</li>
                <li><i class="pi pi-clock"></i> <strong>Duración estimada:</strong> {{ task.estimatedDuration }}</li>
              </ul>
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
              :disabled="hasApplied"
            >
              {{ hasApplied ? 'Te has postulado' : 'Postularme a esta tarea' }}
            </button>
          </div>
        </main>

        <aside class="employer-card">
          <h3>Acerca del Empleador</h3>
          
          <div class="employer-profile">
            <div class="avatar">{{ employer.initials }}</div>
            <div class="employer-name">
              <h4>{{ employer.name }}</h4>
              <RatingStars :rating="employer.rating" :readonly="true" :showLabel="true" />
            </div>
          </div>

          <div class="employer-contact">
            <h4>Información de Contacto</h4>
            
            <div v-if="isAccepted" class="contact-info revealed">
              <p><i class="pi pi-envelope"></i> {{ employer.email }}</p>
              <p><i class="pi pi-phone"></i> {{ employer.phone }}</p>
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
import { ref } from 'vue'
import RatingStars from '../components/RatingStars.vue'


const task = ref({
  id: 1,
  title: 'Pasear a mis dos perros',
  category: 'Hogar',
  paymentType: 'Por hora',
  publishDate: '12 Octubre 2023',
  description: 'Busco a una persona responsable, que le gusten los animales, para pasear a mis dos Golden Retrievers (Max y Luna) por el parque principal de la ciudad. Son perros muy dóciles, pero tienen mucha energía, así que requieren a alguien con buena condición física. Solo se necesita correa, yo proveo las bolsas para desechos.',
  location: 'Zona Norte, Parque Central',
  requiredDate: 'Sábados y Domingos en la mañana',
  estimatedDuration: '2 horas',
  amount: '15.000'
})

const employer = ref({
  name: 'Carlos Gómez',
  initials: 'CG',
  rating: 4.5,
  email: 'carlos.gomez@example.com',
  phone: '+57 320 000 0000'
})


const hasApplied = ref(false)

// ¡Cambia este valor a 'true' para ver cómo se revela el contacto!
const isAccepted = ref(false) 

const applyForTask = () => {
  hasApplied.value = true
  alert('¡Te has postulado a esta tarea exitosamente!')
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

/* --- Tarea (Izquierda) --- */
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

/* --- Empleador (Derecha) --- */
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