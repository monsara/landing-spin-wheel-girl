<script setup>
import { computed } from 'vue'

const props = defineProps({
  value: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  }
})

const prizeName = computed(() => {
  switch (props.name) {
    case 'депозит':
      return 'на депозит'
    case 'fs':
      return 'фріспінів'
    case 'грн':
      return 'грн'
    default:
      return props.name
  }
})

const extractedValue = computed(() => {
  const match = props.value.match(/[\d.]+/)
  return match ? match[0] : '0'
})

const measurementUnit = computed(() => {
  const match = props.value.match(/[^\d.]+/)
  return match ? match[0].trim() : ''
})
</script>

<template>
  <div v-if="props.value" class="prize" :class="{ show: props.value }">
    <span class="prize__value">
      <span class="prize__extracted-value">{{ extractedValue }}</span>
      <span v-if="measurementUnit !== 'грн'" class="prize__unit">
        {{ measurementUnit }}
      </span>
    </span>
    <span class="prize__name">{{ prizeName }}</span>
  </div>
</template>

<style lang="scss">
@use '@/assets/styles/scss/abstracts' as *;
@use 'sass:math';

.prize {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: px-to-rem(1px);
  font-family: $font-1;
  color: $color-2;
  opacity: 0;

  &__value {
    display: flex;
    font-size: px-to-rem(20px);
    line-height: 1;
    font-style: italic;
    font-weight: 900;
    color: #c4f221;

    @include laptop-up {
      font-size: px-to-rem(40px);
    }
  }

  &__name {
    font-size: px-to-rem(9px);
    font-family: $font-1;
    line-height: 1;
    font-style: italic;
    font-weight: 900;

    @include laptop-up {
      font-size: px-to-rem(17px);
    }
  }

  &.show {
    opacity: 1;
    animation: fadeIn 0.5s ease forwards;
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
      transform: scale(0.9);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }
}
</style>
