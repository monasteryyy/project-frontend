<template>
  <div class="base-input-group">
    <label v-if="label" :for="id" class="input-label">{{ label }}</label>
    
    <PInputText 
      :id="id"
      :type="type || 'text'"
      :value="modelValue" 
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      :placeholder="placeholder"
      :class="{ 'p-invalid': errorMessage }"
      class="custom-input"
    />
    
    <small v-if="errorMessage" class="error-text">{{ errorMessage }}</small>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  id?: string
  label?: string
  type?: string
  modelValue: string
  placeholder?: string
  errorMessage?: string
}>()

defineEmits(['update:modelValue'])
</script>

<style scoped>
.base-input-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
  margin-bottom: 1rem;
}
.input-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
}
.custom-input {
  width: 100%;
  padding: 0.75rem;
  border-radius: 6px;
}
.error-text {
  color: #ef4444;
  font-size: 0.75rem;
}
</style>