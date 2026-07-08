<template>
  <div class="profile-wrapper">
    <div class="profile-container">
      
      <div class="profile-header">
        <div class="avatar">
          <span>JD</span>
        </div>
        
        <div class="header-info">
          <div class="name-and-rating">
            <h2>{{ user.fullName }}</h2>
            <RatingStars :rating="user.rating" :readonly="true" :showLabel="true" />
          </div>
          
          <div class="roles-container">
            <span 
              v-for="role in user.roles" 
              :key="role" 
              class="role-badge"
              :class="role.toLowerCase()"
            >
              {{ role }}
            </span>
          </div>
        </div>
      </div>

      <div class="profile-content">
        <div class="card">
          <h3>Información Personal</h3>
          <div class="info-grid">
            <div class="info-group">
              <label>Correo Electrónico</label>
              <p>{{ user.email }}</p>
            </div>
            <div class="info-group">
              <label>Teléfono</label>
              <p>{{ user.phone }}</p>
            </div>
            <div class="info-group">
              <label>Miembro desde</label>
              <p>{{ user.joinDate }}</p>
            </div>
          </div>
          <div class="card-actions">
            <BaseButton label="Editar Perfil" severity="secondary" />
          </div>
        </div>

        <div class="card verification-card" :class="{'is-verified': isVerified}">
          <h3>Estado de la Cuenta</h3>
          
          <div v-if="isVerified" class="verified-state">
            <i class="pi pi-check-circle verified-icon"></i>
            <div>
              <h4>¡Cuenta Verificada!</h4>
              <p>Ya puedes publicar tareas y postularte a trabajos.</p>
            </div>
          </div>

          <div v-else class="unverified-state">
            <div class="alert-box">
              <i class="pi pi-exclamation-triangle"></i>
              <span>Tu cuenta no está verificada. No podrás publicar ni postularte a tareas .</span>
            </div>

            <div v-if="!codeSent" class="verification-step">
              <p>Te enviaremos un código de 6 dígitos a tu correo: <strong>{{ user.email }}</strong></p>
              <BaseButton 
                label="Enviar código de verificación" 
                @click="sendVerificationCode" 
                :loading="isLoading"
              />
            </div>

            <div v-else class="verification-step">
              <p>Ingresa el código que enviamos a tu correo.</p>
              <BaseInput 
                id="verificationCode"
                type="text"
                v-model="verificationCode"
                placeholder="Ej: 123456"
              />
              <div class="action-buttons">
                <BaseButton 
                  label="Verificar Cuenta" 
                  @click="verifyAccount" 
                  :disabled="verificationCode.length < 6"
                  :loading="isLoading"
                />
                <BaseButton 
                  label="Reenviar código" 
                  severity="secondary" 
                  @click="sendVerificationCode" 
                />
              </div>
            </div>
          </div>
        </div> 
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BaseButton from '../components/BaseButton.vue'
import BaseInput from '../components/BaseInput.vue'

import RatingStars from '../components/RatingStars.vue'


const user = ref({
  fullName: 'Jane Doe',
  email: 'jane@example.com',
  phone: '+57 300 123 4567',

  roles: ['Trabajador', 'Empleador'],

  rating: 4.5,
  joinDate: 'Octubre 2023'
})


const isVerified = ref(false)
const codeSent = ref(false)
const verificationCode = ref('')
const isLoading = ref(false)

const sendVerificationCode = () => {
  isLoading.value = true
  setTimeout(() => {
    isLoading.value = false
    codeSent.value = true
  }, 1200)
}

const verifyAccount = () => {
  isLoading.value = true
  setTimeout(() => {
    isLoading.value = false
    if (verificationCode.value === '123456') {
      isVerified.value = true
    }
  }, 1500)
}
</script>

<style scoped>
.profile-wrapper {
  padding: 2rem 1rem;
  background-color: #f8fafc;
  min-height: 100vh;
  display: flex;
  justify-content: center;
}

.profile-container {
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* Cabecera */
.profile-header {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.avatar {
  width: 80px;
  height: 80px;
  background-color: #3b82f6;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: bold;
}

/* Nuevos estilos para Nombre, Rating y Badges */
.name-and-rating {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.5rem;
}

.name-and-rating h2 {
  margin: 0;
  color: #1e293b;
}

.roles-container {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.role-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  /* Color por defecto (gris) */
  background-color: #f1f5f9;
  color: #475569;
}

/* Colores específicos según el rol (si coincide con la clase) */
.role-badge.trabajador {
  background-color: #dcfce7; /* Verde clarito */
  color: #166534; /* Texto verde oscuro */
}

.role-badge.empleador {
  background-color: #e0e7ff; /* Azul clarito */
  color: #3730a3; /* Texto azul oscuro */
}

/* Grid de contenido */
.profile-content {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

@media (min-width: 768px) {
  .profile-content {
    grid-template-columns: 1fr 1fr;
  }
}

.card {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.card h3 {
  margin-top: 0;
  border-bottom: 1px solid #e2e8f0;
  padding-bottom: 0.75rem;
  color: #0f172a;
}

.info-grid {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.info-group label {
  font-size: 0.75rem;
  font-weight: 600;
  color: #64748b;
  text-transform: uppercase;
}

.info-group p {
  margin: 0.25rem 0 0 0;
  color: #334155;
  font-weight: 500;
}

.card-actions {
  margin-top: 1rem;
}

/* Estilos de Verificación (RF_9) */
.alert-box {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #fef2f2;
  color: #b91c1c;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  font-size: 0.875rem;
}

.verification-step p {
  font-size: 0.875rem;
  color: #475569;
  margin-bottom: 1rem;
}

.action-buttons {
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
}

.verified-state {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  background-color: #f0fdf4;
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid #bbf7d0;
}

.verified-icon {
  font-size: 2rem;
  color: #22c55e;
}

.verified-state h4 {
  margin: 0 0 0.25rem 0;
  color: #166534;
}

.verified-state p {
  margin: 0;
  font-size: 0.875rem;
  color: #15803d;
}
</style>