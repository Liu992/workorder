import * as types from '../content';
let action = (list) => {
    return {
        type: types.WORKORDER_LIST,
        list
    }
}   
export default action