<template>
  <PDialog 
    :visible="visible" 
    modal 
    :header="header" 
    :style="{ width: width || '400px' }"
    @update:visible="$emit('update:visible', $event)"
  >
    <div class="modal-content">
      <slot></slot>
    </div>

    <template #footer>
      <slot name="footer">
        <BaseButton 
          label="Cerrar" 
          severity="secondary" 
          @click="$emit('update:visible', false)" 
        />
      </slot>
    </template>
  </PDialog>
</template>

<script setup lang="ts">
import BaseButton from './BaseButton.vue'

defineProps<{
  visible: boolean
  header: string
  width?: string
}>()

defineEmits(['update:visible'])
</script>

<style scoped>
.modal-content {
  padding: 1rem 0;
  color: #475569;
  line-height: 1.5;
}
</style>