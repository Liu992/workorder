import * as types from '../content';
let action = (user) => {
    return {
        type: types.GET_USER,
        user
    }
}   
export default action