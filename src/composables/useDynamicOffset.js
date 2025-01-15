import { ref, onMounted, onUnmounted } from 'vue'

export function useDynamicOffset(baseWidth = 390, offsetFactor = 0.1) {
  const dynamicOffset = ref(0)

  // Обновление значения смещения
  const updateOffset = () => {
    const windowWidth = window.innerWidth
    dynamicOffset.value = (windowWidth - baseWidth) * offsetFactor
  }

  onMounted(() => {
    updateOffset()
    window.addEventListener('resize', updateOffset)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', updateOffset)
  })

  return {
    dynamicOffset
  }
}
