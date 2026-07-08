<template>
  <button 
    :class="['custom-btn', severity ? `p-button-${severity}` : '']"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <span v-if="loading" class="spinner">⏳</span>
    <span v-else>{{ label }}</span>
  </button>
</template>

<script setup lang="ts">
defineProps<{
  label: string
  icon?: string
  severity?: 'success' | 'info' | 'warning' | 'danger' | 'secondary' | 'contrast'
  disabled?: boolean
  loading?: boolean
}>()

defineEmits(['click'])
</script>

<style scoped>
.custom-btn {
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: 6px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s;
  background-color: #3b82f6;
  color: white;
}

.custom-btn:hover:not(:disabled) {
  background-color: #2563eb;
}

.custom-btn:disabled {
  background-color: #94a3b8;
  cursor: not-allowed;
}

.custom-btn.p-button-secondary {
  background-color: #f1f5f9;
  color: #334155;
}

.spinner {
  display: inline-block;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>