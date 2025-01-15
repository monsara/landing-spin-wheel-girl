<script setup>
import {} from 'vue'
import PrizePanelItem from '@/components/PrizePanelItem.vue'

const props = defineProps({
  winnings: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <ul class="prize-panel">
    <li
      v-for="prize in props.winnings"
      :key="prize.name"
      class="prize-panel__slot"
    >
      <PrizePanelItem :value="prize.value" :name="prize.name" />
    </li>
  </ul>
</template>

<style lang="scss">
@use '@/assets/styles/scss/abstracts' as *;
@use 'sass:math';

.prize-panel {
  container-type: inline-size;
  container-name: sidebar;

  position: relative;
  z-index: 1;
  display: flex;
  width: 100vw;
  margin-top: auto;
  padding: px-to-rem-multiple(11px 13px);
  gap: px-to-rem(6px);
  justify-content: center;
  align-items: center;
  background: transparent;

  @include laptop-up {
    width: 100%;
    padding: 0;
    gap: px-to-rem(25px);
  }

  @include extra-desktop-up {
    margin-top: px-to-rem(20px);
  }

  @include critial-laptop-height {
    margin-top: auto;
    width: 100vw;
    margin-top: auto;
    padding: px-to-rem-multiple(11px 13px);
    gap: px-to-rem(6px);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 0;
    display: block;
    background: rgba(0, 0, 0, 0.7);

    @include laptop-up {
      display: none;
    }

    @include critial-laptop-height {
      display: block;
    }
  }

  &__slot {
    z-index: 1;
    display: flex;
    width: px-to-vw(117, 390);
    max-width: px-to-rem(117px);
    min-height: px-to-rem(44px);
    padding: px-to-rem(6px);
    align-items: center;
    justify-content: center;
    border: 1px dashed #505050;
    border-radius: px-to-rem(5px);

    @include laptop-up {
      max-width: px-to-rem(223px);
      height: px-to-rem(84px);
      border-width: 2px;
    }

    @include critial-laptop-height {
      width: px-to-vw(117, 390);
      max-width: px-to-rem(117px);
      height: initial;
      min-height: px-to-rem(44px);
      border-width: 1px;
    }
  }
}
</style>
