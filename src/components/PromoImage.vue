<script setup></script>

<template>
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
        alt="Зображення Зевса"
        loading="eager"
      />
    </picture>
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
    w: 537px,
    h: 669px,
    offset: (
      bottom: 0,
      right: -200px
    )
  )
);

$flat-vars: generate-flat-vars($variables);

.image-container {
  position: absolute;
  bottom: px-to-rem(ss-var-deep($flat-vars, 'img-container-offset-bottom'));
  right: px-to-rem(ss-var-deep($flat-vars, 'img-container-offset-right'));
  z-index: -2;
  width: px-to-rem(ss-var($flat-vars, 'img-container-w'));

  @include tablet-landscape {
    $variables: (
      design: (
        w: 1024px,
        h: 768px
      ),
      img-container: (
        w: 537px,
        h: 669px,
        offset: (
          bottom: 0,
          right: 0
        )
      )
    );

    $flat-vars: generate-flat-vars($variables);

    bottom: px-to-rem(ss-var-deep($flat-vars, 'img-container-offset-bottom'));
    right: px-to-rem(ss-var-deep($flat-vars, 'img-container-offset-right'));
  }

  @include laptop-up {
    $variables: (
      design: (
        w: 1440px,
        h: 900px
      ),
      img-container: (
        w: 827px,
        h: 877px,
        offset: (
          bottom: 0,
          right: 0
        )
      )
    );

    $flat-vars: generate-flat-vars($variables);

    bottom: px-to-rem(ss-var-deep($flat-vars, 'img-container-offset-bottom'));
    right: px-to-rem(ss-var-deep($flat-vars, 'img-container-offset-right'));
    width: px-to-vmax(
      ss-var-deep($flat-vars, 'img-container-w'),
      ss-var-deep($flat-vars, 'design-w')
    );
    // max-width: px-to-rem(ss-var-deep($flat-vars, 'img-container-w'));
    max-height: 100%;
    padding-top: px-to-rem(26px);
  }

  @include critial-laptop-height {
    $variables: (
      design: (
        w: 1024px,
        h: 768px
      ),
      img-container: (
        w: 537px,
        h: 669px,
        offset: (
          bottom: 0,
          right: 0
        )
      )
    );

    $flat-vars: generate-flat-vars($variables);

    bottom: px-to-rem(ss-var-deep($flat-vars, 'img-container-offset-bottom'));
    right: px-to-rem(ss-var-deep($flat-vars, 'img-container-offset-right'));
  }

  &__main-image,
  &__main-image img {
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 1;
    animation: animateMainImage 7s linear infinite alternate;
  }

  @keyframes growDecorElems {
    to {
      transform: scale(1.2);
    }
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

  @keyframes animateMainImage {
    100% {
      transform: scale(1.02);
    }
  }
}
</style>
