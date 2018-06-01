export default {
  keepTopic: res => (dispatch, getState) => {
    const { page, data, type, isReset } = res
    return dispatch(
      (() => {
        return {
          type: 'SAVE_TOPIC',
          page,
          topicType: type,
          result: isReset ? data : getState().rTopicList.result.concat(data)
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
