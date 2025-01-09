<script setup>
import { ref, watch, onMounted, onBeforeUnmount, computed, nextTick } from 'vue'
import CtaBtn from '@/components/CtaBtn.vue'
import ballTexture from '@/assets/images/plinko-ball.webp'
import ballTextureLarge from '@/assets/images/plinko-ball-large.webp'
import pinTexture from '@/assets/images/pin.svg'
import pinTextureLage from '@/assets/images/pin-large.svg'
import { useMediaQuery } from '@/composables/useMedia.ts'

import { Engine, Render, World, Bodies, Body, Runner, Events } from 'matter-js'

const ballBorder = ref(0)
const pinSizeDesign = ref(0)
const sectorSpacing = ref(0)
const pinSpacingDesign = ref(0)
const calculatedPinSpacingDesign = computed(() => {
  return pinSizeDesign.value + pinSpacingDesign.value + ballBorder.value * 2
})

const isLaptop = useMediaQuery('(min-width: 1281px) and (min-height: 768px)')
const totalPrize = ref(0)
const sectors = [
  { index: 1, prize: 100, color: '--color-1' },
  { index: 2, prize: 50, color: '--color-2' },
  { index: 3, prize: 20, color: '--color-3' },
  { index: 4, prize: 75, color: '--color-4' },
  { index: 5, prize: 25, color: '--color-5' },
  { index: 6, prize: 50, color: '--color-6' },
  { index: 7, prize: 100, color: '--color-7' }
]
const ballsCount = 5

let previousWidth = 0
let previousHeight = 0

const gameContainerRef = ref(null)
const catcherRefs = ref([])
const counterRef = ref(null)
const lastBallIndex = ref(null)

let engine, render, runner

const emit = defineEmits(['showModal'])

watch(totalPrize, (newValue, oldValue) => {
  if (newValue > oldValue && counterRef.value) {
    counterRef.value.classList.add('active', 'pulse')

    setTimeout(() => {
      counterRef.value.classList.remove('pulse')
    }, 500)
  }
})

const generateRandomOffset = (index) => {
  const ballIndex = index + 1
  const randomValue = Math.sin(ballIndex) * 10000
  return (randomValue - Math.floor(randomValue)) * 20 - 15
}

const createBall = (i) => {
  lastBallIndex.value = i
  const containerRect = gameContainerRef.value.getBoundingClientRect()
  const totalSpacing = (sectors.length - 1) * sectorSpacing.value
  const sectorWidth = (containerRect.width - totalSpacing) / sectors.length
  const initialX = containerRect.width / 2
  const initialY = containerRect.height * 0.05

  // Рассчитываем радиус мяча и масштаб текстуры
  const ballRadius = pinSizeDesign.value / 2
  const originalSize = pinSizeDesign.value
  const textureScale = ballRadius / originalSize
  const randomXOffset = generateRandomOffset(i)
  const restitutionValue = isLaptop.value ? 0.355 : 0.67
  const frictionValue = isLaptop.value ? 0.001 : 0.001
  const frictionAirValue = isLaptop.value ? 0.001 : 0.001

  const ball = Bodies.circle(initialX + randomXOffset, initialY, ballRadius, {
    restitution: restitutionValue, // Устанавливаем параметры отскока
    friction: frictionValue, // Устанавливаем трение
    frictionAir: frictionAirValue, // Устанавливаем трение воздуха
    render: {
      sprite: {
        texture: isLaptop.value ? ballTextureLarge : ballTexture,
        xScale: textureScale,
        yScale: textureScale
      }
    }
  })

  // Устанавливаем начальную позицию мяча
  Body.setPosition(ball, { x: initialX + randomXOffset, y: initialY })
  World.add(engine.world, ball)

  // Начальная скорость мяча (только вниз)
  const velocityX = randomXOffset * 0.05
  const velocityY = 1
  Body.setVelocity(ball, { x: velocityX, y: velocityY })

  // Слушаем события столкновений
  Events.on(engine, 'collisionStart', (event) => {
    const pairs = event.pairs

    for (const pair of pairs) {
      const { bodyA, bodyB } = pair

      // Проверяем столкновение мяча с сектором
      if (
        (bodyA === ball && bodyB.label === 'sector') ||
        (bodyB === ball && bodyA.label === 'sector')
      ) {
        const ballX = ball.position.x
        const sectorIndex = sectors.findIndex((sector, idx) => {
          const sectorStart = sectorWidth * idx + sectorSpacing.value * idx // Левая граница сектора
          const sectorEnd = sectorStart + sectorWidth // Правая граница сектора
          return ballX >= sectorStart && ballX <= sectorEnd
        })

        if (sectorIndex !== -1) {
          const sectorPrize = sectors[sectorIndex].prize || 0
          totalPrize.value += sectorPrize

          const catcherElement =
            catcherRefs.value[`catcher-${sectors[sectorIndex].index}`]

          if (catcherElement) {
            const prize = catcherElement.firstChild.cloneNode(true)
            prize.classList.add('catchers__floating-prize')
            catcherElement.appendChild(prize)
            catcherElement.classList.add('catcher-animate')

            setTimeout(() => {
              catcherElement.classList.remove('catcher-animate')
            }, 200)

            World.remove(engine.world, ball)
          }
        }

        if (lastBallIndex.value === i) {
          setTimeout(() => {
            emit('showModal')
          }, 1000)
        }
        break
      }
    }
  })
}

