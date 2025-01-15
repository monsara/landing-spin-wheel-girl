import { ref, onMounted, onBeforeUnmount } from 'vue'

export function useMediaQuery(query) {
  const matches = ref(false)

  const updateMatches = () => {
    matches.value = window.matchMedia(query).matches
  }

  onMounted(() => {
    updateMatches()
    window.addEventListener('resize', updateMatches)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('resize', updateMatches)
  })

  return matches
}
