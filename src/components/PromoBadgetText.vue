<script setup>
import { computed } from 'vue'

const props = defineProps({
  tag: {
    type: String,
    default: 'div'
  },
  color: {
    type: String,
    default: 'purple'
  }
})

const COLORS = {
  green: 'green',
  purple: 'purple'
}

const badgeColorClass = computed(() => {
  return `badged-text--${COLORS[props.color]}` || ''
})
</script>

<template>
  <component :is="props.tag" class="badged-text" :class="badgeColorClass">
    <span class="badged-text__content"><slot /></span>
  </component>
</template>

<style lang="scss">
@use '@/assets/styles/scss/abstracts' as *;

$badged-text-bg-color: #8133ff;
$badged-text-text-color: #fff;

.badged-text {
  display: flex;
  margin: 0;
  padding: px-to-em-multiple(5px 15px);

  font-size: px-to-rem(20px);
  line-height: 1;
  color: $badged-text-text-color;

  background-color: $badged-text-bg-color;
  border-radius: 7px 0;
  border-radius: px-to-rem-multiple(7px 0);
  transform: skew(-15deg);
  transform-origin: center;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &--purple {
    background-color: $color-3;
  }

  &--green {
    background-color: $color-green;
  }

  &__content {
    transform: skew(15deg);
  }
}
</style>
