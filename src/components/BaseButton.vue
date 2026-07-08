<template>
  <div class="base-button-container">
    <PButton 
      :label="label" 
      :icon="icon" 
      :severity="severity" 
      :disabled="disabled"
      :loading="loading"
      @click="$emit('click')"
      class="custom-btn"
    />
  </div>
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
  transition: background-color 0.2s;
}
</style>