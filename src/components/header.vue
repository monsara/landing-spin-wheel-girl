<script setup lang="ts">
import LanguageSelect from '@/components/language-select.vue'
</script>

<template>
  <header class="header">
    <div class="header__logo">
      <img src="/img/vue-icon.png" alt="vue-icon">
      <span>Lending Skeleton Vue</span>
    </div>

    <div class="header__localization">
      <LanguageSelect />
    </div>
  </header>
</template>

<style lang="scss">
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  padding: 0 36px;
  border-bottom: 1px solid var(--vt-c-divider-dark-1);

  &__logo {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    font-weight: 700;
  }
}
</style>