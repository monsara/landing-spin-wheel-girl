<script setup>
import { ref } from 'vue'

import PromoHeader from '@/components/PromoHeader.vue'
import LogoImage from '@/components/LogoImage.vue'
import BadgedText from '@/components/PromoBadgetText.vue'
import TextBlock from '@/components/PromoTextBlock.vue'
import MainText from '@/components/PromoMainText.vue'
import PromoImage from '@/components/PromoImage.vue'
import PromoModal from '@/components/PromoModal.vue'
import WheelOfFartune from '@/components/WheelOfFartune.vue'
import PromoSafePanel from '@/components/PromoSafePanel.vue'

const isModalVisible = ref(false)
const winnings = ref([
  { id: null, name: '', value: '', extra: null },
  { id: null, name: '', value: '', extra: null },
  { id: null, name: '', value: '', extra: null }
])

const emit = defineEmits(['updateModal', 'updateSpinning'])

const handleModalUpdate = (value) => {
  isModalVisible.value = value
  emit('updateModal', true)
}

const handleVinningsUpdate = (newWinnings) => {
  newWinnings.forEach((newWinning, index) => {
    if (index < winnings.value.length) {
      winnings.value.splice(index, 1, newWinning)
    }
  })
}
</script>

<template>
  <main class="wrapper">
    <article class="promo">
      <div class="promo__content promo__col">
        <PromoHeader class="promo__header">
          <LogoImage>
            <img
              src="@/assets/images/logo.svg"
              alt="Логотип Prematch"
              width="230"
              height="30"
              importance="high"
            />
          </LogoImage>

          <TextBlock tag="h2">
            <BadgedText tag="span" color="purple">запусти кульку —</BadgedText>
            <MainText tag="span">
              <span class="main-text__content">Виграй!</span
              ><span class="main-text__content">бонус!</span>
            </MainText>
          </TextBlock>
        </PromoHeader>

        <WheelOfFartune
          :is-modalVisible="isModalVisible"
          @update-modal="handleModalUpdate"
          @update-winnings="handleVinningsUpdate"
        />
      </div>
      <div class="promo__image promo__col">
        <PromoImage />
      </div>

      <PromoSafePanel class="promo__footer" />
    </article>

    <PromoModal :is-modal-visible="showModal" :prizes="prizesList" />
  </main>
</template>

<style lang="scss">
@use '@/assets/styles/scss/abstracts' as *;
@use 'sass:math';

.promo {
  position: relative;
  display: flex;
  padding: px-to-rem(15px);
  flex-flow: column;

  @include laptop-up {
    flex-direction: row;
  }

  @include critial-laptop-height {
    flex-direction: column;
  }

  &:before,
  &:after {
    content: '';
    position: absolute;
    will-change: transform;
    animation: floatBall 30s linear infinite;

    @include laptop-up {
      display: none;
      animation: none;
    }

    @include critial-laptop-height {
      display: block;
    }
  }

  &:before {
    top: px-to-rem(-63px);
    left: px-to-rem(-63px);
    width: px-to-rem(140px);
    aspect-ratio: 1;
    background: url(@/assets/images/pink-circle-small.webp) center / cover
      no-repeat;
    --move-direction: 95vw;
  }

  &:after {
    bottom: px-to-rem(-79px);
    right: px-to-rem(-79px);
    width: px-to-rem(200px);
    aspect-ratio: 1;
    background: url(@/assets/images/pink-circle-large.webp) center / cover
      no-repeat;
    animation-direction: reverse;
    --move-direction: -90vw;
  }

  &__header {
  }

  &__col {
    display: flex;
    flex-flow: column;
    flex: 1 1 auto;
  }

  &__content {
    align-items: center;
    justify-content: center;
    gap: px-to-rem(20px);

    @include laptop-up {
      width: 50%;
      flex: 0 0 50%;
    }

    @include critial-laptop-height {
      width: 100%;
      flex: 1 1 auto;
    }
  }

  &__image {
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;

    @include laptop-up {
      width: 50%;
    }

    @include critial-laptop-height {
      width: 100%;
    }
  }

  &__footer {
    z-index: 9999;
    margin-top: px-to-rem(15px);
    margin-left: px-to-rem(-15px);
    margin-bottom: px-to-rem(-15px);
    width: 100vw;

    @include laptop-up {
      position: absolute;
      bottom: px-to-rem(20px);
      left: 50%;

      min-width: px-to-rem(275px);
      width: max-content;
      margin: 0;
      transform: translateX(-50%);
    }

    @include critial-laptop-height {
      position: static;
      width: 100vw;
      min-width: initial;
      margin-top: px-to-rem(15px);
      margin-left: px-to-rem(-15px);
      margin-bottom: px-to-rem(-15px);
      transform: none;
    }
  }
}

@keyframes floatBall {
  0% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(var(--move-direction));
  }
  100% {
    transform: translateX(0);
  }
}
</style>
