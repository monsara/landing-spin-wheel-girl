<script setup>
import PromoBonus from '@/components/PromoBonus.vue'

const props = defineProps({
  tag: {
    type: String,
    required: true
  },
  bonus: {
    type: Object,
    required: true
  },
  type: {
    type: String,
    required: true
  }
})
</script>

<template>
  <component
    :is="props.tag"
    class="bonus-plate"
    :class="`bonus-plate--${props.type}`"
  >
    <div class="bonus-plate__img">
      <img
        :width="props.bonus.width"
        :height="props.bonus.height"
        :src="props.bonus.img"
        :alt="props.bonus.alt"
      />
    </div>

    <PromoBonus :value="props.bonus.value" :name="props.bonus.name" tag="div" />
  </component>
</template>

<style lang="scss">
@use '@/assets/styles/scss/abstracts' as *;
@use 'sass:math';

.bonus-plate {
  $adapt-ratio: 1.15;

  $img-bg-color: #8133ff;
  $bonus-plate-bg: #323232;

  display: flex;
  min-width: px-to-rem(187px) * $adapt-ratio;
  height: px-to-rem(80px) * $adapt-ratio;
  padding: px-to-rem-multiple(10px 25px);

  align-items: center;
  gap: px-to-rem(15px);
  flex-shrink: 0;
  justify-content: space-between;

  border-radius: px-to-rem(9px);
  background-color: $bonus-plate-bg;

  @include tablet-up {
    width: px-to-rem(262px);
    padding: px-to-rem-multiple(8px 12px);
  }

  &__img {
    display: block;
    width: px-to-rem(64px);
    height: px-to-rem(64px);
    aspect-ratio: 1;
    align-items: center;
    justify-content: center;
    background-color: $img-bg-color;
    border-radius: px-to-rem(8px);

    img {
      position: absolute;

      .bonus-plate--deposit & {
        width: px-to-rem(79px);
        height: px-to-rem(56px);
        transform: translate(-8px, 3px);
      }

      .bonus-plate--freespins & {
        width: px-to-rem(71px);
        height: px-to-rem(71px);
        transform: translate(-3px, -1px);
      }

      .bonus-plate--ua & {
        width: px-to-rem(62px);
        height: px-to-rem(62px);
      }
    }

    .bonus-panel--half-left-offset .bonus-panel-list & {
      display: none;
    }
  }

  .bonus__value {
    color: $color-2;

    .bonus-panel--half-left-offset &:not(.bonus-plate--extra .bonus__value) {
      color: #cfff27;
    }
  }

  &--extra {
    background:
      url(@/assets/images/extra-plate-bg.webp) right / cover,
      linear-gradient(116deg, #ffb120 32.53%, #cd8600 73.17%) !important;
  }

  &:not(.bonus-panel--half-left-offset .bonus-panel-list) & {
    justify-content: end;
  }

  .bonus-panel--half-left-offset & {
    justify-content: end;
    background-image: linear-gradient(90deg, #1b1b1b 0%, #444 100%);
  }
}
</style>
