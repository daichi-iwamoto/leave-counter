<template>
  <div class="Logo">
    <div class="stay-img">
      <img src="~/assets/img/satonyan01.png" alt="さとにゃん" class="sato01">
      <img src="~/assets/img/satonyan02.png" alt="さとにゃん" class="sato02">
    </div>
    <div class="leave-img">
      <img src="~/assets/img/satonyan03.png" alt="さとにゃん" class="sato03">
      <img src="~/assets/img/satonyan04.png" alt="さとにゃん" class="sato04">
    </div>
  </div>
</template>

<style lang="scss">
.Logo {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  max-width: 1000px;
  height: 100%;
  margin: 0 auto;

  .stay-img {
    display: block;
  }
  .leave-img {
    display: none;
  }

  .stay-img, .leave-img {
    top: 0;
    left: 0;
    width: 100%;
    img {
      max-width: 50%;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      z-index: -1;
      &.sato01 {
        animation-name: show-stay;
        animation-duration: 15s;
        animation-iteration-count: infinite;
        animation-fill-mode: forwards;
      }
      &.sato02 {
        opacity: 0;
        animation-name: show-stay;
        animation-duration: 15s;
        animation-iteration-count: infinite;
        animation-fill-mode: forwards;
        animation-delay: 7.5s;
      }
    }
  }

  &.stay {
    .stay-img {
      display: none;
    }
    .leave-img {
      display: block;
    }
    .sato03 {
        animation-name: show-leave03;
        animation-duration: 15s;
        animation-iteration-count: infinite;
        animation-fill-mode: forwards;
    }
    .sato04 {
      opacity: 0;
      animation-name: show-leave04;
      animation-duration: 15s;
      animation-iteration-count: infinite;
      animation-fill-mode: forwards;
      animation-delay: 7.5s;
    }
  }
}

@keyframes show-stay {
  0% {
    opacity: 0;
    width: 0;
  }
  10% {
    width: 50%;
  }
  15% {
    opacity: 1;
    width: 45%;
  }
  49% {
    opacity: 1;
    width: 45%;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
}

@keyframes show-leave03 {
  0% {
    opacity: 0;
    width: 0;
    margin-left: 50%;
  }
  10% {
    width: 50%;
    margin-left: -20%;
  }
  15% {
    opacity: 1;
    width: 45%;
    margin-left: -20%;
  }
  49% {
    opacity: 1;
    width: 45%;
    margin-left: -20%;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
}

@keyframes show-leave04 {
  0% {
    opacity: 0;
    width: 0;
    margin-right: 50%;
  }
  10% {
    width: 50%;
    margin-right: -20%;
  }
  15% {
    opacity: 1;
    width: 45%;
    margin-right: -20%;
  }
  49% {
    opacity: 1;
    width: 45%;
    margin-right: -20%;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
}
</style>