const dropBalls = () => {
  const delay = 1000

  for (let i = 0; i < ballsCount; i++) {
    setTimeout(() => {
      createBall(i)
    }, i * delay)
  }
}

const createWalls = (containerRect) => {
  const leftWall = Bodies.rectangle(
    0,
    containerRect.height / 2,
    20,
    containerRect.height,
    {
      isStatic: true,
      render: {
        fillStyle: 'transparent'
      }
    }
  )

  const rightWall = Bodies.rectangle(
    containerRect.width,
    containerRect.height / 2,
    20,
    containerRect.height,
    {
      isStatic: true,
      render: {
        fillStyle: 'transparent'
      }
    }
  )

  World.add(engine.world, [leftWall, rightWall])

  return [leftWall, rightWall]
}

const createPyramid = (containerRect) => {
  const rows = 6
  const initialPinsInRow = 2 // Начальное количество пинов в первом ряду
  const pyramid = []
  const pyramidStartY = containerRect.height * 0.1
  const containerCenterX = containerRect.width / 2

  for (let row = 0; row < rows; row++) {
    const numPinsInRow = initialPinsInRow + row // Количество пинов в текущем ряду
    const rowWidth = (numPinsInRow - 1) * calculatedPinSpacingDesign.value
    const rowStartX = containerCenterX - rowWidth / 2

    for (let col = 0; col < numPinsInRow; col++) {
      const x = rowStartX + col * calculatedPinSpacingDesign.value
      const y = pyramidStartY + row * calculatedPinSpacingDesign.value

      const pinRadius = pinSizeDesign.value / 2
      const originalSize = pinSizeDesign.value
      const textureScale = pinSizeDesign.value / originalSize

      const pin = Bodies.circle(x, y, pinRadius, {
        isStatic: true,
        render: {
          sprite: {
            texture: isLaptop.value ? pinTextureLage : pinTexture,
            xScale: textureScale,
            yScale: textureScale
          }
        }
      })
      pyramid.push(pin)
    }
  }

  World.add(engine.world, pyramid)

  return pyramid
}

const createSectors = (containerRect) => {
  const sectorObjects = []
  const sectorHeight = 1 // Высота полоски

  // Расчитываем относительную ширину сектора
  const totalSpacing = (sectors.length - 1) * sectorSpacing.value // Общее расстояние между секторами
  const sectorWidth = (containerRect.width - totalSpacing) / sectors.length // Длина сектора с учетом расстояний

  for (let i = 0; i < sectors.length; i++) {
    const sectorX = sectorWidth * i + sectorSpacing.value * i + sectorWidth / 2
    const sectorBody = Bodies.rectangle(
      sectorX,
      containerRect.height,
      sectorWidth,
      sectorHeight,
      {
        isStatic: true,
        label: 'sector',
        render: {
          fillStyle: `transparent`
        }
      }
    )

    sectorObjects.push(sectorBody)
  }

  World.add(engine.world, sectorObjects)

  return sectorObjects
}

