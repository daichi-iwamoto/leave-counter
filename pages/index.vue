<template>
  <div class="container">
    <h1 @click="submit()" class="title">
      さとにゃん おさんぽ かんし つ～る
    </h1>
    <div class="logo-box">
      <logo />
    </div>
    <button @click="submit()" :class="{ stay: flag }" class="submit-btn">
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
      flag: false
    }
  },
  mounted () {
    const db = firebase.firestore()
    const status = db.collection('leave-time').doc('IZkrWRg1loXHz6gKHX8E')

    status.get().then((doc) => {
      if (doc.exists) {
        if (doc.data().state === true) {
          this.btnTxt = 'せきにいるよ'
          this.flag = true
        } else {
          this.btnTxt = 'いなくなった！'
          this.flag = false
        }
      } else {
        console.log('error')
      }
    }).catch((error) => {
      console.log('api error :' + error)
    })
  },
  methods: {
    submit () {
      const db = firebase.firestore()
      const status = db.collection('leave-time').doc('IZkrWRg1loXHz6gKHX8E')

      status.get().then((doc) => {
        if (doc.exists) {
          if (doc.data().state === true) {
            status.set({
              state: false
            })
            this.btnTxt = 'いなくなった！'
            this.flag = false
          } else {
            status.set({
              state: true
            })
            this.btnTxt = 'せきにいるよ'
            this.flag = true
          }
        } else {
          console.log('error')
        }
      }).catch((error) => {
        console.log('api error :' + error)
      })
    }
  }
}
</script>

<style lang="scss">
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  text-align: center;

  .title {
    font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
      "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    display: block;
    font-weight: 300;
    font-size: 40px;
    color: #35495e;
    letter-spacing: 1px;
  }

  .logo-box {
    width: 100%;
  }
}
</style>
