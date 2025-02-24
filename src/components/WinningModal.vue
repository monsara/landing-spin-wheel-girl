<script setup>
import BonusPanel from './BonusPanel.vue'

const props = defineProps({
  isModalVisible: {
    type: Boolean,
    required: true
  },
  prizes: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <div
    v-if="props.isModalVisible"
    class="modal-overlay"
    :class="{ show: props.isModalVisible }"
  ></div>

  <div v-if="props.isModalVisible" id="modal" class="modal">
    <BonusPanel class="promo__bonus-panel" :bonuses="prizes" />
  </div>
</template>

<style lang="scss">
@use '@/assets/styles/scss/abstracts' as *;

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;

  display: flex;
  width: 100%;
  min-height: 100dvh;

  background: $color-1;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;

  &.show {
    opacity: 0.9;
  }
}

.modal {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, calc(-50% + px-to-rem(10px))) scale(0.9);
  z-index: 1000;

  opacity: 0;
  animation: modalAppear 0.4s ease-out forwards;

  &::before,
  &::after {
    content: '';
    position: absolute;
    width: px-to-rem(231px);
    height: px-to-rem(222px);
    background: center / cover no-repeat;
    z-index: 0;
    animation:
      growDecorElements 1.3s ease-in-out,
      fadeInAndScaleDecorElements 5s ease-in-out infinite alternate;
    animation-composition: replace;
  }

  &::before {
    left: px-to-rem(-88px);
    top: px-to-rem(359px);
    background-image: url('@/assets/images/decorator-green.webp');
  }

  &::after {
    top: px-to-rem(-106px);
    right: px-to-rem(-114px);
    background-image: url('@/assets/images/decorator-purple.webp');
  }
}

@keyframes growDecorElements {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes fadeInAndScaleDecorElements {
  100% {
    transform: scale(1.3);
    opacity: 1;
  }
}

@keyframes modalAppear {
  0% {
    opacity: 0;
    transform: translate(-50%, calc(-50% + px-to-rem(10px))) scale(0.9);
  }
  100% {
    opacity: 1;
    transform: translate(-50%, calc(-50% + px-to-rem(10px))) scale(1);
  }
}
</style>
