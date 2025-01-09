<script setup>
import { ref, onMounted } from 'vue'

const sectors = [
  { id: 1, value: '20%', name: 'депозит', extra: 0 },
  { id: 2, value: 20, name: 'fs', extra: 0 },
  { id: 3, value: '30%', name: 'депозит', extra: 0 },
  { id: 4, value: 100, name: 'fs', extra: 0 },
  { id: 5, value: '10%', name: 'депозит', extra: 0 },
  { id: 6, value: '', name: 'супер приз', extra: 1 },
  { id: 7, value: '150%', name: 'депозит', extra: 0 },
  { id: 8, value: 50, name: 'fs' }
]
const spins = 5
const winningSectorsIds = [6]
const durationMs = 10000

const isSpinning = ref(false)
const isModalVisible = ref(false)
const wheelRef = ref(null)
const isButtonDisabled = ref(false)
const spinBtnText = ref('Крутити')
const previousEndDegree = ref(0) // Start position offset in degrees
const spinCounter = ref(winningSectorsIds.length)
let currentSpin = 0

const emit = defineEmits(['updateModal', 'updateWinnings'])
const winnings = ref([])

const extractValue = (value) => {
  const match = String(value).match(/[\d.]+/)
  return match ? match[0] : ''
}

const spinWheel = () => {
  if (currentSpin >= winningSectorsIds.length) {
    isButtonDisabled.value = true
    return
  }

  isSpinning.value = true
  const sectorsCount = sectors.length
  const degreesPerSector = 360 / sectorsCount
  const winningSector = winningSectorsIds[currentSpin]

  const winningAngle = (winningSector - 1) * degreesPerSector
  const targetAngle = 180
  const currentPosition = previousEndDegree.value % 360
  const angleAdjustment = targetAngle - ((winningAngle + currentPosition) % 360)

  const totalRotation = 360 * spins + angleAdjustment
  const wheel = wheelRef.value

  const animation = wheel.animate(
    [
      { transform: `rotate(${previousEndDegree.value}deg)` },
      {
        transform: `rotate(${previousEndDegree.value + totalRotation}deg)`
      }
    ],
    {
      duration: durationMs,
      direction: 'normal',
      easing: 'cubic-bezier(0.440, -0.215, 0.010, 1.1110)',
      fill: 'forwards',
      iterations: 1
    }
  )

  previousEndDegree.value += totalRotation

  animation.onfinish = () => {
    isSpinning.value = false
    currentSpin++

    const winningPrize = sectors.find((sector) => sector.id === winningSector)
    winnings.value.push(winningPrize)
    emit('updateWinnings', winnings.value)

    if (currentSpin === 1 && winningSectorsIds.length > 1) {
      spinBtnText.value = 'Крутити ще'
    }

    if (spinCounter.value > 0) {
      spinCounter.value--
    }

    if (currentSpin === winningSectorsIds.length) {
      setTimeout(() => {
        isModalVisible.value = true
        emit('updateModal', true)
        emit('updateWinnings', winnings.value)
      }, 700)
    }
  }
}

onMounted(() => {
  const wheel = wheelRef.value
  wheel.style.transform = `rotate(${previousEndDegree.value}deg)`
})
</script>

<template>
  <div class="wheel">
    <div class="wheel__inner">
      <div class="wheel__border">
        <img
          class="wheel__decor-lamps wheel__decor-lamps--1"
          src="@/assets/images/wheel-lamps-1.png"
          alt="Сяючі декоративні лампочки на рамці навколо колеса фортуни"
        />
        <img
          class="wheel__decor-lamps wheel__decor-lamps--2"
          src="@/assets/images/wheel-lamps-2.png"
          alt="Сяючі декоративні лампочки на рамці навколо колеса фортуни"
        />
      </div>

      <fieldset class="wheel-of-fortune" ref="wheelRef">
        <ul>
          <li
            v-for="sector in sectors"
            :key="sector.value"
            class="wheel__prize"
            :class="[
              `wheel__prize-${sector.id}`,
              { 'wheel__prize--extra': sector.extra }
            ]"
          >
            <span v-if="!sector.extra" class="wheel__prize-group">
              <span>
                <span>+</span>
                <span class="wheel__prize-value">
                  {{ extractValue(sector.value) }}
                </span>
                <span v-if="sector.name === 'депозит'">%</span>
              </span>
              <span class="wheel__prize-text">{{ sector.name }}</span>
            </span>
            <span v-if="sector.extra" class="wheel__prize-group">
              <span class="wheel__prize-text">{{ sector.name }}</span>
            </span>
          </li>
        </ul>
      </fieldset>
      <div class="wheel__cursor">
        <img
          src="@/assets/images/cursor.png"
          alt="Cursor image"
          width="137"
          height="107"
        />
      </div>
    </div>
    <div class="btn-cta-wrap">
      <button
        class="btn-cta"
        style="flex-shrink: 0"
        @click="spinWheel"
        :disabled="isSpinning"
      >
        <span class="btn-cta__text">{{ spinBtnText }}</span>
      </button>
    </div>
  </div>
</template>

<style lang="scss">
@use '@/assets/styles/scss/abstracts' as *;
@use 'sass:math';

