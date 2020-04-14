import * as type from '../constants'
import * as handing from '../modules/HandingData'
// import Config from '../../config/config'
let defaultState = {}
const TransactionRemind = (state = defaultState, action) => {
    switch (action.type) {
        case type.GET_TRANSACTION_REMIND:
            return {
                ...state,
                transaction_remind: action.payload
            };
        default:
            return {
                ...state,
            }
    }
}
export default TransactionRemind