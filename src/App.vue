<script setup>
import { ref, watchEffect } from 'vue'
import ActionHeader from '@/components/ActionHeader.vue'
import Logo from '@/components/Logo.vue'
import BadgedText from '@/components/BadgedText.vue'
import HeadingText from '@/components/HeadingText.vue'
import MainText from '@/components/MainText.vue'
import MainImage from '@/components/MainImage.vue'
import WinningModal from '@/components/WinningModal.vue'
import WheelOfFartune from '@/components/WheelOfFartune.vue'
import PrizePanel from '@/components/PrizePanel.vue'
import SafePanel from '@/components/SafePanel.vue'
import CoinsImage from '@/assets/images/coins.webp'
import WheelImage from '@/assets/images/wheel-of-fartune.webp'
import CrystalImage from '@/assets/images/crystal.webp'

import { useMediaQuery } from '@/composables/useMedia.js'
import { useDynamicOffset } from '@/composables/useDynamicOffset'

const { dynamicOffset } = useDynamicOffset(390, 0.25)
const isTablet = useMediaQuery('(min-width: 390px) and (max-width: 1025px)')
const isSmallMobile = useMediaQuery('(max-width: 389px)')

const winnings = ref([
  { name: '', value: '', extra: null },
  { name: '', value: '', extra: null },
  { name: '', value: '', extra: null }
])
const prizesList = ref([
  {
    id: 1,
    value: '150',
    name: 'депозит',
    img: CoinsImage,
    width: 79,
    height: 56,
    alt: 'Зображення стопки коїнів'
  },
  {
    id: 2,
    value: '125',
    name: 'фріспінів',
    img: WheelImage,
    width: 71,
    height: 71,
    alt: 'Зображення колеса фортуни'
  },
  {
    id: 3,
    value: '375 грн',
    name: 'гривень',
    img: CrystalImage,
    width: 62,
    height: 62,
    alt: 'Зображення зеленого кристалу'
  }
])
const isModalVisible = ref(false)

watchEffect(() => {
  // Watch for changes in the wininnings array
  // and update the value and name properties
  // in the prezesList array for the mosal prises list
  winnings.value.forEach((win, index) => {
    prizesList.value[index] = {
      ...prizesList.value[index],
      value: win.value,
      name: win.name
    }
  })
})

