<script setup>
import { computed } from 'vue'
import BadgedText from '@/components/BadgedText.vue'

const props = defineProps({
  value: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  withLabel: {
    type: Boolean,
    default: false
  },
  tag: {
    type: String,
    default: 'div'
  }
})

const extractedValue = computed(() => {
  const match = props.value.match(/[\d.]+/)
  return match ? match[0] : ''
})

const bonusName = computed(() => {
  switch (props.name) {
    case 'депозит':
      return 'депозит'
    case 'fs':
      return 'фріспінов'
    case 'грн':
      return 'гривень'
    default:
      return props.name
  }
})
</script>

<template>
  <component
    :is="props.tag"
    class="bonus"
    :class="{ 'promo-bonus--large': props.withLabel }"
  >
    <BadgedText v-if="props.withLabel" tag="span" color="purple"
      >Бонус</BadgedText
    >
    <span class="bonus__value">
      +<span class="bonus__value-extracted">{{ extractedValue }}</span>
      <template v-if="props.name === 'депозит'">%</template>
    </span>
    <span class="bonus__name">{{ bonusName }}</span>
  </component>
</template>

<style lang="scss">
@use '@/assets/styles/scss/abstracts' as *;

.bonus {
  position: relative;
  display: flex;
  flex-flow: column;
  align-items: center;
  color: $color-2;
  gap: 6px;

  font-family: 'Venus Rising Bold';
  border-radius: 9px;

  &__value {
    position: relative;
    display: flex;
    text-align: center;
    align-items: baseline;
    color: #c4f221;
    font-size: 20px;
    line-height: 1;

    .bonus--large & {
      font-size: px-to-rem(57px);

      &:before {
        content: '';
        position: absolute;
        top: px-to-rem(-25px);
        left: px-to-rem(-57px);

        display: block;
        width: px-to-rem(330px);
        height: px-to-rem(150px);
        // background: url('@/assets/images/green-light.png') center / cover
        //   no-repeat;
      }
    }

    .bonus__unit {
      display: flex;
      align-items: center;

      .badged-text {
        margin-bottom: 0;
        margin-left: px-to-rem(10px);
        padding-right: 10px;
        padding-left: 10px;
        color: $color-1;
      }
    }
  }

  &__value-extracted {
    font-size: px-to-rem(32px);

    @include laptop-up {
      font-size: px-to-rem(34);
    }
  }

  &__name {
    font-size: px-to-rem(14px);

    @include laptop-up {
      font-size: px-to-rem(15px);
    }
  }

  &--large {
    &::before,
    &::after {
      content: '';
      position: absolute;
      display: block;
      width: px-to-rem(17px);
      height: px-to-rem(43px);
      background: center / cover no-repeat;
    }

    &::before {
      left: px-to-rem(9px);
      top: px-to-rem(15px);
      // background-image: url('@/assets/images/sparkles-left.png');
    }

    &::after {
      top: px-to-rem(40px);
      right: px-to-rem(-15px);
      // background-image: url('@/assets/images/sparkles-right.png');
    }
  }

  & > .badged-text {
    position: relative;
    margin-bottom: px-to-rem(10px);
    padding-left: px-to-em-multiple(20px);
    padding-right: px-to-em-multiple(20px);

    &:before {
      content: '';
      position: absolute;
      display: block;
      top: px-to-rem(-25px);
      left: 50%;

      width: px-to-rem(230px);
      height: px-to-rem(150px);

      // background: url('@/assets/images/purple-light.png') center / cover
      //   no-repeat;
      transform: translateX(-50%) skew(15deg);
    }
  }
}
</style>
