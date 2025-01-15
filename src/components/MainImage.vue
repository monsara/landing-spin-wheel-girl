<script setup></script>

<template>
  <div>
    <div class="image-container">
      <picture class="image-container__main-image">
        <source
          media="(max-width: 1024px) or (max-height: 719px)"
          srcset="@/assets/images/main-img-mobile.webp"
        />
        <source
          media="(min-width: 64.025em) and (orientation: landscape)"
          srcset="@/assets/images/main-img-wide.webp"
        />
        <img
          src="@/assets/images/main-img-mobile.webp"
          alt="Зображення дівчини"
          loading="eager"
        />
      </picture>
    </div>
  </div>
</template>

<style lang="scss">
@use 'sass:math';
@use '@/assets/styles/scss/abstracts' as *;

$variables: (
  design: (
    w: 390px,
    h: 844px
  ),
  img-container: (
    w: 412px,
    h: 529px,
    offset: (
      bottom: 0,
      right: -95px
    )
  )
);

$flat-vars: generate-flat-vars($variables);

.image-container {
  position: absolute;
  bottom: px-to-rem(ss-var-deep($flat-vars, 'img-container-offset-bottom'));
  right: px-to-rem(ss-var-deep($flat-vars, 'img-container-offset-right'));
  z-index: -1;
  width: px-to-rem(ss-var-deep($flat-vars, 'img-container-w'));

  @include laptop-up {
    $variables: (
      design: (
        w: 1440px,
        h: 900px
      ),
      img-container: (
        w: 703px,
        h: 900px,
        offset: (
          bottom: -94px,
          right: 70px
        )
      )
    );

    $flat-vars: generate-flat-vars($variables);

    right: calc(
      px-to-vw(
          ss-var-deep($flat-vars, 'img-container-offset-right'),
          ss-var-deep($flat-vars, 'img-container-w')
        ) + 2dvh
    );
    bottom: px-to-rem(ss-var-deep($flat-vars, 'img-container-offset-bottom'));
    width: px-to-vw(
      ss-var-deep($flat-vars, 'img-container-w'),
      ss-var-deep($flat-vars, 'design-w')
    );
    max-width: px-to-rem(ss-var-deep($flat-vars, 'img-container-w'));
    max-height: px-to-vmin(
      ss-var-deep($flat-vars, 'img-container-h'),
      ss-var-deep($flat-vars, 'design-h')
    );
  }

  @include critial-laptop-height {
    bottom: px-to-rem(ss-var-deep($flat-vars, 'img-container-offset-bottom'));
    right: px-to-rem(ss-var-deep($flat-vars, 'img-container-offset-right'));
    z-index: -1;
    width: px-to-rem(ss-var-deep($flat-vars, 'img-container-w'));
    max-height: initial;
  }

  &__main-image,
  &__main-image img {
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 1;
  }

  @keyframes slotsSlideBounceOutMobile {
    $angle: -9.3deg;

    0% {
      transform: translateY(100%) rotate($angle);
    }
    20% {
      transform: rotate($angle);
    }
    25% {
      transform: scale(1.05) rotate($angle);
    }
    30%,
    80% {
      transform: scale(1) rotate($angle);
    }
    100% {
      transform: translateY(100%) rotate($angle);
    }
  }

  @keyframes slotsSlideBounceOutTablet {
    $angle: -7deg;

    0% {
      transform: translate(-50%, 100%) rotate($angle);
    }
    20% {
      transform: translateX(-50%) rotate($angle);
    }
    25% {
      transform: translateX(-50%) scale(1.05) rotate($angle);
    }
    30%,
    80% {
      transform: translateX(-50%) scale(1) rotate($angle);
    }
    100% {
      transform: translate(-50%, 100%) rotate($angle);
    }
  }
}
</style>
