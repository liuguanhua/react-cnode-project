import Rstore from 'store'
import history from '@script/history'

/**
 * 算时间差
 * @param {Date} hisTime 历史时间
 * @param {Date} nowTime 当前时间
 * @returns
 */

export const formatDate = (hisTime, nowTime = new Date()) => {
  let result = null
  const diffValue = +new Date(nowTime) - +new Date(hisTime)
  const minute = 1000 * 60
  const hour = minute * 60
  const day = hour * 24
  const halfamonth = day * 15
  const month = day * 30
  const year = month * 12

  const [_year, _month, _week, _day, _hour, _min] = [
    diffValue / year,
    diffValue / month,
    diffValue / (7 * day),
    diffValue / day,
    diffValue / hour,
    diffValue / minute
  ]
  if (_year >= 1) result = parseInt(_year) + '年前'
  else if (_month >= 1) result = parseInt(_month) + '个月前'
  else if (_week >= 1) result = parseInt(_week) + '周前'
  else if (_day >= 1) result = parseInt(_day) + '天前'
  else if (_hour >= 1) result = parseInt(_hour) + '个小时前'
  else if (_min >= 1) result = parseInt(_min) + '分钟前'
  else result = '刚刚'
  return result
}
/**
 * 提示弹窗
 * @param {String} msg 提示信息
 */
export const showMsg = msg => {
  typeof tipTime !== 'undefined' && tipTime && clearTimeout(tipTime)
  const formMsg = document.getElementById('form-msg')
  if (formMsg) {
    formMsg.style.display = 'block'
    formMsg.innerHTML =
      "<div layout-align='center center' layout>" + msg + '</div>'
  } else {
    const sDiv = document.createElement('div')
    sDiv.id = 'form-msg'
    sDiv.className = 'tc form-msg'
    sDiv.innerHTML =
      "<div layout-align='center center' layout>" + msg + '</div>'
    document.getElementsByTagName('body')[0].appendChild(sDiv)
  }
  const tipTime = setTimeout(
    () => (document.getElementById('form-msg').style.display = 'none'),
    1000
  )
}
/**
 * 存储数据
 * @param {String} key 名称
 * @param {Object} value 数据
 */
export const setStorage = (key, value) => {
  value['setKeyTime'] = +new Date()
  Rstore.set(key, value)
}

/**
 * 获取用户存储信息
 *
 * @returns
 */
export const getStorage = () => {
  const userInfo = Rstore.get('USER_INFO')
  if (userInfo && userInfo.accesstoken) {
    return userInfo
  }
  return false
}