const setupGame = () => {
  updateCSSVariables()
  const containerRect = gameContainerRef.value.getBoundingClientRect()

  engine = Engine.create()
  render = Render.create({
    element: gameContainerRef.value,
    engine: engine,
    options: {
      width: containerRect.width,
      height: containerRect.height,
      wireframes: false,
      background: 'transparent'
    }
  })

  createWalls(containerRect)
  createPyramid(containerRect)
  createSectors(containerRect)

  Render.run(render)
  runner = Runner.create()
  Runner.run(runner, engine)
}

const handleWindowResize = () => {
  const containerRect = gameContainerRef.value.getBoundingClientRect()

  // Проверка, изменились ли размеры
  if (
    containerRect.width === previousWidth &&
    containerRect.height === previousHeight
  ) {
    return
  }

  // Обновляем сохраненные размеры
  previousWidth = containerRect.width
  previousHeight = containerRect.height
  // Перезапускаем игру с новыми размерами
  setupGame()

  // Останавливаем текущий рендер
  Render.stop(render)
  World.clear(engine.world)

  if (render.canvas && render.canvas.parentNode) {
    render.canvas.parentNode.removeChild(render.canvas)
  }
}

const updateCSSVariables = () => {
  const rootStyles = getComputedStyle(document.documentElement)

  ballBorder.value = Number(rootStyles.getPropertyValue('--ball-border'))
  pinSizeDesign.value = Number(rootStyles.getPropertyValue('--pin-size-design'))
  pinSpacingDesign.value = Number(
    rootStyles.getPropertyValue('--pin-spacing-design')
  )
}

onMounted(() => {
  const isMobile = /Mobi|Android/i.test(navigator.userAgent)

  if (isMobile) {
    setTimeout(() => {
      const gameContainer = gameContainerRef.value
      if (gameContainer) {
        setupGame(gameContainer)
      }
    }, 150)
  } else {
    const gameContainer = gameContainerRef.value
    if (gameContainer) {
      setupGame(gameContainer)
    }
  }

  window.addEventListener('resize', handleWindowResize)

  const catcherElements = document.querySelectorAll('.catchers__item')

  if (catcherElements.length > 0) {
    catcherElements.forEach((el, index) => {
      const key = `catcher-${index + 1}`
      catcherRefs.value[key] = el
    })
  }
})

onBeforeUnmount(() => {
  Events.off(engine, 'collisionStart')
  Render.stop(render)
  Runner.stop(runner)
  Engine.clear(engine)
  render.canvas.remove()
  render.textures = {}
  window.removeEventListener('resize', handleWindowResize)
})
</script>

<template>
  <div class="plinko-game">
    <div ref="gameContainerRef" class="plinko-container"></div>

    <ul class="catchers">
      <li
        :class="['catchers__item', `catchers__item--${sector.index}`]"
        v-for="sector in sectors"
        :key="`${sector.index}-${sector.prize}`"
        :ref="`catcher-${sector.index}`"
      >
        <span>
          x<span class="catchers__item-value">{{ sector.prize }}</span>
        </span>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="43"
          height="30"
          viewBox="0 0 43 30"
          :style="`fill: var(--color-${sector.index});`"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M21.4968 7.89891C25.4543 7.89891 28.6624 4.69077 28.6624 0.733316C28.6624 0.733018 28.6624 0.73272 28.6624 0.732422H39.4108C41.3895 0.732422 42.9936 2.3365 42.9936 4.31522V25.812C42.9936 27.7907 41.3895 29.3948 39.4108 29.3948H3.58279C1.60407 29.3948 0 27.7907 0 25.812V4.31522C0 2.33649 1.60407 0.732422 3.5828 0.732422H14.3312C14.3312 0.73272 14.3312 0.733018 14.3312 0.733316C14.3312 4.69077 17.5394 7.89891 21.4968 7.89891Z"
          />
        </svg>
      </li>
    </ul>

    <div class="game-controls">
      <CtaBtn
        class="game-controls__drop-btn"
        :class="{ inactive: totalPrize > 0 }"
        @click.once="dropBalls"
        ref="dropButtonRef"
      >
        Запуск гри
      </CtaBtn>
      <div
        class="game-controls__counter"
        :class="{ active: totalPrize > 0 }"
        ref="counterRef"
      >
        {{ totalPrize }}₴
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@use 'sass:math';
@use '@/assets/styles/scss/abstracts' as *;

