<script setup>
const props = defineProps({
  tag: {
    type: String,
    default: 'img'
  },
  alt: {
    type: String,
    default: 'Логотип Прематч'
  }
})
</script>

<template>
  <component :is="props.tag" :alt="props.alt" class="logo">
    <slot></slot>
  </component>
</template>

<style lang="scss">
@use '@/assets/styles/scss/abstracts' as *;

.logo {
  display: inline-flex;
  width: px-to-rem(230px);
  height: px-to-rem(30px);
  margin: 0;

  img,
  svg {
    display: block;
    width: 100%;
    max-width: 100%;
    height: auto;
    object-fit: contain;
  }
}
</style>
