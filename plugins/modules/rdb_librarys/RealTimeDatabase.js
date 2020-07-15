import FirebaseCore from '../filebase/firebase_core'

export default class RealTimeDatabase {
  constructor () {
    this.rdb_instance = new FirebaseCore('leave-time', 'IZkrWRg1loXHz6gKHX8E')
  }
  Push (PushData) {
    this.rdb_instance.set(PushData)
      .then((response) => {
        return true
      })
    // firebase databaseに反映された
  }
  Fetch () {
    return this.rdb_instance
  }
  Update (payload) {
    return this.rdb_instance.update(payload)
  }
}
