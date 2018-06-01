export default (state = {}, action) => {
  switch (action.type) {
    case 'UPDATE_NEWS':
      return { result: action.result }
    default:
      return state
  }
}
