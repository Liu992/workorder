import * as types from '../content'
let initstate = {
  name: 'workorderlist',
  list: ''
}
let reducer = (state = initstate, action) => {
  switch (action.type) {
    case types.WORKORDER_LIST:
      return {
        ...state,
        list: action.list
      }
      break;

    default: return state
      break;
  }
}
export default reducer