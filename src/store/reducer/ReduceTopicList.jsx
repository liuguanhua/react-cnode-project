export default (
  state = {
    result: [],
    page: 0,
    scrollTop: 0,
    topicType: 'all'
  },
  action
) => {
  switch (action.type) {
    case 'SAVE_TOPIC':
      return {
        ...state,
        result: action.result,
        page: action.page,
        topicType: action.topicType
      }
    case 'SCROLL_TOP_SITE':
      return {
        ...state,
        scrollTop: action.scrollTop
      }
    default:
      return state
  }
}
