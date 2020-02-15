import * as type from '../constants'
// import Config from '../../config/config'
import * as handing from '../modules/HandingData'
let defaultState = {}
const Score = (state = defaultState, action) => {
    switch (action.type) {
        case type.GET_SCORE:
            var data = handing.getHandingDataSelect2(action.payload.data)
            var data1 = handing.getHandingDataTable(action.payload.data)
            // console.log("handing", data)
            return {
                ...state,
                score: data1,
                selectScore: data
            };
        default:
            return {
                ...state,
            }
    }
}
export default Score