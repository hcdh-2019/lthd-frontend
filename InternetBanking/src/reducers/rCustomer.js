import * as type from '../constants'
import * as handing from '../modules/HandingData'
// import Config from '../../config/config'
let defaultState = {}
const Customer = (state = defaultState, action) => {
    switch (action.type) {
        case type.GET_CUSTOMER:
            var data = handing.getHandingDataSelect2(action.payload.data)
            return {
                ...state,
                customer: action.payload,
                selectCustomer: data
            };
        default:
            return {
                ...state,
            }
    }
}
export default Customer