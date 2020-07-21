import WrapRDB from '~/plugins/modules/rdb_librarys/WrapRDB'

export default {
  setTimeStamp (dbTimeStamp) {
    const dbDay = new Date(dbTimeStamp)
    const todayDay = new Date(new Date().toLocaleString())
    if (dbDay.getDay() !== todayDay.getDay()) {
      WrapRDB.update(
        {
          'create_timestamp': todayDay.toLocaleString()
        }
      )
      return true
    } else {
      this.realTimeUpdate(true, dbTimeStamp)
      return false
    }
  },
  /***
   * @param updateFlag
   * @param dbLeaveTime 佐藤さんが離席したタイミング
   */
  realTimeUpdate (updateFlag, dbLeaveTime) {
    const leaveTime = this.rtnLeave(dbLeaveTime)
    const time = `${leaveTime.hour}:${leaveTime.min}:${leaveTime.micro.slice(0, 2)},${leaveTime.micro.slice(2, 5)}`
    if (updateFlag) {
      WrapRDB.update(
        {
          'total_leave_time': time
        }
      )
    } else {
      const plusUpdate = this.plusLeave(time, WrapRDB.fetch())
      WrapRDB.update(
        {
          'total_leave_time': `${plusUpdate.hour}:${plusUpdate.min}:${plusUpdate.micro.slice(0, 2)},${plusUpdate.micro.slice(2, 5)}`
        }
      )
    }
  },
  rtnLeave (dbLeave) {
    const duration = new Date(new Date().toLocaleString()) - new Date(dbLeave)
    const hour = Math.floor(duration / 3600000)
    const minute = Math.floor((duration - 3600000 * hour) / 60000)

    const hh = ('00' + hour).slice(-2)
    const mm = ('00' + minute).slice(-2)
    const ms = ('00000' + (duration % 60000)).slice(-5)
    return {
      hour: hh,
      min: mm,
      micro: ms
    }
  },
  /***
   * @param plusLeaveTime 足す値(Collection => String)
   * @param dbLeaveTime 現在のトータル時間のコレクションオブジェクト(String)
   */
  plusLeave (plusLeaveTime, dbLeaveTime) {
    const plusTime = new Date(plusLeaveTime.total_leave_time) + new Date(dbLeaveTime)
    const durationS = new Date(plusTime)
    const hourS = Math.floor(durationS / 3600000)
    const minuteS = Math.floor((durationS - 3600000 * hourS) / 60000)

    const hh = ('00' + hourS).slice(-2)
    const mm = ('00' + minuteS).slice(-2)
    const ms = ('00000' + (durationS % 60000)).slice(-5)
    return {
      hour: hh,
      min: mm,
      micro: ms
    }
  }
}
