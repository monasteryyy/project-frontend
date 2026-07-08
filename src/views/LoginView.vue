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
import { useRouter } from 'vue-router'
import BaseInput from '../components/BaseInput.vue'
import BaseButton from '../components/BaseButton.vue'
import { authService } from '../services/auth.service'
import { useAuthStore } from '../stores/auth.store'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const isLoading = ref(false)

const handleLogin = async () => {
  console.log('✅ Botón de login presionado')
  console.log('📤 Datos:', { email: email.value, password: password.value })

  isLoading.value = true
  try {
    const response = await authService.login(email.value, password.value)
    console.log('✅ Respuesta del backend:', response.data)
    
    const { token, user } = response.data
    
    // Usar el store en lugar de localStorage directamente
    authStore.setAuth({ token, user })
    
    console.log('✅ Token guardado en store')
    
    router.push('/dashboard')
  } catch (error: any) {
    console.error('❌ Error en login:', error)
    alert(error.response?.data?.message || 'Error al iniciar sesión')
  } finally {
    isLoading.value = false
  }
}

const goToRegister = () => {
  router.push('/register')
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
</style>