<template>
  <div class="register-wrapper">
    <div class="register-card">
      <div class="register-header">
        <h2>Crear Cuenta</h2>
        <p>Comienza tu viaje hacia una vida más organizada.</p>
      </div>

      <form @submit.prevent="handleRegister" class="register-form">
        <BaseInput
          id="fullName"
          label="NOMBRE COMPLETO"
          type="text"
          v-model="fullName"
          placeholder="Jane Doe"
        />

        <BaseInput
          id="email"
          label="CORREO ELECTRÓNICO"
          type="email"
          v-model="email"
          placeholder="jane@example.com"
        />

        <BaseInput
          id="telephone"
          label="TELÉFONO"
          type="text"
          v-model="telephone"
          placeholder="3001234567"
        />

        <BaseInput
          id="password"
          label="CONTRASEÑA"
          type="password"
          v-model="password"
          placeholder="••••••••"
        />

        <div class="security-requirements">
          <p class="req-title">REQUISITOS DE SEGURIDAD</p>
          <div class="req-grid">
            <span :class="{'req-met': hasMinLength}">
              <i :class="hasMinLength ? 'pi pi-check-circle' : 'pi pi-circle'"></i> Mínimo 8 caracteres
            </span>
            <span :class="{'req-met': hasLetter}">
              <i :class="hasLetter ? 'pi pi-check-circle' : 'pi pi-circle'"></i> Al menos una letra
            </span>
            <span :class="{'req-met': hasNumber}">
              <i :class="hasNumber ? 'pi pi-check-circle' : 'pi pi-circle'"></i> Al menos un número
            </span>
            <span :class="{'req-met': hasSymbol}">
              <i :class="hasSymbol ? 'pi pi-check-circle' : 'pi pi-circle'"></i> Al menos un símbolo
            </span>
          </div>
        </div>

        <BaseInput
          id="confirmPassword"
          label="CONFIRMAR CONTRASEÑA"
          type="password"
          v-model="confirmPassword"
          placeholder="••••••••"
        />

        <div class="terms-container">
          <input type="checkbox" id="terms" v-model="acceptTerms" required />
          <label for="terms">Acepto los Términos y Condiciones y la Política de Privacidad.</label>
        </div>

        <BaseButton
          label="CREAR CUENTA →"
          type="submit"
          :disabled="!isFormValid"
          :loading="isLoading"
        />
      </form>

      <div class="register-footer">
        <p>¿Ya tienes una cuenta? <a href="#" @click.prevent="goToLogin">Inicia sesión</a></p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import BaseInput from '../components/BaseInput.vue'
import BaseButton from '../components/BaseButton.vue'
import { authService } from '../services/auth.service'
import { useAuthStore } from '../stores/auth.store';

const router = useRouter()

const fullName = ref('')
const email = ref('')
const telephone = ref('')
const password = ref('')
const confirmPassword = ref('')
const acceptTerms = ref(false)
const isLoading = ref(false)

const hasMinLength = computed(() => password.value.length >= 8)
const hasLetter = computed(() => /[a-zA-Z]/.test(password.value))
const hasNumber = computed(() => /\d/.test(password.value))
const hasSymbol = computed(() => /[^\w\s]|_/.test(password.value))

const isFormValid = computed(() => {
  return hasMinLength.value && 
         hasLetter.value && 
         hasNumber.value && 
         hasSymbol.value &&
         password.value === confirmPassword.value &&
         acceptTerms.value &&
         fullName.value.trim() !== '' &&
         email.value.trim() !== '' &&
         telephone.value.trim() !== ''
})

const handleRegister = async () => {
  console.log('✅ Botón de registro presionado')
  console.log('📤 Datos a enviar:', {
    name: fullName.value,
    email: email.value,
    telephone: telephone.value,
    password: password.value,
  })

  if (!isFormValid.value) {
    console.warn('⚠️ El formulario no es válido, no se puede registrar')
    return
  }

  isLoading.value = true
  try {
    const response = await authService.register({
      name: fullName.value,
      email: email.value,
      telephone: telephone.value,
      password: password.value,
      address: 'Calle 123',
    })
    
    console.log('✅ Respuesta del backend:', response.data)
    alert('¡Registro exitoso! Ahora inicia sesión.')
    router.push('/login')
  } catch (error: any) {
    console.error('❌ Error en el registro:', error)
    alert(error.response?.data?.message || 'Error al registrar usuario')
  } finally {
    isLoading.value = false
  }
}

const goToLogin = () => {
  router.push('/login')
}
</script>

<style scoped>
.register-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f3f4f6;
  padding: 2rem 1rem;
}

.register-card {
  background: white;
  padding: 2.5rem 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 480px;
}

.register-header {
  margin-bottom: 2rem;
}

.register-header h2 {
  margin: 0;
  font-size: 1.75rem;
  color: #111827;
}

.register-header p {
  margin-top: 0.5rem;
  color: #6b7280;
  font-size: 0.875rem;
}

.register-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.security-requirements {
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 1rem;
  margin-top: -0.5rem;
}

.req-title {
  font-size: 0.75rem;
  font-weight: 700;
  color: #64748b;
  margin-bottom: 0.75rem;
}

.req-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
  font-size: 0.75rem;
  color: #94a3b8;
}

.req-met {
  color: #10b981; 
}

.terms-container {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  font-size: 0.75rem;
  color: #475569;
  margin-bottom: 1rem;
}

.terms-container input {
  margin-top: 0.15rem;
}

.register-footer {
  margin-top: 1.5rem;
  text-align: center;
  font-size: 0.875rem;
  color: #4b5563;
}

.register-footer a {
  color: #3b82f6;
  font-weight: 600;
  text-decoration: none;
}
</style>