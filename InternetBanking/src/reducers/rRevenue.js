import * as type from '../constants'
// import Config from '../../config/config'
import * as handing from '../modules/HandingData'
let defaultState = { }
const Revenue = (state = defaultState, action) => {
    switch (action.type) {
        case type.GET_REVENUE:
            var data = handing.getHandingDataSelect2(action.payload.data)
            return {
                ...state,
                revenue: action.payload,
                selectRevenue: data
            };
        default:
            return {
                ...state,
            }
    }
}
export default Revenue