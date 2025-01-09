<script setup>
import PromoBonusPlate from '@/components/PromoBonusPlate.vue'

const props = defineProps({
  bonuses: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <ul class="bonus-panel-list">
    <PromoBonusPlate
      tag="li"
      class="bonus-panel-list__item"
      :bonus="props.bonuses[0]"
      type="deposit"
    />

    <PromoBonusPlate
      tag="li"
      class="bonus-panel-list__item"
      :bonus="props.bonuses[1]"
      type="freespins"
    />

    <li class="bonus-panel-list__item bonus-panel-list__item--pre-title">
      Додатковий приз
    </li>

    <PromoBonusPlate
      tag="li"
      class="bonus-panel-list__item bonus-plate--extra"
      :bonus="props.bonuses[2]"
      type="ua"
    />
  </ul>
</template>

<style lang="scss">
@use '@/assets/styles/scss/abstracts' as *;
@use 'sass:math';

.bonus-panel-list {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  margin-bottom: 23px;
  gap: 10px;
  color: $color-2;
  font-family: $font-1;
  line-height: 1;
  font-weight: bold;

  &__item {
    &--pre-title {
      .bonus-panel--half-left-offset & {
        display: none;
      }
    }
  }

  .bonus-panel--half-left-offset & {
    margin-bottom: 0;
  }
}
</style>
