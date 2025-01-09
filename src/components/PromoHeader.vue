<script setup></script>

<template>
  <header class="promo-header">
    <slot />
  </header>
</template>

<style lang="scss">
@use '@/assets/styles/scss/abstracts' as *;

.promo-header {
  display: flex;
  flex-flow: column;
  align-items: center;
  gap: px-to-rem(10px);
}
</style>
