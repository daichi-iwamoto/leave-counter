<template>
  <div class="Logo">
    <img src="~/assets/img/satonyan01.png" alt="さとにゃん1" class="sato01">
    <img src="~/assets/img/satonyan02.png" alt="さとにゃん2" class="sato02">
  </div>
</template>

<style lang="scss">
.Logo {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  max-width: 100%;

  img {
    max-width: 50%;
    position: absolute;
    &.sato01 {
      animation-name: show;
      animation-duration: 15s;
      animation-iteration-count: infinite;
      animation-fill-mode: forwards;
    }
    &.sato02 {
      opacity: 0;
      animation-name: show;
      animation-duration: 15s;
      animation-iteration-count: infinite;
      animation-fill-mode: forwards;
      animation-delay: 7.5s;
    }
  }

  @keyframes show {
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
}
</style>