$desktop-ball-border: 2;
$desktop-pin-size-design: 18;
$desktop-pin-spacing-design: 35;
$desktop-sector-spacing: 10;

$laptop-ball-border: 1.52;
$laptop-pin-size-design: 13.17;
$laptop-pin-spacing-design: 26.55;
$laptop-sector-spacing: 8;

:root {
  --color-1: #f02121;
  --color-2: #ff9721;
  --color-3: #ffea00;
  --color-4: #c3f021;
  --color-5: #ffea00;
  --color-6: #ff9721;
  --color-7: #f02121;

  --ball-border: #{$laptop-ball-border};
  --pin-size-design: #{$laptop-pin-size-design};
  --pin-spacing-design: #{$laptop-pin-spacing-design};
  --sector-spacing: #{$laptop-sector-spacing};
}

@include desktop-up {
  :root {
    --ball-border: #{$desktop-ball-border};
    --pin-size-design: #{$desktop-pin-size-design};
    --pin-spacing-design: #{$desktop-pin-spacing-design};
    --sector-spacing: #{$desktop-sector-spacing};
  }
}

.plinko-game {
  display: flex;
  flex-flow: column;
  align-items: center;
}

.plinko-container {
  position: relative;
  z-index: 5;
  width: 350px;
  height: 280px;
  background: transparent;

  @include desktop-up {
    width: 457px;
    height: 360px;
  }

  @include critial-laptop-height {
    width: 350px;
    height: 280px;
  }
}