const handleShowModal = (value) => {
  isModalVisible.value = value
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
    <article id="promo" class="promo">
      <div class="promo__content promo__col">
        <ActionHeader class="promo__header">
          <Logo tag="h1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="197"
              height="24"
              viewBox="0 0 197 24"
              fill="none"
            >
              <title>Логотип Прематч</title>
              <path d="M196.767 0H0.232819V23.117H196.767V0Z" fill="black" />
              <path
                d="M174.493 10.8764L171.086 17.9949H164.017L172.632 0.0429688H179.701L176.592 6.52249H186.584L189.703 0.0429688H196.772L188.157 17.9883H181.088L184.495 10.8698H174.503L174.496 10.8764H174.493Z"
                fill="white"
              />
              <path
                d="M150.32 12.3957L153.588 5.61822C153.713 5.34341 153.939 5.20104 154.263 5.20104H168.378L170.864 0.0458984H153.803C153.283 0.0458984 152.8 0.0988752 152.329 0.171716L149.181 6.68765H145.982L142.42 14.1141C142.337 14.3061 142.258 14.4949 142.188 14.6637C142.122 14.8359 142.056 15.0147 142.009 15.1935C141.509 17.0608 142.569 17.9912 145.188 17.9912H162.249L164.712 12.8361H150.598C150.316 12.8361 150.204 12.7401 150.257 12.5381C150.273 12.4719 150.293 12.4255 150.323 12.3891V12.3957H150.32Z"
                fill="white"
              />
              <path
                d="M81.5281 1.4733L82.3989 11.5187L92.9475 1.4733C93.9375 0.519747 95.1195 0.0529113 96.4969 0.0529113H99.5396C101.652 0.0529113 102.486 0.87733 102.039 2.52949C101.993 2.70828 101.927 2.88708 101.861 3.07249C101.784 3.25128 101.712 3.44331 101.622 3.63866L94.7322 18.0048H88.4976L93.0667 8.48257L84.4152 16.5845C83.3889 17.538 82.3029 18.0048 81.1639 18.0048H77.4589C76.8862 18.0048 76.4392 17.8857 76.118 17.6473C75.7969 17.4089 75.6114 17.0513 75.5618 16.5745L74.691 8.47264L70.1219 17.9949H63.8874L70.7841 3.62873C71.9297 1.24154 73.7739 0.0429688 76.3134 0.0429688H79.3561C80.7335 0.0429688 81.4619 0.519748 81.5513 1.46337L81.5281 1.47V1.4733Z"
                fill="white"
              />
              <path
                d="M50.9714 0H49.7364C50.2066 0.655567 50.6204 1.74818 50.1834 3.39372C50.0576 3.87049 49.8622 4.37706 49.6106 4.89026L48.1604 7.88998C47.4386 9.38652 46.4784 10.5685 45.2964 11.4161C44.6276 11.8929 43.8694 12.2637 43.0417 12.5319L44.664 17.9917H61.9604C61.9604 17.9917 62.9868 15.8495 64.3476 12.9988H49.5709L50.5012 11.0122H65.2912C65.9468 9.6514 66.6288 8.21445 67.301 6.82385H51.9879L52.9182 4.83729H68.2512L68.281 4.77107C69.175 2.91032 70.5656 0.00330407 70.5656 0.00330407H50.9681L50.9714 0Z"
                fill="#C4F221"
              />
              <path
                d="M127.924 0.0458984C127.924 0.0458984 127.931 0.0525232 127.941 0.059145C128.381 0.631938 128.818 1.64509 128.401 3.20786C128.335 3.44624 128.259 3.68462 128.163 3.91308C128.087 4.10511 127.997 4.30708 127.911 4.51567L127.583 5.20104H133.281L127.15 17.9912H134.218L140.35 5.20104H148.244L150.73 0.0458984H127.928H127.924Z"
                fill="white"
              />
              <path
                d="M123.802 0.0466573H109.83C108.29 0.0466573 106.979 0.367823 105.903 1.01346C104.824 1.65909 103.97 2.62919 103.344 3.92377L96.6027 17.992H103.672L106.135 12.8368H115.197L112.734 17.992H119.803L126.544 3.92377C126.626 3.73173 126.706 3.53639 126.782 3.3576C126.858 3.17881 126.914 3.00002 126.961 2.81461C127.461 0.960483 126.405 0.0400391 123.799 0.0400391L123.805 0.0466573H123.802ZM117.227 7.90353H107.757L108.747 5.79777H118.25L117.237 7.90353H117.23H117.227Z"
                fill="white"
              />
              <path
                d="M45.207 0H29.5694C30.0396 0.655567 30.4534 1.74818 30.0164 3.39372C29.8906 3.85394 29.7052 4.33733 29.4668 4.83729H40.2472L39.2937 6.82385H28.5132L27.5001 8.92962C26.2585 11.532 24.2189 13.1643 21.547 13.7669L19.471 17.9917H26.136L29.0463 12.2836H33.6651L35.2642 17.9917H42.8231L40.8068 11.1976C42.1676 11.0552 43.3231 10.6546 44.2667 9.98581C45.2103 9.317 45.9785 8.36345 46.5744 7.12846L48.0246 4.12212C48.2266 3.70494 48.3822 3.31094 48.4782 2.94011C49.0146 0.983342 47.9187 0 45.2037 0H45.207Z"
                fill="#C4F221"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M8.13402 0H25.0298C27.7447 0 28.8407 0.983342 28.3175 2.94011C28.2215 3.31094 28.0725 3.70494 27.8639 4.12212L25.9237 8.16809C24.6159 10.9129 22.3446 12.2902 19.123 12.2902H11.1337L13.7659 6.82054H19.1065L20.06 4.83397H12.468L8.12408 13.8894H12.7726L0.227478 23.1137L4.56482 14.1642H1.40949L6.1044 4.19496H6.11103L8.12739 0H8.13402Z"
                fill="#C4F221"
              />
            </svg>
          </Logo>

          <HeadingText tag="h2">
            <BadgedText tag="span" color="purple">Крутити колесо</BadgedText>
            <MainText tag="span">
              <span class="main-text__content">Отримуй</span>
              <span class="main-text__content">бонуси!</span>
            </MainText>
          </HeadingText>
        </ActionHeader>

        <WheelOfFartune
          @show-modal="handleShowModal"
          @update-winnings="handleVinningsUpdate"
        />

        <PrizePanel class="promo__prize-panel" :winnings="winnings" />
      </div>
      <MainImage
        class="promo__image promo__col"
        :style="{
          transform: isSmallMobile
            ? 'translateX(-50%)'
            : isTablet
              ? `translateX(calc(-50% + ${dynamicOffset}px))`
              : 'none'
        }"
      />
      <SafePanel class="promo__footer" />
    </article>

    <WinningModal :isModalVisible="isModalVisible" :prizes="prizesList" />
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
    padding: px-to-rem(30px);
    flex-direction: row;
  }

  @include critial-laptop-height {
    flex-direction: column;
  }

  @include laptop-up {
    align-items: center;
  }

  @include critial-laptop-height {
    padding: px-to-rem(15px);
    flex-flow: column;
    align-items: initial;
  }

  &__header {
    margin-top: auto;
    flex-grow: 1;
    justify-content: center;
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
      padding-bottom: px-to-rem(70px);
      flex: 0 0 50%;
    }

    @include extra-desktop-up {
      padding-bottom: 0;
    }

    @include critial-laptop-height {
      width: initial;
      flex: initial;
      padding-bottom: initial;
      gap: px-to-rem(20px);
    }
  }

  &__image {
    position: absolute;
    top: 0;
    right: 0;
    left: 50%;
    width: 100%;
    max-width: px-to-rem(390px);
    height: 100%;
    pointer-events: none;

    @include laptop-up {
      position: relative;
      inset: auto;
      max-width: 100%;
      height: auto;
      align-self: end;
      transform: none !important;
    }

    @include critial-laptop-height {
      position: absolute;
      top: 0;
      right: 0;
      left: 50%;
      width: 100%;
      max-width: px-to-rem(390px);
      height: 100%;
    }
  }

  &__footer {
    z-index: 9999;
    margin-left: px-to-rem(-15px);
    margin-bottom: px-to-rem(-15px);
    width: 100vw;

    @include laptop-up {
      position: absolute;
      bottom: px-to-rem(20px);
      left: 50%;
      width: max-content;
      min-width: px-to-rem(275px);
      margin: 0;
      transform: translateX(-50%);
    }

    @include critial-laptop-height {
      position: static;
      width: 100vw;
      min-width: initial;
      margin-left: px-to-rem(-15px);
      margin-bottom: px-to-rem(-15px);
      transform: none;
    }
  }
}
</style>
