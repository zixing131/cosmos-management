import dayjs from 'dayjs'
import config from '../config/default'
import jsonwebtoken from 'jsonwebtoken'

const tools = {
  getExpires(expires) {
    return Math.floor(Date.now() / 1000) + expires
  },
  verifyToken(token) {
    let res = ''
    let result = jsonwebtoken.verify(token, config.secret) || {}
    const { exp } = result
    const current = Math.floor(Date.now() / 1000)
    if (current <= exp) {
      result.remainingTime = exp - current
      res = result
    }
    return res
  },
  getExpires(expires) {
    return Math.floor(Date.now() / 1000) + expires
  },
  getClientIp(req) {
    var ip =
      req.headers['x-forwarded-for'] ||
      req.ip ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress ||
      ''
    if (ip.split(',').length > 0) {
      ip = ip.split(',')[0]
    }
    return ip
  },
  getRandom(count = 3) {
    let str = ''
    for (let i = 0; i < count; i++) {
      str += Math.floor(Math.random() * 10)
    }
    return str
  },
  createOrderNumber() {
    let pre = this.getRandom(2)
    let next = this.getRandom(4)
    return pre + dayjs().format('MMDDhh') + next
  },
  // 深拷贝
  deepClone(source) {
    if (!source || typeof source !== 'object') {
      return source
    }
    var targetObj = source.constructor === Array ? [] : {}
    for (var keys in source) {
      if (source.hasOwnProperty(keys)) {
        if (source[keys] && typeof source[keys] === 'object') {
          targetObj[keys] = source[keys].constructor === Array ? [] : {}
          targetObj[keys] = this.deepClone(source[keys])
        } else {
          targetObj[keys] = source[keys]
        }
      }
    }
    return targetObj
  },
  deepCopyArray(arr) {
    return JSON.parse(JSON.stringify(arr))
  },
  quickSort(array) {
    // 快速排序
    var i = 0
    var j = array.length - 1
    var sort = function (i, j) {
      // 结束条件
      if (i == j) {
        return
      }

      var key = array[i]
      var stepi = i
      var stepj = j
      while (j > i) {
        if (array[j] >= key) {
          j--
        } else {
          array[i] = array[j]
          while (j > ++i) {
            if (array[i] > key) {
              array[j] = array[i]
              break
            }
          }
        }
      }

      // 如果第一个取出的 key 是最小的数
      if (stepi == i) {
        sort(++i, stepj)
        return
      }

      // 最后一个空位留给 key
      array[i] = key

      // 递归
      sort(stepi, i)
      sort(j, stepj)
    }

    sort(i, j)

    return array
  },
  // 判断是否有值
  isNothing(value) {
    return (
      value === '' ||
      value === undefined ||
      value === null ||
      (typeof value === 'number' && (isNaN(value) || !isFinite(value)))
    )
  },
  // 将数据中增加key字段
  addKey(data) {
    const _data = this.deepClone(data)
    if (_data && _data instanceof Array) {
      return _data.map((val, index) => {
        val.key = Date.now() + index
        return val
      })
    }
  },
  // 将分的数据转换为元，并且保留2位小数
  formatMoney(num) {
    if (this.isNothing(num)) {
      return '-'
    }
    num /= 100
    num = num.toFixed(2)
    num = num.replace(/\B(?=(?:\d{3})+\b)/g, ',')
    return num
  },
  // 分转化为元
  toYuan(value) {
    if (this.isNothing(value)) {
      return
    }
    value = parseInt(value, 10)
    return value / 100
  },
  // 保留两位小数
  toYuanNew(value) {
    if (this.isNothing(value)) {
      return
    }
    value = parseInt(value, 10)
    return (value / 100).toFixed(2)
  },
  // 元转化为分
  toCent(value) {
    if (this.isNothing(value)) {
      return
    }
    value = parseFloat(value)
    // 解决浮点数计算bug
    return parseInt(value.toFixed(2) * 100, 10)
  },
  // 拼接URL请求参数
  serialize(obj) {
    const str = []
    for (let p in obj) {
      if (obj.hasOwnProperty(p)) {
        str.push(
          encodeURIComponent(p) +
          '=' +
          encodeURIComponent(this.isNothing(obj[p]) ? '' : obj[p])
        )
      }
    }
    return str.join('&')
  },
  updateQueryStringParameter(uri, key, value) {
    var re = new RegExp('([?&])' + key + '=.*?(&|$)', 'i')
    var separator = uri.indexOf('?') !== -1 ? '&' : '?'
    if (uri.match(re)) {
      return uri.replace(re, '$1' + key + '=' + value + '$2')
    } else {
      return uri + separator + key + '=' + value
    }
  },
  formatNum(num) {
    if (this.isNothing(num)) {
      return '-'
    }
    num /= 100
    num = num.toFixed(2)
    num = num.replace(/\B(?=(?:\d{3})+\b)/g, ',')
    return num
  },
  formatPercent(num) {
    if (this.isNothing(num)) {
      return '-'
    }
    num = num.toFixed(2)
    return num
  },
  hourMinuteToDate(hourMinute) {
    return dayjs(dayjs().format('YYYY-MM-DD') + ' ' + hourMinute)
  },
  timeToInt(time) {
    return parseInt(time.replace(/:/g, ''))
  },
  checkRange(a, b, x, y) {
    console.log(a, b, x, y)
    return y < a || b < x
  },
  // startTime、endTime is number
  checkListRange(list, startTime, endTime) {
    let isConflict = true
    if (Array.isArray(list)) {
      list.map(item => {
        if (
          item.startTime &&
          item.endTime &&
          startTime &&
          endTime &&
          !this.checkRange(item.startTime, item.endTime, startTime, endTime)
        ) {
          isConflict = false
        }
      })
    }
    return isConflict
  },
  getEabledTime({
    list,
    startTime,
    endTime,
    interval = 60,
    gap = 10,
    hourTime = []
  }) {
    let timeList = []
    let enabledList = []
    console.log(startTime, endTime)

    if (startTime && endTime) {
      console.log(startTime, endTime, interval, gap)
      // 间隔时间
      startTime = this.hourMinuteToDate(startTime)
      endTime = this.hourMinuteToDate(endTime).add(0 - interval + gap, 'minute')

      let diff = endTime.diff(startTime, 'minute')
      for (let i = 0; i < diff; i++) {
        let current = startTime.add(i + 1, 'minute')
        if (endTime.isAfter(current) && enabledList.find(item => item.startTime === current.format('HH:mm')) === undefined) {
          if (Array.isArray(hourTime) && hourTime.length > 0) {
            const currentMinute = current.format('mm')
            if (hourTime.includes(currentMinute)) {
              enabledList.push({
                startTime: current.format('HH:mm'),
                endTime: current.add(interval, 'minute').format('HH:mm')
              })
            }
          } else {
            enabledList.push({
              startTime: current.format('HH:mm'),
              endTime: current.add(interval, 'minute').format('HH:mm')
            })
          }
        } else {
          break
        }
      }
    }

    if (Array.isArray(list) && list.length > 0) {
      enabledList.map(enabled => {
        list.map(item => {
          if (
            item.startTime &&
            item.endTime &&
            enabled.startTime &&
            enabled.endTime
          ) {
            if (
              this.checkRange(
                this.timeToInt(item.startTime),
                this.timeToInt(item.endTime),
                this.timeToInt(enabled.startTime) - gap,
                this.timeToInt(enabled.endTime) + gap
              )
            ) {
              timeList.push({
                startTime: enabled.startTime,
                endTime: enabled.endTime
              })
            }
          }
        })
      })
      return timeList
    }
    return enabledList
  },

  unique(arr) {
    if (!Array.isArray(arr)) {
      console.log('type error!')
      return
    }
    var array = [];
    for (var i = 0; i < arr.length; i++) {
      if (array.indexOf(arr[i]) === -1) {
        array.push(arr[i])
      }
    }
    return array;
  }
}

module.exports = tools
