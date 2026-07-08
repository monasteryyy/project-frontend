<template>
  <div class="profile-wrapper">
    <div class="profile-container">
      <h1>Mi Perfil</h1>

      <div v-if="isLoading" class="loading-state">
        <p>Cargando perfil...</p>
      </div>

      <div v-else-if="user" class="profile-content">
        <!-- Información del usuario -->
        <div class="profile-card">
          <div class="profile-header">
            <div class="avatar">
              {{ user.name?.charAt(0) || 'U' }}
            </div>
            <div class="user-info">
              <h2>{{ user.name }}</h2>
              <p class="email">{{ user.email }}</p>
              <div class="rating">
                <span class="stars">⭐ {{ user.rating || 'N/A' }}</span>
                <span class="verified" v-if="user.verified">
                  <i class="pi pi-check-circle"></i> Verificado
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- Editar perfil -->
        <div class="profile-card">
          <h3>Editar Perfil</h3>
          <form @submit.prevent="updateProfile" class="profile-form">
            <div class="form-group">
              <label>Nombre Completo</label>
              <input type="text" v-model="editForm.name" required />
            </div>

            <div class="form-group">
              <label>Teléfono</label>
              <input type="text" v-model="editForm.telephone" required />
            </div>

            <div class="form-group">
              <label>Dirección</label>
              <input type="text" v-model="editForm.address" />
            </div>

            <button type="submit" class="btn-save" :disabled="isUpdating">
              {{ isUpdating ? 'Guardando...' : 'Guardar Cambios' }}
            </button>
          </form>
        </div>

        <!-- Cambiar contraseña -->
        <div class="profile-card">
          <h3>Cambiar Contraseña</h3>
          <form @submit.prevent="changePassword" class="profile-form">
            <div class="form-group">
              <label>Contraseña Actual</label>
              <input type="password" v-model="passwordForm.currentPassword" required />
            </div>

            <div class="form-group">
              <label>Nueva Contraseña</label>
              <input type="password" v-model="passwordForm.newPassword" required />
            </div>

            <div class="form-group">
              <label>Confirmar Nueva Contraseña</label>
              <input type="password" v-model="passwordForm.confirmPassword" required />
            </div>

            <button type="submit" class="btn-password" :disabled="isChangingPassword">
              {{ isChangingPassword ? 'Actualizando...' : 'Cambiar Contraseña' }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { userService } from '../services/users.service'
import { authService } from '../services/auth.service'

const router = useRouter()
const isLoading = ref(true)
const isUpdating = ref(false)
const isChangingPassword = ref(false)

const user = ref<any>(null)
const editForm = ref({
  name: '',
  telephone: '',
  address: ''
})

const passwordForm = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

onMounted(async () => {
  try {
    const response = await userService.getProfile()
    user.value = response.data
    editForm.value = {
      name: user.value.name || '',
      telephone: user.value.telephone || '',
      address: user.value.address || ''
    }
  } catch (error) {
    console.error('Error al cargar perfil:', error)
    router.push('/login')
  } finally {
    isLoading.value = false
  }
})

const updateProfile = async () => {
  isUpdating.value = true
  try {
    await userService.updateProfile(editForm.value)
    user.value.name = editForm.value.name
    user.value.telephone = editForm.value.telephone
    user.value.address = editForm.value.address
    
    // Actualizar localStorage
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}')
    storedUser.name = editForm.value.name
    localStorage.setItem('user', JSON.stringify(storedUser))
    
    alert('Perfil actualizado exitosamente')
  } catch (error: any) {
    alert(error.response?.data?.message || 'Error al actualizar perfil')
  } finally {
    isUpdating.value = false
  }
}

const changePassword = async () => {
  if (passwordForm.value.newPassword !== passwordForm.value.confirmPassword) {
    alert('Las contraseñas no coinciden')
    return
  }

  if (passwordForm.value.newPassword.length < 8) {
    alert('La contraseña debe tener al menos 8 caracteres')
    return
  }

  isChangingPassword.value = true
  try {
    await authService.changePassword(
      passwordForm.value.currentPassword,
      passwordForm.value.newPassword
    )
    alert('Contraseña actualizada exitosamente')
    passwordForm.value = {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    }
  } catch (error: any) {
    alert(error.response?.data?.message || 'Error al cambiar contraseña')
  } finally {
    isChangingPassword.value = false
  }
}
</script>

<style scoped>
.profile-wrapper {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.profile-container h1 {
  margin-bottom: 2rem;
  color: #1e293b;
}

.loading-state {
  text-align: center;
  padding: 4rem;
  color: #64748b;
}

.profile-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.profile-card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.profile-card h3 {
  margin: 0 0 1.5rem 0;
  color: #1e293b;
}

.profile-header {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.avatar {
  width: 80px;
  height: 80px;
  background: #3b82f6;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: bold;
}

.user-info h2 {
  margin: 0 0 0.25rem 0;
  color: #1e293b;
}

.user-info .email {
  margin: 0 0 0.5rem 0;
  color: #64748b;
}

.rating {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.verified {
  color: #22c55e;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.profile-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-weight: 600;
  color: #475569;
  margin-bottom: 0.25rem;
  font-size: 0.9rem;
}

.form-group input {
  padding: 0.75rem;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  font-size: 1rem;
  outline: none;
}

.form-group input:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.btn-save {
  background-color: #3b82f6;
  color: white;
  border: none;
  padding: 0.75rem;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-top: 0.5rem;
}

.btn-save:hover:not(:disabled) {
  background-color: #2563eb;
}

.btn-save:disabled {
  background-color: #94a3b8;
  cursor: not-allowed;
}

.btn-password {
  background-color: #22c55e;
  color: white;
  border: none;
  padding: 0.75rem;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-top: 0.5rem;
}

.btn-password:hover:not(:disabled) {
  background-color: #16a34a;
}

.btn-password:disabled {
  background-color: #94a3b8;
  cursor: not-allowed;
}
</style>