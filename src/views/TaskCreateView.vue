<template>
  <div class="create-wrapper">
    <div class="form-container">
      <div class="form-header">
        <h1>Publicar Nueva Tarea</h1>
        <p>Completa este breve formulario (máximo 6 campos) para encontrar ayuda rápidamente.</p>
      </div>

      <form @submit.prevent="submitTask" class="task-form">
        <div class="form-group">
          <label for="title">Título de la tarea <span class="required">*</span></label>
          <input 
            type="text" 
            id="title" 
            v-model="form.title" 
            required 
            placeholder="Ej: Pasear a mi perro" 
          />
        </div>

        <div class="form-group">
          <label for="category">Categoría <span class="required">*</span></label>
          <select id="category" v-model="form.category" required>
            <option value="" disabled>Selecciona una categoría</option>
            <option value="Hogar">Hogar</option>
            <option value="Tecnología">Tecnología</option>
            <option value="Mensajería">Mensajería</option>
            <option value="Jardinería">Jardinería</option>
            <option value="Otros">Otros</option>
          </select>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="paymentType">Tipo de remuneración <span class="required">*</span></label>
            <select id="paymentType" v-model="form.paymentType" required>
              <option value="" disabled>Selecciona el tipo</option>
              <option value="HOUR">Por hora</option>
              <option value="DAY">Por día</option>
            </select>
          </div>

          <div class="form-group">
            <label for="amount">Monto exacto ($) <span class="required">*</span></label>
            <input 
              type="number" 
              id="amount" 
              v-model="form.amount" 
              required 
              min="1000" 
              placeholder="Ej: 50000" 
            />
          </div>
        </div>

        <div class="form-group">
          <label for="location">Ubicación <span class="required">*</span></label>
          <input 
            type="text" 
            id="location" 
            v-model="form.location" 
            required 
            placeholder="Ej: Zona Norte, Centro, Barrio..." 
          />
        </div>

        <div class="form-group">
          <label for="description">Descripción breve <span class="required">*</span></label>
          <textarea 
            id="description" 
            v-model="form.description" 
            required 
            rows="4" 
            placeholder="Detalla lo que necesitas que hagan..."
          ></textarea>
        </div>

        <button type="submit" class="btn-submit" :disabled="isLoading">
          {{ isLoading ? 'Publicando...' : 'Publicar Tarea' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { taskService } from '../services/tasks.service'

const router = useRouter()

const form = ref({
  title: '',
  category: '',
  paymentType: '',
  amount: null as number | null,
  location: '',
  description: ''
})

const isLoading = ref(false)

const submitTask = async () => {
  console.log('✅ Botón de publicar presionado')
  
  // Validar que el usuario esté autenticado
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  const userId = user.id

  if (!userId) {
    alert('Debes iniciar sesión para publicar una tarea')
    router.push('/login')
    return
  }

  // Validar campos
  if (!form.value.title?.trim()) {
    alert('El título es obligatorio')
    return
  }
  if (!form.value.category?.trim()) {
    alert('La categoría es obligatoria')
    return
  }
  if (!form.value.paymentType) {
    alert('El tipo de remuneración es obligatorio')
    return
  }
  if (!form.value.amount || form.value.amount <= 0) {
    alert('El monto debe ser mayor a 0')
    return
  }
  if (!form.value.location?.trim()) {
    alert('La ubicación es obligatoria')
    return
  }
  if (!form.value.description?.trim()) {
    alert('La descripción es obligatoria')
    return
  }

  const taskData = {
    title: form.value.title.trim(),
    description: form.value.description.trim(),
    category: form.value.category.trim(),
    location: form.value.location.trim(),
    paymentType: form.value.paymentType,
    amount: Number(form.value.amount),
    userId: userId
  }

  console.log('📤 Enviando tarea:', taskData)

  isLoading.value = true
  try {
    const response = await taskService.create(taskData)
    console.log('✅ Tarea creada:', response.data)

    alert('¡Tarea publicada con éxito!')
    
    // Limpiar formulario
    form.value = {
      title: '',
      category: '',
      paymentType: '',
      amount: null,
      location: '',
      description: ''
    }
    
    router.push('/dashboard')
  } catch (error: any) {
    console.error('❌ Error al publicar:', error)
    alert(error.response?.data?.message || 'Error al publicar la tarea')
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.create-wrapper {
  background-color: #f8fafc;
  min-height: 100vh;
  padding: 3rem 1rem;
  display: flex;
  justify-content: center;
}

.form-container {
  background: white;
  width: 100%;
  max-width: 600px;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  padding: 2.5rem;
  height: fit-content;
}

.form-header {
  text-align: center;
  margin-bottom: 2rem;
}

.form-header h1 {
  margin: 0 0 0.5rem 0;
  color: #1e293b;
  font-size: 2rem;
}

.form-header p {
  margin: 0;
  color: #64748b;
  font-size: 0.95rem;
}

.task-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-row {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

@media (min-width: 600px) {
  .form-row {
    flex-direction: row;
  }
  .form-row .form-group {
    flex: 1;
  }
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-weight: 600;
  color: #334155;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

.required {
  color: #ef4444;
}

.form-group input,
.form-group select,
.form-group textarea {
  padding: 0.75rem;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
  font-family: inherit;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

textarea {
  resize: vertical;
}

.btn-submit {
  background-color: #10b981;
  color: white;
  font-size: 1.1rem;
  font-weight: 600;
  padding: 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 1rem;
  transition: background-color 0.2s;
}

.btn-submit:hover:not(:disabled) {
  background-color: #059669;
}

.btn-submit:disabled {
  background-color: #94a3b8;
  cursor: not-allowed;
}
</style>