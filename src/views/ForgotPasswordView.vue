<template>
  <div class="auth-wrapper">
    <div class="auth-card">
      <div class="brand">
        <span class="brand-free">Free</span><span class="brand-time">Time</span>
      </div>

      <div class="auth-header">
        <h2>¿Olvidaste tu contraseña?</h2>
        <p>Introduce tu correo electrónico y te enviaremos un enlace para que puedas restablecerla.</p>
      </div>

      <form @submit.prevent="handleRecovery" class="auth-form">
        <div class="form-group">
          <label for="email">Correo Electrónico</label>
          <div class="input-icon-wrapper">
            <i class="pi pi-envelope input-icon"></i>
            <input 
              type="email" 
              id="email" 
              v-model="email" 
              required 
              placeholder="correo@ejemplo.com" 
            />
          </div>
        </div>

        <button type="submit" class="btn-submit" :disabled="isSending">
          {{ isSending ? 'Enviando...' : 'Enviar enlace de recuperación' }}
        </button>
      </form>

      <div class="auth-footer">
        <a href="#" class="back-to-login">
          <i class="pi pi-arrow-left"></i> Volver al inicio de sesión
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const email = ref('')
const isSending = ref(false)

const handleRecovery = () => {
  isSending.value = true
  

  setTimeout(() => {
    alert(`Se ha enviado un enlace de recuperación a: ${email.value}`)
    isSending.value = false
    email.value = ''
  }, 1500)
}
</script>

<style scoped>
.auth-wrapper {
  background-color: #f8fafc;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
}

.auth-card {
  background: white;
  width: 100%;
  max-width: 450px;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  padding: 2.5rem;
}

.brand {
  text-align: center;
  font-size: 1.75rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
}

.brand-free { color: #2563eb; }
.brand-time { color: #10b981; }

.auth-header {
  text-align: center;
  margin-bottom: 2rem;
}

.auth-header h2 {
  margin: 0 0 0.5rem 0;
  color: #1e293b;
  font-size: 1.5rem;
}

.auth-header p {
  margin: 0;
  color: #64748b;
  font-size: 0.9rem;
  line-height: 1.4;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-weight: 600;
  color: #475569;
  font-size: 0.875rem;
}

.input-icon-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 1rem;
  color: #94a3b8;
}

.form-group input {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  transition: all 0.2s;
}

.form-group input:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.btn-submit {
  background-color: #2563eb;
  color: white;
  font-weight: 600;
  padding: 0.75rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-top: 0.5rem;
}

.btn-submit:hover:not(:disabled) {
  background-color: #1d4ed8;
}

.btn-submit:disabled {
  background-color: #94a3b8;
  cursor: not-allowed;
}

.auth-footer {
  margin-top: 2rem;
  text-align: center;
  border-top: 1px solid #e2e8f0;
  padding-top: 1.25rem;
}

.back-to-login {
  color: #64748b;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: color 0.2s;
}

.back-to-login:hover {
  color: #1e293b;
}
</style>