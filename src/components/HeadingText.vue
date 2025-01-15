<script setup>
const props = defineProps({
  tag: {
    type: String,
    default: 'div'
  },
  gap: {
    type: [String, Number],
    default: '10px'
  }
})
</script>

<template>
  <component :is="props.tag" class="text-block">
    <slot />
  </component>
</template>

<style lang="scss">
@use 'sass:math';
@use '@/assets/styles/scss/abstracts' as *;

.text-block {
  display: flex;
  flex-flow: column;
  align-items: center;
  gap: px-to-rem(20px);

  @include desktop-up {
    gap: px-to-rem(17px);
  }

  .main-text {
    font-size: px-to-rem(40px);
    color: $color-2;

    &__content {
      display: block;
    }
  }
}
</style>
