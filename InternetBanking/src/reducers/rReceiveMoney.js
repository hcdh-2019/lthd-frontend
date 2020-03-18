import * as type from '../constants'
import * as handing from '../modules/HandingData'
// import Config from '../../config/config'
let defaultState = {}
const ReceiveMoney = (state = defaultState, action) => {
    switch (action.type) {
        case type.GET_CUSTOMERBYID:
            return {
                ...state,
                customer_one: action.payload
            };
        default:
            return {
                ...state,
            }
    }
}
export default ReceiveMoney