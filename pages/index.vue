<template>
  <div class="container">
    <div>
      <logo />
      <h1 @click="submit()" class="title">
        leave-counter
      </h1>
      <h2 class="subtitle">
        My beautiful Nuxt.js project
      </h2>
      <div class="links">
        <a
          href="https://nuxtjs.org/"
          target="_blank"
          class="button--green"
        >
          Documentation
        </a>
        <a
          href="https://github.com/nuxt/nuxt.js"
          target="_blank"
          class="button--grey"
        >
          GitHub
        </a>
      </div>
    </div>
    <button @click="submit()">
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
      btnTxt: 'いなくなった！'
    }
  },
  mounted () {
    const db = firebase.firestore()
    const status = db.collection('leave-time').doc('IZkrWRg1loXHz6gKHX8E')

    status.get().then((doc) => {
      if (doc.exists) {
        if (doc.data().state === true) {
          this.btnTxt = 'せきにいるよ'
        } else {
          this.btnTxt = 'いなくなった！'
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
          } else {
            status.set({
              state: true
            })
            this.btnTxt = 'せきにいるよ'
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

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
