import * as types from '../content'
let initstate = {
  name: 'itemworkorder',
  data: ''
}
let reducer = (state = initstate, action) => {
  switch (action.type) {
    case types.ITEM_WORKORDER:
      return {
        ...state,
        data: action.data
      }
      break;

    default: return state
      break;
  }
}
export default reducer