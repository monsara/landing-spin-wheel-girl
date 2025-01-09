<script setup>
import { computed } from 'vue'
import CtaBtn from '@/components/CtaBtn.vue'
import TextBlock from '@/components/PromoTextBlock.vue'
import MainText from '@/components/PromoMainText.vue'
import BadgedText from '@/components/PromoBadgetText.vue'

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

const extractedValues = computed(() => {
  return props.prizes.map((prize) => {
    const match = prize.value.match(/[\d.]+/)
    return match ? match[0] : ''
  })
})

const redirect = () => {
  const currentQuery = window.location.search
  const redirectQuery = currentQuery
    ? `${currentQuery}&sign-up=true`
    : '?sign-up=true'
  window.location.replace(
    `${import.meta.env.VITE_REDIRECT_URL}${redirectQuery}`
  )
}
</script>

<template>
  <div
    v-if="props.isModalVisible"
    class="modal-overlay"
    :class="{ show: props.isModalVisible }"
  />

  <div v-if="props.isModalVisible" class="modal-wrapper">
    <div id="modal" class="modal">
      <div class="modal__content">
        <header class="modal__header">
          <TextBlock>
            <BadgedText tag="h2" color="purple"> Забирай </BadgedText>
            <MainText tag="p"> виграш </MainText>
          </TextBlock>
        </header>
        <div class="modal__body">
          <ul class="modal__prize-list">
            <li class="modal__prize-item modal__prize-item--deposit">
              <div class="modal__prize-image">
                <img
                  width="79"
                  height="56"
                  src="@/assets/images/coins.webp"
                  alt="Зображення стопки монет"
                />
              </div>

              <p class="modal__prize">
                <span class="modal__prize-value">
                  +<span>{{ extractedValues[0] }}</span
                  >%
                </span>
                <span class="modal__prize-name">депозит</span>
              </p>
            </li>
            <li class="modal__prize-item modal__prize-item--freespins">
              <div class="modal__prize-image">
                <img
                  width="71"
                  height="71"
                  src="@/assets/images/wheel-of-fartune.webp"
                  alt="Зображення колеса фортуни"
                />
              </div>
              <p class="modal__prize">
                <span class="modal__prize-value">
                  +<span>{{ extractedValues[1] }}</span></span
                >
                <span class="modal__prize-name">фріспінів</span>
              </p>
            </li>
            <li class="modal__prize-item">
              <div class="modal__prize-image">
                <img
                  width="104"
                  height="104"
                  src="@/assets/images/coin-silver.webp"
                  alt="Зображення монети"
                />
              </div>
              <p class="modal__prize">
                <span class="modal__prize-value">
                  +<span>{{ extractedValues[2] }}</span></span
                >
                <span class="modal__prize-name">гривень</span>
              </p>
            </li>
          </ul>
        </div>
        <footer class="modal__footer">
          <CtaBtn @click="redirect"> Забрати </CtaBtn>
        </footer>
      </div>
    </div>
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
  opacity: 0.9;
}

.modal-wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, calc(-50% + px-to-rem(10px)));
  z-index: 1000;

  &.show {
    animation: fadeIn 0.5s ease forwards;
  }

  &::before,
  &::after {
    content: '';
    position: absolute;
    z-index: 0;
    width: px-to-rem(231px);
    height: px-to-rem(222px);
    background: center / cover no-repeat;
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

.modal {
  position: relative;
  z-index: 1;
  width: px-to-rem(302px);
  padding: px-to-rem-multiple(75px 20px 24px 20px);
  background: $color-8;
  box-shadow: px-to-rem-multiple(0px 11px 21.2px) $color-1;
  border-radius: px-to-rem(10px);
  text-align: center;

  &__header {
    position: absolute;
    top: px-to-rem(-20px);
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;

    .text-block {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: px-to-rem(2px);
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
        color: $color-5;
      }
    }
  }

  .main-text {
    color: $color-5;
  }

  &__prize-list {
    display: flex;
    flex-direction: column;
    margin-bottom: px-to-rem(23px);
    gap: px-to-rem(18px);
    color: $color-2;
  }

  &__prize-item {
    display: flex;
    height: px-to-rem(87px);
    padding: px-to-rem-multiple(8.5px 26px 8.5px 12px);
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
    gap: px-to-rem(15px);
    background-color: $color-9;
    border-radius: px-to-rem(10px);

    &:nth-child(1) {
      img {
        width: px-to-rem(79px);
        height: px-to-rem(56px);
      }
    }

    &:nth-child(2) {
      img {
        width: px-to-rem(71px);
        height: px-to-rem(71px);
      }
    }

    &:nth-child(3) {
      background: linear-gradient(45deg, #ffb120, #cd8600);

      img {
        transform: translate(px-to-rem(1px), px-to-rem(-10px));
        width: px-to-rem(104px);
        height: px-to-rem(104px);
      }
    }
  }

  &__prize-image {
    display: flex;
    width: px-to-rem(64px);
    height: px-to-rem(64px);
    align-items: center;
    justify-content: center;
    background-color: $color-3;
    border-radius: px-to-rem(8px);
    overflow: visible;

    img {
      position: absolute;
    }
  }

  &__prize {
    display: flex;
    flex-flow: column;
    line-height: 1.5;
    color: $color-2;
    text-transform: uppercase;
  }

  &__prize-value {
    font-size: px-to-rem(23px);
    line-height: 1;

    span {
      font-size: px-to-rem(35px);
      line-height: 1;
    }
  }

  &__prize-name {
    font-size: px-to-rem(15px);
    line-height: 1.5;
  }

  &__footer {
    display: flex;
    justify-content: center;
  }
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
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
</style>
