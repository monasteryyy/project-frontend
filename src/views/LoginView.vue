<template>
  <div class="login-wrapper">
    <div class="login-card">
      <div class="login-header">
        <h2>Iniciar Sesión</h2>
        <p>Bienvenido de vuelta. Ingresa tus credenciales.</p>
      </div>

      <form @submit.prevent="handleLogin" class="login-form">
        
        <BaseInput
          id="email"
          label="Correo Electrónico"
          type="email"
          v-model="email"
          placeholder="tu@correo.com"
        />

        <BaseInput
          id="password"
          label="Contraseña"
          type="password"
          v-model="password"
          placeholder="••••••••"
        />

        <div class="forgot-password">
          <a href="#">¿Olvidaste tu contraseña?</a>
        </div>

        <BaseButton
          label="Entrar"
          type="submit"
          :loading="isLoading"
        />
      </form>

      <div class="login-footer">
        <p>¿No tienes una cuenta? <a href="#" @click.prevent="goToRegister">Regístrate aquí</a></p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import BaseInput from '../components/BaseInput.vue'
import BaseButton from '../components/BaseButton.vue'

const email = ref('')
const password = ref('')
const isLoading = ref(false)


const handleLogin = () => {
  isLoading.value = true
  

  setTimeout(() => {
    console.log('Datos listos para enviar al backend:', { 
      email: email.value, 
      password: password.value 
    })
    
    alert('¡Maquetación del Login lista! (Acá Eduin conectará el token JWT)')
    isLoading.value = false
    

  }, 1500)
}


const goToRegister = () => {
  alert('Navegar a la vista de Registro')

}
</script>

<style scoped>

.login-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f3f4f6; 
  padding: 1rem;
}

.login-card {
  background: white;
  padding: 2.5rem 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  width: 100%;
  max-width: 400px;
}

.login-header {
  text-align: center;
  margin-bottom: 2rem;
}

.login-header h2 {
  margin: 0;
  font-size: 1.75rem;
  color: #111827;
}

.login-header p {
  margin-top: 0.5rem;
  color: #6b7280;
  font-size: 0.875rem;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.forgot-password {
  text-align: right;
  margin-top: -0.5rem;
  margin-bottom: 0.5rem;
}

.forgot-password a {
  font-size: 0.75rem;
  color: #3b82f6;
  text-decoration: none;
}

.forgot-password a:hover {
  text-decoration: underline;
}

.login-footer {
  margin-top: 1.5rem;
  text-align: center;
  font-size: 0.875rem;
  color: #4b5563;
}

.login-footer a {
  color: #3b82f6;
  font-weight: 600;
  text-decoration: none;
}

.login-footer a:hover {
  text-decoration: underline;
}
</style>