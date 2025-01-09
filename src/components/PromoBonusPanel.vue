<script setup>
import PromoBonusPanelList from '@/components/PromoBonusPanelList.vue'
import PromoBadgetText from '@/components/PromoBadgetText.vue'
import PromoMainText from '@/components/PromoMainText.vue'
import CtaBtn from '@/components/CtaBtn.vue'
import { useViewportWidth } from '@/composables/useViewportWidth.js'

const { viewportWidth } = useViewportWidth()

const props = defineProps({
  bonuses: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <section
    :class="[
      'bonus-panel',
      { 'bonus-panel--half-left-offset': viewportWidth < 490 }
    ]"
  >
    <header class="bonus-panel__header">
      <h2 class="bonus-panel__title">
        <PromoBadgetText tag="span">Забирай</PromoBadgetText>
        <PromoMainText tag="span">Виграш</PromoMainText>
      </h2>
    </header>

    <PromoBonusPanelList :bonuses="props.bonuses" />

    <footer class="bonus-panel__footer">
      <CtaBtn>Забрати</CtaBtn>
    </footer>
  </section>
</template>

<style lang="scss">
@use '@/assets/styles/scss/abstracts' as *;
@use 'sass:math';

.bonus-panel {
  $box-shadow-color: #000;
  $bonus-panel-bg: #212121;

  position: relative;
  z-index: 10;
  display: flex;
  width: fit-content;
  padding: px-to-rem-multiple(75px 20px 24px 20px);

  flex-flow: column;
  align-items: end;

  background: $bonus-panel-bg;
  box-shadow: px-to-rem-multiple(0 11px 21px) $box-shadow-color;
  border-radius: 10px;
  text-align: center;

  @include tablet-up {
    width: px-to-rem(302px);
  }

  &__header {
    position: absolute;
    top: px-to-rem(-20px);
    display: flex;
    flex-flow: column;
    align-items: center;

    @include laptop-up {
      left: 50%;
      transform: translateX(-50%);
    }

    .badged-text {
      width: px-to-rem(209px);
      min-width: auto;
      margin-left: px-to-rem(10px);
      font-size: px-to-rem(22px);
      line-height: 1;
    }

    .main-text {
      font-size: px-to-rem(37px);
      line-height: 1;

      &__content {
        font-size: px-to-rem(37px);
        line-height: 1;
        color: $color-3;
      }
    }

    .bonus-panel--half-left-offset & {
      display: none;
    }
  }

  &__title {
    display: flex;
    flex-flow: column;
    align-items: center;
    gap: px-to-rem(4px);
  }

  &__footer {
    z-index: 2;
    display: flex;
    width: 100%;
    justify-content: center;

    .bonus-panel--half-left-offset & {
      position: fixed;
      bottom: px-to-rem(35px);
      left: 0;

      display: flex;
      width: 100%;
      justify-content: center;
    }
  }

  &--half-left-offset {
    position: relative;
    left: -10vmin;
    padding: 0;
    background: none;
    box-shadow: none;
  }

  .btn-cta {
    @include tablet-up {
      width: px-to-rem(262px) - px-to-rem(7px);
      height: px-to-rem(57px);
    }
  }

  &::before {
    content: '';
    position: absolute;
    z-index: 3;
    top: -35%;
    display: block;
    right: -11%;
    width: calc-rel-width(119px, 262px);
    height: calc-rel-width(76px, 262px);
    background: url(@/assets/images/decor-elems.webp) center / cover no-repeat;

    @media screen and (max-width: 64rem) and (max-height: 28.125rem) and (orientation: landscape) {
      display: none;
    }

    @include laptop-up {
      display: none;
    }
  }
}
</style>