.wheel {
  position: relative;
  width: 100%;
  height: auto;
  border-radius: 50%;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: px-to-rem(33px);

  @include tablet-up {
    max-width: clamp(300px, 56vh, 372px);
    width: 100%;
  }

  &__inner {
    position: relative;
    display: flex;
    width: 100%;
    height: 100%;
    padding: calc((54 / 2 * 100%) / 484);
    border-radius: 50%;
    align-items: center;
    justify-content: center;
    background: linear-gradient(0deg, #8133ff, #8133ff),
      linear-gradient(45.93deg, #a600f4 30.63%, #5142ff 84.05%);

    &::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      z-index: -1;
      width: 133%;
      aspect-ratio: 1;
      background-image: url('@/assets/images/wheel-shining.png');
      background-size: cover;
      background-position: center;
      transform: translate(-50%, -50%) rotate(-1deg);
      transform-origin: center;
    }
  }

  &__border {
    position: absolute;
    width: 100%;
    height: 100%;
  }

  &__decor-lamps {
    position: absolute;
    z-index: 1;
    width: 100%;

    &--2 {
      animation: flicker 1.5s infinite;
    }
  }

  &__cursor {
    position: absolute;
    z-index: 2;
    top: 50%;
    left: 50%;
    width: calc(151 / 484 * 100%);
    transform: translate(
      calc(-50% + (17 / 151 * 100%)),
      calc(-50% + (9 / 119 * 100%))
    );

    img {
      display: block;
      width: 100%;
      height: auto;
    }
  }

  &__prize {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: $font-1;
    font-weight: bold;
    font-style: italic;
    font-size: clamp(16px, px-to-vh(20, 900), 20px);
    line-height: 1;
    color: $color-2;

    &--extra {
      padding-left: 0.5ch !important;

      & {
        background: linear-gradient(
          to right,
          #ffb509 56.32%,
          rgb(153, 109, 5) 86.03%
        ) !important;
      }

      .wheel__prize-text {
        display: flex;
        max-width: 30cqi;
        color: $color-2;
        text-align: center;
      }
    }

    &:nth-child(odd) {
      &::before {
        content: '';
        position: absolute;
        left: 5cqi;
        z-index: -1;
        display: block;
        width: 16.925cqi;
        height: 22.565cqi;
        background-image: url(@/assets/images/lighting-wheel.png);
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
      }
    }

    &:nth-child(n + 2):nth-child(-n + 7) {
      .wheel__prize-group {
        transform: rotate(0.5turn);
      }

      &::before {
        transform: rotate(0.5turn);
      }
    }

    &:nth-child(5) {
      padding: 0;
    }

    &:nth-child(even) {
      background: linear-gradient(
        to right,
        $color-5 56.32%,
        rgb(92, 109, 5) 86.03%
      );

      color: $color-3;
      padding-left: 1.5ch;

      .wheel__prize-text {
        font-size: 4.87cqi;
      }
    }
  }

  &__prize-group {
    display: flex;
    flex-direction: column;
    width: max-content;
    align-items: center;
  }

  &__prize-value {
    font-size: 8cqi;
    line-height: 1;
  }

  &__prize-text {
    font-size: 3.6cqi;
    line-height: 1;
  }
}

.wheel-of-fortune {
  --_items: 8;
  position: relative;
  all: unset;
  aspect-ratio: 1 / 1;
  container-type: inline-size;
  direction: ltr;
  display: grid;
  width: 100%;
  background: linear-gradient(0deg, #8133ff, #8133ff),
    linear-gradient(45.93deg, #a600f4 30.63%, #5142ff 84.05%);
  // padding: 1.38888cqi;
  padding: calc((20 * 100%) / 430);
  border-radius: 50%;

  &::before {
    content: '';
    position: absolute;
    z-index: 999;
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    box-shadow: inset 0px 3.30732px 40.9281px #260044;
  }

  & > * {
    position: absolute;
  }

  ul {
    all: unset;
    position: absolute;
    clip-path: inset(0 0 0 0 round 50%);
    display: grid;
    inset: 0;
    place-content: center start;

    li {
      align-content: center;
      aspect-ratio: 1 / calc(2 * tan(180deg / var(--_items)));
      // clip-path: polygon(0% 10%, 100% 50%, 0% 90%);
      clip-path: polygon(0% 0%, 100% 50%, 0% 100%);
      display: grid;
      font-size: 5.3cqi;
      grid-area: 1 / -1;
      padding-left: 0.7ch;
      rotate: calc(360deg / var(--_items) * calc(var(--_idx) - 1));
      transform-origin: center right;
      user-select: none;
      width: 50cqi;

      &:nth-of-type(1) {
        --_idx: 1;
      }
      &:nth-of-type(2) {
        --_idx: 2;
      }
      &:nth-of-type(3) {
        --_idx: 3;
      }
      &:nth-of-type(4) {
        --_idx: 4;
      }
      &:nth-of-type(5) {
        --_idx: 5;
      }
      &:nth-of-type(6) {
        --_idx: 6;
      }
      &:nth-of-type(7) {
        --_idx: 7;
      }
      &:nth-of-type(8) {
        --_idx: 8;
      }
    }
  }
}

@keyframes flicker {
  0%,
  100% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
}
</style>
