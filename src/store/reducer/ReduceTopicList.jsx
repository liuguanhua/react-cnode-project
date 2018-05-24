export default (
  state = {
    result: [],
    page: 0,
    scrollTop: 0
  },
  action
) => {
  switch (action.type) {
    case 'SAVE_TOPIC':
      return {
        ...state,
        result: action.result,
        page: action.page
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
