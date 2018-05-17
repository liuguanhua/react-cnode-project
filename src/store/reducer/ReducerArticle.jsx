export default (
  state = {
    isLoad: true
  },
  action
) => {
  switch (action.type) {
    case 'FETCH_START':
      return {
        ...state,
        isLoad: true
      }
    case 'FETCH_DONE':
      return { isLoad: false, result: action.result }
    case 'FETCH_Fail':
      return {
        ...state,
        isLoad: false
      }
    case 'UPDATE_REPLY':
      return {
        ...state,
        result: action.result
      }
    case 'GET_REPLY_CNT':
      state.result.data.reply_content = action.reply_content
      return {
        ...state,
        result: state.result
      }
    default:
      return state
  }
}
