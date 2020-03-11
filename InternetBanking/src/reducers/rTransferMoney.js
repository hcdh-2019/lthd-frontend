import * as type from '../constants'
import * as handing from '../modules/HandingData'

let defaultState = {}
const TransferMoney = (state = defaultState, action) => {
    switch (action.type) {
        case type.GET_CUSTOMERSTORE:
            var data = handing.getHandingDataSelect2OfCustomerStore(action.payload.data)
            return {
                ...state,
                customer_store: action.payload.data,
                selectCustomerStore: data
            };
        case type.GET_CUSTOMERBYPAYMENT:
            return {
                ...state,
                customer_payment: action.payload.data,
            };
        default:
            return {
                ...state,
            }
    }
}
export default TransferMoney