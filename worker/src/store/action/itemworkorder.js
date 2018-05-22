import * as types from '../content';
let action = (data) => {
    return {
        type: types.ITEM_WORKORDER,
        data
    }
}   
export default action