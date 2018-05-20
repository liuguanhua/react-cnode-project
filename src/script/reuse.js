import axios from 'axios'
import { getStorage, showMsg } from '@script/utils'
const isDev = Object.is(process.env.NODE_ENV, 'development')
const apiUrl = 'https://cnodejs.org/api/v1/'
/**
 * 公告请求数据
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
          const { data, status } = error.response
          options.error && options.error(data)
          !data.success && data.error_msg && showMsg(data.error_msg)
          reject(data)
        }
      })
  })
}

Object.assign(React.Component.prototype, {
  $request: request,
  $showMsg: showMsg,
  $getStorage: getStorage
})
