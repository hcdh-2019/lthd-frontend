import * as type from '../constants'
// import Config from '../../config/config'
let defaultState = { }
const Event = (state = defaultState, action) => {
    switch (action.type) {
        case type.GET_EVENT:
            return {
                ...state,
                event: action.payload
            };
        default:
            return {
                ...state,
            }
    }
}
export default Event