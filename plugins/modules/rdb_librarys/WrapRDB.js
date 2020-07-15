import RealTimeDatabase from './RealTimeDatabase'

export default {
  push (payload) {
    const ins = new RealTimeDatabase()
    ins.Push(payload)
  },
  update (payload) {
    const ins = new RealTimeDatabase()
    ins.Update(payload)
  },
  fetch () {
    return true
  }
}
