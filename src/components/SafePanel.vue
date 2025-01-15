<script setup lang="ts">
const props = defineProps({
  tag: {
    type: String,
    default: 'footer'
  }
})
</script>

<template>
  <component :is="props.tag">
    <ul class="safe-panel">
      <li class="safe-panel__item">
        <img
          class="image"
          src="@/assets/images/ipay.webp"
          width="50"
          height="30"
          alt="Apple Pay"
        />
      </li>
      <li class="safe-panel__item">
        <img
          class="image"
          src="@/assets/images/gpay.webp"
          width="50"
          height="30"
          alt="Google Pay"
        />
      </li>
      <li class="safe-panel__item">
        <img
          class="image"
          src="@/assets/images/visa.webp"
          width="50"
          height="30"
          alt="Visa"
        />
      </li>
      <li class="safe-panel__item">
        <img
          class="image"
          src="@/assets/images/mastercard.webp"
          width="50"
          height="30"
          alt="MasterCard"
        />
      </li>
      <li class="safe-panel__item">
        <img
          class="image"
          src="@/assets/images/age.webp"
          width="50"
          height="30"
          alt="Age 21+"
        />
      </li>
    </ul>
  </component>
</template>

<style lang="scss">
@use '@/assets/styles/scss/abstracts' as *;
@use 'sass:math';

.safe-panel {
  display: flex;
  padding: px-to-rem-multiple(3px 15px);
  align-items: center;
  justify-content: center;
  border: 1px dashed #373737;
  background: rgba(17, 17, 17, 0.8);
  gap: px-to-rem(23px);

  @include laptop-up {
    min-width: px-to-rem(275px);
    width: max-content;
    padding: px-to-rem-multiple(5px 15px);
    gap: px-to-rem(12px);
    border-radius: px-to-rem(7px);
  }

  @include critial-laptop-height {
    min-width: initial;
    width: initial;
    padding: px-to-rem-multiple(3px 15px);
    gap: px-to-rem(23px);
    border-radius: initial;
  }

  &__item {
    width: px-to-rem(30px);

    @include laptop-up {
      width: px-to-rem(46px);
    }

    @include critial-laptop-height {
      width: px-to-rem(30px);
    }
  }

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
