import * as type from '../constants'
import * as handing from '../modules/HandingData'
// import Config from '../../config/config'
let defaultState = {}
const History = (state = defaultState, action) => {
    switch (action.type) {
        case type.GET_HISTORY:
            return {
                ...state,
                history111: action.payload
            };
        default:
            return {
                ...state,
            }
    }
}
export default History