<script setup>
const props = defineProps({
  disableAction: {
    type: Boolean,
    default: false
  }
})

const redirect = () => {
  if (props.disableAction) {
    const currentQuery = window.location.search
    const redirectQuery = currentQuery
      ? `${currentQuery}&sign-up=true`
      : '?sign-up=true'
    window.location.replace(
      `${import.meta.env.VITE_REDIRECT_URL}${redirectQuery}`
    )
  }
}
</script>

<template>
  <button class="btn-cta" @click.once="redirect">
    <span class="btn-cta__text">
      <slot>Отримати</slot>
    </span>
  </button>
</template>

<style lang="scss">
@use '@/assets/styles/scss/abstracts' as *;

$btn-bg-color: #cfff27;
$btn-hovered-bg-color: #afe000;
$btn-text-color: #1a1a1a;

.btn-cta {
  position: relative;
  z-index: 999;
  display: flex;
  width: px-to-rem(224px);
  height: px-to-rem(50px);

  justify-content: center;
  align-items: center;

  font-size: px-to-rem(17px);
  line-height: 1;

  border-radius: px-to-rem-multiple(17px 4px);
  background-color: $btn-bg-color;
  transform: skew(-14deg);
  transform-origin: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition:
    background-color $time-sm $easing,
    transform $time-sm $easing;
  cursor: pointer;
  animation: growCtaBtn 1s ease-in-out infinite alternate;
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

  &:disabled {
    pointer-events: none;
    cursor: none;
  }

  @media (hover: hover) {
    &:hover {
      background-color: $color-7;
      transform: skew(-14deg) scale(0.9);
      animation-play-state: paused;
    }
  }
}

@keyframes growCtaBtn {
  100% {
    transform: scale(1.1) skew(-14deg);
  }
}
</style>
