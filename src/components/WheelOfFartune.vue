<script setup>
import { ref, onMounted, watch } from 'vue'
import { useMediaQuery } from '@/composables/useMedia.js'
import { useDynamicOffset } from '@/composables/useDynamicOffset'

const emit = defineEmits(['showModal', 'updateWinnings'])

const { dynamicOffset } = useDynamicOffset(390, 0.25)
const isTablet = useMediaQuery(
  '((min-width: 390px) and (max-width: 1025px)) or ((max-height: 720px) and (orientation: landscape))'
)
const isFloatingWheelControls = useMediaQuery(
  '(max-width: 1025px) or ((max-height: 719px) and (orientation: landscape))'
)

const isSpinning = ref(false)
const isModalVisible = ref(false)
const isButtonDisabled = ref(false)
const spinBtnText = ref('Крутити')
const previousEndDegree = ref(60) // Start position offset in degrees
const spinCounter = ref(3)

const winnings = ref([])

const sectors = [
  { id: 1, value: '10%', name: 'депозит', extra: 0 }, // 0 deg
  { id: 2, value: '100', name: 'fs', extra: 0 }, // 45 deg
  { id: 3, value: '375', name: 'грн', extra: 0 }, // 90 deg
  { id: 4, value: '70', name: 'fs', extra: 0 }, // 135 deg
  { id: 5, value: '150%', name: 'депозит', extra: 0 }, // 180 deg
  { id: 6, value: '50', name: 'fs', extra: 0 }, // 225 deg
  { id: 7, value: '20%', name: 'депозит', extra: 0 }, // 270 deg
  { id: 8, value: '20', name: 'fs' } // 315 deg
]
const sectorsCount = sectors.length
const winningSectorsIds = [5, 6, 3]
const rotationCount = 3
const rotationDurationMs = 7000
let currentSpin = 0

const rotatingArea = ref(null)
const spinButtonRef = ref(null)

const extractValue = (value) => {
  const match = String(value).match(/[\d.]+/)
  return match ? match[0] : ''
}

const spinWheel = () => {
  if (currentSpin >= winningSectorsIds.length) {
    isButtonDisabled.value = !isButtonDisabled.value
    return
  }

  isSpinning.value = true
  const degreesPerSector = 360 / sectorsCount
  const winningSector = winningSectorsIds[currentSpin]

  const winningAngle = (winningSector - 1) * degreesPerSector
  const targetAngle = 180
  const currentPosition = previousEndDegree.value % 360
  const angleAdjustment = targetAngle - ((winningAngle + currentPosition) % 360)

  const totalRotation = 360 * rotationCount + angleAdjustment
  const wheel = rotatingArea.value

  const animation = wheel.animate(
    [
      { transform: `rotate(${previousEndDegree.value}deg)` },
      {
        transform: `rotate(${previousEndDegree.value + totalRotation}deg)`
      }
    ],
    {
      duration: rotationDurationMs,
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

    if (!spinButtonRef.value) return

    if (spinButtonRef.value.classList.contains('pulse')) {
      spinButtonRef.value.classList.remove('pulse')
    } else {
      spinButtonRef.value.classList.add('pulse')
    }

    if (currentSpin === 1) {
      spinBtnText.value = 'Крутити ще'
    }

    if (currentSpin === winningSectorsIds.length) {
      setTimeout(() => {
        isModalVisible.value = !isModalVisible.value
        emit('showModal', isModalVisible.value)
        emit('updateWinnings', winnings.value)
      }, 700)
    }

    if (spinCounter.value > 0) spinCounter.value--
  }
}

onMounted(() => {
  rotatingArea.value.style.transform = `rotate(${previousEndDegree.value}deg)`
})
</script>

<template>
  <div
    class="wheel-container"
    :style="{
      transform: isTablet
        ? `translateX(calc(-50% + ${dynamicOffset}px))`
        : `translateX(-50%)`
    }"
  >
    <div class="wheel">
      <div class="wheel__core">
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

        <fieldset class="wheel__rotating-area" ref="rotatingArea">
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
        <div class="wheel__pointer">
          <img
            src="@/assets/images/cursor.webp"
            alt="Cursor image"
            width="137"
            height="107"
          />
        </div>
      </div>
      <Teleport v-if="isFloatingWheelControls" to="body">
        <div class="wheel__controls">
          <button
            class="btn-cta"
            @click="spinWheel"
            ref="spinButtonRef"
            :disabled="isSpinning"
          >
            <span class="btn-cta__text">{{ spinBtnText }}</span>
          </button>
          <div class="counter">
            {{ spinCounter }}
          </div>
        </div>
      </Teleport>
      <div v-else class="wheel__controls">
        <button
          class="btn-cta"
          @click="spinWheel"
          :disabled="isSpinning"
          ref="spinButtonRef"
        >
          <span class="btn-cta__text">{{ spinBtnText }}</span>
        </button>
        <div class="counter">
          {{ spinCounter }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@use '@/assets/styles/scss/abstracts' as *;
@use 'sass:math';

.wheel-container {
  width: px-to-rem(390px);
  max-width: px-to-rem(390px);

  @include laptop-up {
    transform: none !important;
    z-index: 999;
  }

  @include critial-laptop-height {
    transform: none;
  }
}

.wheel {
  position: relative;
  z-index: -1;
  display: flex;
  width: 100%;
  height: auto;
  border-radius: 50%;
  flex-direction: column;
  align-items: center;

  &__core {
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
  }

  &__border {
    position: absolute;
    width: calc(100% + px-to-rem(15px));
    height: calc(100% + px-to-rem(15px));

    &::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      z-index: -1;
      width: 133%;
      aspect-ratio: 1;
      background: url('@/assets/images/wheel-shining.webp') center/cover;
      transform: translate(-50%, -50%) rotate(-1deg);
      transform-origin: center;
    }
  }

  &__decor-lamps {
    position: absolute;
    z-index: 1;
    width: 100%;

    &--2 {
      animation: flicker 1.5s infinite;
    }
  }

  &__rotating-area {
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
      box-sizing: border-box;
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

  &__pointer {
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
        background: url('@/assets/images/lighting-wheel.webp') center/contain
          no-repeat;
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

  &__controls {
    position: absolute;
    left: 50%;
    bottom: px-to-rem(113px);
    display: flex;
    gap: px-to-rem(15px);
    transform: translateX(-50%);

    @include laptop-up {
      position: static;
      left: unset;
      transform: none;
      margin-top: -20px;
    }

    @include critial-laptop-height {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      margin-top: initial;
    }
  }
}

.btn-cta {
  animation: none;

  &.pulse {
    animation: pulse-counter 1.5s ease-in-out 0.3s infinite;
  }
}

.counter {
  position: relative;
  display: flex;
  width: px-to-rem(67px);
  height: px-to-rem(57px);

  justify-content: center;
  align-items: center;

  font-family: $font-1;
  font-weight: bold;
  font-style: italic;
  font-size: px-to-rem(26px);
  line-height: 1;

  border-radius: px-to-rem-multiple(17px 4px);
  background-color: $color-2;
  transform: skew(-14deg);
  transform-origin: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition:
    background-color $time-sm $easing,
    transform $time-sm $easing;
  cursor: pointer;
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

@keyframes pulse-counter {
  0% {
    scale: 1;
  }
  50% {
    scale: 0.95;
  }
  100% {
    scale: 1;
  }
}
</style>