.catchers {
  display: flex;
  justify-content: space-between;
  gap: 7px;
  margin-bottom: px-to-rem(40px);

  @include small-mobile {
    gap: 2px;
  }

  @include desktop-up {
    gap: 10px;
  }

  @include critial-laptop-height {
    gap: 7px;
  }

  &__item {
    position: relative;

    display: flex;
    width: 43px;
    height: 29px;

    align-items: center;
    justify-content: center;

    color: $color-1;
    font-family: $font-family-stack;
    font-size: 8px;
    font-weight: 900;
    line-height: 100%;
    border-radius: 4px;
    transition: transform 0.5s ease-in-out;

    @include desktop-up {
      width: 57px;
      height: 38px;
      font-size: 11px;
    }

    @include critial-laptop-height {
      width: 43px;
      height: 29px;
      font-size: 8px;
    }

    &.catcher-animate {
      animation: bounce-catcher 0.3s ease-in;
    }

    span {
      padding-top: px-to-rem(5px);
      padding-top: 5px;
    }

    svg {
      width: 100%;
      height: 100%;
    }

    @for $i from 1 through 7 {
      &--#{$i} {
        svg {
          position: absolute;
          z-index: -1;
          color: var(--color-#{$i});
        }
      }
    }
  }

  &__item-value {
    font-size: px-to-rem(10px);
    font-size: 10px;

    @include desktop-up {
      font-size: 14px;
    }

    @include critial-laptop-height {
      font-size: 10px;
    }
  }

  &__floating-prize {
    position: absolute;
    top: -5px;
    z-index: 10;
    color: $color-2;
    opacity: 0;
    animation: float-prize 2s ease-in-out forwards;
  }

  .counter {
    position: relative;
    display: flex;
    width: px-to-rem(67px);
    height: px-to-rem(57px);

    justify-content: center;
    align-items: center;

    font-family: $font-family-stack;
    font-weight: bold;
    font-style: italic;
    font-size: px-to-rem(26px);
    line-height: 1;

    border-radius: rem-calc(17px 4px);
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
}

.game-controls {
  $btn-bg-color: #cfff27;
  $btn-hovered-bg-color: #afe000;
  $btn-text-color: #1a1a1a;
  $disabled-bg: #545454;

  display: flex;
  justify-content: center;
  gap: px-to-rem(7px);

  &__drop-btn {
    animation: none;

    &.inactive {
      background-color: $disabled-bg;
    }
  }

  &__counter {
    position: relative;
    z-index: 999;
    display: flex;
    width: px-to-rem(116px);
    height: px-to-rem(50px);

    justify-content: center;
    align-items: center;

    font-size: px-to-rem(17px);
    line-height: 1;

    border-radius: px-to-rem-multiple(17px 4px);
    background-color: $disabled-bg;
    transform: skew(-14deg);
    transform-origin: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    transition:
      background-color $time-sm $easing,
      transform $time-sm $easing;
    transform-origin: center;
    will-change: transform;

    &__text {
      display: flex;
      align-items: center;
      transform: skew(14deg);
      color: $btn-text-color;

      &::before {
        content: '';
        display: inline-block;
        width: px-to-rem(22px);
        height: px-to-rem(22px);
        background: url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="22" height="23" viewBox="0 0 22 23" fill="none"%3E%3Cpath d="M17.3389 8.47321C17.2997 8.40408 17.2429 8.34657 17.1743 8.30657C17.1056 8.26656 17.0276 8.24548 16.9481 8.24548H11.0639L12.0504 0.707893C12.061 0.607014 12.0373 0.505508 11.9832 0.419718C11.9291 0.333929 11.8476 0.268847 11.752 0.234953C11.6564 0.201059 11.5522 0.200323 11.4561 0.232866C11.3601 0.265409 11.2778 0.329335 11.2224 0.414353L4.06654 12.9512C4.02469 13.0193 4.00176 13.0973 4.0001 13.1771C3.99844 13.257 4.01811 13.3359 4.0571 13.4056C4.09608 13.4754 4.15296 13.5334 4.22187 13.5739C4.29078 13.6143 4.36923 13.6356 4.44913 13.6356H10.2455L9.46366 21.1846C9.45598 21.2851 9.48214 21.3853 9.53798 21.4693C9.59382 21.5532 9.67613 21.6161 9.77181 21.6478C9.8675 21.6796 9.97106 21.6785 10.066 21.6446C10.161 21.6107 10.2419 21.5461 10.2959 21.4609L17.3335 8.92542C17.3743 8.85726 17.3963 8.77949 17.3973 8.70004C17.3982 8.6206 17.3781 8.54233 17.3389 8.47321Z" fill="%231A1A1A"%3E%3C/path%3E%3C/svg%3E')
          center/cover no-repeat;
      }
    }

    &.active {
      background-color: $btn-bg-color;
    }

    &.pulse {
      animation: pulse-counter 0.5s ease-in-out infinite;
    }

    &:disabled {
      pointer-events: none;
      cursor: none;
    }
  }
}

@keyframes pulse-counter {
  0% {
    scale: 1;
  }
  25% {
    scale: 1.1;
  }
  50% {
    scale: 0.9;
  }
  75% {
    scale: 1.1;
  }
  100% {
    scale: 1;
  }
}

@keyframes bounce-catcher {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(5px);
  }
  100% {
    transform: translateY(0);
  }
}

@keyframes float-prize {
  0% {
    transform: translateY(0) scale(0.8);
    opacity: 0;
  }
  20% {
    opacity: 1;
    transform: translateY(-20px) scale(1);
  }
  80% {
    transform: translateY(-20px) scale(1.1);
  }
  100% {
    opacity: 0;
    transform: translateY(-20px) scale(1);
  }
}
</style>
