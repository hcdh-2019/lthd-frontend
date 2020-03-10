import * as type from '../constants'
import * as handing from '../modules/HandingData'
// import Config from '../../config/config'
let defaultState = {}
const Customer = (state = defaultState, action) => {
    switch (action.type) {
        case type.GET_CUSTOMER:
            return {
                ...state,
                customer: action.payload
            };
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
export default Customer