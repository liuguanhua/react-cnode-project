import { request } from '@script/reuse'
export default {
  fetchData(id) {
    return (dispatch, getState) => {
      dispatch(this.fetchStart())
      request({
        url: `topic/${id}`,
        success: result => {
          dispatch(this.fetchDone(result))
        },
        error: err => {
          dispatch(this.fetchFail(err))
        }
      })
    }
  },
  fetchStart: () => ({ type: 'FETCH_START' }),
  fetchDone(result) {
    return { type: 'FETCH_DONE', result: result }
  },
  fetchFail(err) {
    return { type: 'FETCH_Fail', result: err }
  }
}
