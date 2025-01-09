import { ref, onMounted, onUnmounted } from 'vue'

export function useViewportWidth() {
  const viewportWidth = ref(window.innerWidth) // Начальное значение

  const updateViewportWidth = () => {
    viewportWidth.value = window.innerWidth
  }

  onMounted(() => {
    window.addEventListener('resize', updateViewportWidth)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', updateViewportWidth)
  })

  return { viewportWidth }
}