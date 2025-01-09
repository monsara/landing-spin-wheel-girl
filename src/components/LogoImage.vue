<script setup></script>

<template>
  <h1 class="logo">
    <slot></slot>
  </h1>
</template>

<style lang="scss">
@use '@/assets/styles/scss/abstracts' as *;

.logo {
  display: inline-flex;
  width: px-to-rem(230px);
  height: px-to-rem(30px);
  margin: 0;

  img {
    display: block;
    width: 100%;
    max-width: 100%;
    height: auto;
    object-fit: contain;
  }
}
</style>
