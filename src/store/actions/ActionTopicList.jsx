export default {
  keepTopic: (data, page) => (dispatch, getState) => {
    return dispatch(
      (() => {
        return {
          type: 'SAVE_TOPIC',
          page,
          result: getState().rTopicList.result.concat(data)
        }
      })()
    )
  },
  recordScrollSite: scrollTop => (dispatch, getState) => {
    return dispatch(
      (() => {
        return {
          type: 'SCROLL_TOP_SITE',
          scrollTop
        }
      })()
    )
  }
}
