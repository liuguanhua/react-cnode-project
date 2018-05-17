import axios from 'axios'
import { userExp, showMsg } from '@script/utils'
const isDev = process.env.NODE_ENV === 'development'
const apiUrl = 'https://cnodejs.org/api/v1/'
/**
 * 请求数据
 * @param {Object} options
 * @returns
 */
export const request = options => {
  options.method = options.method || 'get'
  const sendData = Object.is(options.method.toLowerCase(), 'post')
    ? {
        data: options.data
      }
    : {}
  return new Promise((resolve, reject) => {
    axios({
      method: options.method,
      url: `${apiUrl}${options.url}`,
      params: options.params || {},
      ...sendData
    })
      .then(response => {
        const result = response.data
        options.success && options.success(result)
        resolve(result)
      })
      .catch(error => {
        isDev && console.error(error)
        if (error.response) {
          const [errData, errStatus] = [
            error.response.data,
            error.response.status
          ]
          options.error && options.error(errData)
          !errData.success && errData.error_msg && showMsg(errData.error_msg)
          reject(errData)
        }
      })
  })
}

Object.assign(React.Component.prototype, {
  $request: request,
  $showMsg: showMsg,
  $userExp: userExp
})
