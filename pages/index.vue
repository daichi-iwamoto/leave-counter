<template>
  <div class="container">
    <h1 @click="submit()" class="title">
      さとにゃん かんし つ～る
    </h1>
    <div :class="{ stay: flag.state }" class="description">
      <p class="stay-now">さとにゃんは おしごとちゅう（？） のようです</p>
      <p class="leave-now">おやおや？ さとにゃんは <span>おさんぽちゅう</span> のようです</p>
    </div>
    <div class="logo-box">
      <Logo :class="{ stay: flag.state }" />
    </div>
    <button @click="submit()" :class="{ stay: flag.state }" class="submit-btn">
      {{ btnTxt }}
    </button>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'
import firebase from '~/plugins/firebase'

export default {
  components: {
    Logo
  },
  data () {
    return {
      btnTxt: 'いなくなった！',
      flag: {}
    }
  },
  firestore () {
    return {
      flag: firebase.firestore().collection('leave-time').doc('IZkrWRg1loXHz6gKHX8E')
    }
  },
  mounted () {
    if (this.flag.state === true) {
      this.btnTxt = 'せきにいるよ'
    } else {
      this.btnTxt = 'いなくなった！'
    }
  },
  beforeUpdate () {
    if (this.flag.state === true) {
      this.btnTxt = 'せきにいるよ'
    } else {
      this.btnTxt = 'いなくなった！'
    }
  },
  methods: {
    submit () {
      const db = firebase.firestore()
      const status = db.collection('leave-time').doc('IZkrWRg1loXHz6gKHX8E')

      if (this.flag.state === true) {
        status.set({
          state: false
        })
      } else {
        status.set({
          state: true
        })
      }
    }
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Kosugi+Maru&display=swap');

.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-content: flex-start;
  flex-wrap: wrap;
  text-align: center;

  .title {
    font-family: 'Kosugi Maru', sans-serif;
    display: block;
    font-weight: 300;
    font-size: 40px;
    color: #35495e;
    letter-spacing: 1px;
    width: 100%;
    padding: 30px 0;
  }

  .description {
    width: 100%;
    padding: 10px 0;
    font-family: 'Kosugi Maru', sans-serif;

    span {
      color: #ff4757;
    }

    .stay-now, .leave-now {
      font-size: 14px;
    }

    .stay-now {
      display: block;
    }
    .leave-now {
      display: none;
    }

    &.stay {
      .stay-now {
        display: none;
      }
      .leave-now {
        display: block;
      }
    }
  }

  .logo-box {
    width: 100%;
    height: 500px;
    text-align: center;
    position: relative;
  }

  .submit-btn {
    font-family: 'Kosugi Maru', sans-serif;
    padding: 20px;
    font-size: 18px;
    border-radius: 5px;
    border: none;
    color: #f5f5f5;
    background-color: #ff4757;
    &.stay {
      color: #222f3e;
      background-color: #48dbfb;
    }
  }
}

@media screen and (max-width: 559px) {
  .container {
    .title {
      font-weight: 300;
      font-size: 24px;
      color: #35495e;
      letter-spacing: 1px;
    }
  }
}
</style>
