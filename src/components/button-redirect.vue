<script setup lang="ts">
import { useI18n } from "vue-i18n";

const redirect = () => {
  const currentQuery = window.location.search
  const redirectQuery = currentQuery ? `${currentQuery}&sign-up=true` : '?sign-up=true'
  window.location.replace(`${import.meta.env.VITE_REDIRECT_URL}${redirectQuery}`)
}

const { t } = useI18n()
</script>

<template>
  <button
    class="button-redirect"
    @click.once="redirect"
  >
    {{ t('redirect.button') }}
  </button>
</template>

<style lang="scss">
.button-redirect {
  width: 200px;
  height: 50px;
  background-color: var(--vt-c-white);
  border: 2px solid var(--vt-c-divider-dark-1);
  border-radius: 30px;
  cursor: pointer;
}
</style>