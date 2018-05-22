import * as types from '../content'
let initstate = {
  name: 'user',
  user: ''
}
let reducer = (state = initstate, action) => {
  switch (action.type) {
    case types.GET_USER:
      return {
        ...state,
        user: action.user
      }
      break;

    default: return state
      break;
  }
}
export default reducer