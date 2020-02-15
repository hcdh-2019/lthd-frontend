import * as type from '../constants'
// import Config from '../../config/config'
let defaultState = {}
const SignIn = (state = defaultState, action) => {
    switch (action.type) {
        case type.SIGNIN:
            return {
                ...state,
                token: action.payload
            };
        case type.GET_PROFILE:
            return {
                ...state,
                user: action.payload
            };
        default:
            return {
                ...state,
            }
    }
}
export default SignIn