import { request } from '@script/reuse'
export default {
  fetchData(accesstoken) {
    return (dispatch, getState) => {
      request({
        url: 'message/count',
        params: {
          accesstoken
        },
        success: result => {
          dispatch(this.fetchDone(result))
        }
      })
    }
  },
  fetchDone(result) {
    return { type: 'UPDATE_NEWS', result: result }
    // return {
    //   type: 'UPDATE_NEWS',
    //   result: {
    //     success: true,
    //     data: 2
    //   }
    // }
  }
}
