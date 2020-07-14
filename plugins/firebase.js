import firebase from 'firebase'

if (!firebase.apps.length) {
  firebase.initializeApp(
    {
      apiKey: 'AIzaSyA9uyoGliBBCz5OgbIaWXXBOiy07g_LSAs',
      authDomain: 'leave-counter-236ec.firebaseapp.com',
      databaseURL: 'https://leave-counter-236ec.firebaseio.com',
      projectId: 'leave-counter-236ec',
      storageBucket: 'leave-counter-236ec.appspot.com',
      messagingSenderId: '814676635897',
      appId: '1:814676635897:web:1be1daa80317d7a2a13228',
      measurementId: 'G-L82ERW19LJ'
    }
  )
}

export default firebase
