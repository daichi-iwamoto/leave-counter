<template>
  <div class="container">
    <h1 @click="submit()" class="title">
      さとにゃん かんし つ～る
    </h1>
    <div :class="{ stay: store_value.state }" class="description">
      <p class="stay-now">さとにゃんは おしごとちゅう（？） のようです</p>
      <p class="leave-now">おやおや？ さとにゃんは <span>おさんぽちゅう</span> のようです</p>
    </div>
    <div class="logo-box">
      <Logo :class="{ stay: store_value.state }" />
    </div>
    <p class="leave-time">
      ほんじつ の りせき ごうけいじかん は...<br>
      <span>{{leave_hour}}</span>じかん <span>{{leave_min}}</span>ふん <span>{{leave_sec}}</span>びょ～！
    </p>
    <button @click="submit()" :class="{ stay: store_value.state }" class="submit-btn">
      {{ btnTxt }}
    </button>
  </div>
</template>

<script>
import WrapRDB from '../plugins/modules/rdb_librarys/WrapRDB'
import RealTime from '../plugins/modules/newRealTime/RealTime'
import Logo from '~/components/Logo.vue'
import firebase from '~/plugins/firebase'

export default {
  components: {
    Logo
  },
  data () {
    return {
      btnTxt: 'いなくなった！',
      leave_hour: '',
      leave_min: '',
      leave_sec: '',
      store_value: {}
    }
  },
  firestore () {
    return {
      store_value: firebase.firestore().collection('leave-time').doc('IZkrWRg1loXHz6gKHX8E')
    }
  },
  mounted () {
    if (this.store_value.state === true) {
      this.btnTxt = 'せきにいるよ'
    } else {
      this.btnTxt = 'いなくなった！'
    }
  },
  beforeUpdate () {
    if (this.store_value.state === true) {
      this.btnTxt = 'せきにいるよ'
    } else {
      this.btnTxt = 'いなくなった！'
    }
    this.leave_hour = Number(this.store_value.total_leave_time.slice(0, 2))
    this.leave_min = Number(this.store_value.total_leave_time.slice(3, 5))
    this.leave_sec = Number(this.store_value.total_leave_time.slice(-2))
  },
  methods: {
    submit () {
      const TimeValue = new Date().toLocaleString()
      const diff = RealTime.init(this.store_value, TimeValue)
      if (this.store_value.state === true) {
        RealTime.setTimeStamp(this.store_value.create_timestamp, this.store_value.leave_time)
        WrapRDB.update(
          {
            leave_time: TimeValue,
            state: false
          }
        )
      } else {
        WrapRDB.update(
          {
            total_leave_time: diff,
            return_time: TimeValue,
            state: true
          }
        )
      }
      console.log('Total Leave Time :' + (this.store_value.total_leave_time))
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

  .leave-time {
    font-family: 'Kosugi Maru', sans-serif;
    width: 100%;
    line-height: 38px;
    padding: 15px;
    letter-spacing: 1px;
    span {
      font-size: 42px;
      font-weight: bold;
      color: #ff4757;
    }
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
