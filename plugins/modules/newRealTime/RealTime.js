import moment from 'moment'
import WrapRDB from '~/plugins/modules/rdb_librarys/WrapRDB'

export default {
  init (storeValue, returnTime) {
    const leave = storeValue.leave_time
    const rtrnTime = returnTime

    let diff = moment().diff(leave, rtrnTime)

    diff = this.converter(diff)

    let total = storeValue.total_leave_time /* 今日の差分 */
    total = new Date(total.toString().includes('NaN') < 0 ? '2020/01/01 0:0:0' : '2020/01/01 ' + total)
    try {
      this.err = new Date('2020/01/01 ' + storeValue.total_leave_time)
    } catch (e) {
      /* 書式的エラーの時 */
      WrapRDB.update({
        total_leave_time: '0:0:0'
      })
      total = new Date('2020/01/01 0:0:0')
    }
    if (new Date().getDay() !== new Date(storeValue.create_timestamp).getDay()) {
      WrapRDB.update({
        total_leave_time: this.converter(diff),
        create_timestamp: new Date().toLocaleString(),
        state: true
      })
      return true
    }
    diff = '2020/01/01 ' + diff
    const pls = this.converter((total.getTime() + new Date(diff).getTime()))
    // console.log(pls)
    return pls
  },
  converter (diffTime) {
    const t = diffTime
    const s = parseInt(t / 1000)
    const sM = s % 60
    const m = parseInt(t / 60)
    const mM = m % 60
    const h = parseInt(t / 60 / 60)

    return this.zero(h) + ':' + this.zero(mM) + ':' + this.zero(sM)
  },
  zero (num) {
    num = num.toString()
    return num.length === 2 ? num : '0' + num.toString()
  }
}
