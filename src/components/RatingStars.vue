<template>
  <div class="rating-container">
    <i 
      v-for="star in 5" 
      :key="star"
      class="star-icon"
      :class="getStarClass(star)"
      @click="setRating(star)"
    ></i>
    <span v-if="showLabel" class="rating-label">
      {{ modelValue || rating }} / 5
    </span>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue?: number 
  rating?: number     
  readonly?: boolean  
  showLabel?: boolean 
}>()

const emit = defineEmits(['update:modelValue'])

const setRating = (value: number) => {
  if (!props.readonly) {
    emit('update:modelValue', value)
  }
}

const getStarClass = (star: number) => {
  const value = props.modelValue ?? props.rating ?? 0
  const diff = value - (star - 1)


  if (diff >= 1) {
    return ['pi', 'pi-star-fill', 'star-full', { 'is-interactive': !props.readonly }]
  } else if (diff >= 0.75) {
    return ['pi', 'pi-star-fill', 'star-fill-75', { 'is-interactive': !props.readonly }]
  } else if (diff >= 0.5) {
    return ['pi', 'pi-star-fill', 'star-fill-50', { 'is-interactive': !props.readonly }]
  } else if (diff >= 0.25) {
    return ['pi', 'pi-star-fill', 'star-fill-25', { 'is-interactive': !props.readonly }]
  } else {

    return ['pi', 'pi-star', 'star-empty', { 'is-interactive': !props.readonly }]
  }
}
</script>

<style scoped>
.rating-container {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.star-icon {
  font-size: 1.25rem;
  transition: transform 0.1s;
}

/* Color para la estrella llena completa */
.star-full {
  color: #eab308;
}

/* Color para el borde de la estrella vacía */
.star-empty {
  color: #cbd5e1;
}

.is-interactive {
  cursor: pointer;
}

.is-interactive:hover {
  transform: scale(1.2);
}

.rating-label {
  margin-left: 0.5rem;
  font-size: 0.875rem;
  color: #64748b;
  font-weight: 500;
}

/* --- Gradientes para las fracciones --- */
/* Reemplazamos el 'transparent' por un gris claro para la parte inactiva */

.star-fill-25 {
  background: linear-gradient(to right, #eab308 25%, #cbd5e1 25%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.star-fill-50 {
  background: linear-gradient(to right, #eab308 50%, #cbd5e1 50%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.star-fill-75 {
  background: linear-gradient(to right, #eab308 75%, #cbd5e1 75%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>