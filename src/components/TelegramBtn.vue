<script setup></script>

<template>
  <a class="btn-telegram" href="https://t.me">
    <span class="btn-telegram__text"> <slot />Telegram </span>
  </a>
</template>

<style lang="scss">
@use '@/assets/styles/scss/abstracts' as *;

$btn-bg-color: #039be5;
$btn-hovered-bg-color: #007ab6;
$btn-text-color: #fff;

.btn-telegram {
  position: relative;
  display: flex;
  width: px-to-rem(300px);
  height: px-to-rem(60px);

  justify-content: center;
  align-items: center;

  font: 500 normal px-to-rem(20px) 'Inter';
  line-height: 1;

  border-radius: px-to-rem(46px);
  background-color: $btn-bg-color;
  cursor: pointer;
  animation: growTelegramBtn 1s ease-in-out infinite alternate;
  animation-play-state: paused;
  will-change: transform;

  @include laptop-up {
    width: px-to-rem(260px);
    transition:
      background-color $time-sm $easing,
      transform $time-sm $easing;
  }

  &__text {
    display: flex;
    align-items: center;
    color: $btn-text-color;

    &::before {
      content: '';
      display: inline-block;
      width: 22px;
      height: 22px;
      margin-right: 8px;

      background: url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none"%3E%3Cpath d="M2.26784 9.43789L19.9442 2.62248C20.7646 2.32609 21.4812 2.82262 21.2153 4.06317L21.2169 4.06164L18.2071 18.241C17.9841 19.2462 17.3867 19.4907 16.551 19.0171L11.9677 15.6391L9.757 17.7689C9.51256 18.0133 9.30631 18.2196 8.8327 18.2196L9.15811 13.5553L17.6526 5.88123C18.0223 5.55581 17.5701 5.37248 17.0827 5.69637L6.58534 12.3055L2.06006 10.8939C1.0777 10.5822 1.05631 9.9115 2.26784 9.43789Z" fill="white"%3E%3C/path%3E%3C/svg%3E')
        no-repeat center;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;

      vertical-align: middle;
    }

    span {
      @include laptop-up {
        display: none;
      }
    }
  }

  &:hover {
    background-color: $btn-hovered-bg-color;
    text-decoration: none;
  }

  @media (hover: hover) {
    &:hover {
      background-color: $color-12;
      animation-play-state: paused;
    }
  }
}

@keyframes growTelegramBtn {
  to {
    transform: scale(1.1);
  }
}
</style>
