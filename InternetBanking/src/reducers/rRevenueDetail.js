import * as type from '../constants'
// import Config from '../../config/config'
import * as handing from '../modules/HandingData'
let defaultState = { }
const RevenueDetail = (state = defaultState, action) => {
    switch (action.type) {
        case type.GET_REVENUEDETAIL:
            return {
                ...state,
                revenue_detail: action.payload
            };
        case type.GET_OBJECT:
                var data = handing.getHandingDataSelect2(action.payload.data)
            return {
                ...state,
                selectObject: data
            };
        default:
            return {
                ...state,
            }
    }
}
export default RevenueDetail