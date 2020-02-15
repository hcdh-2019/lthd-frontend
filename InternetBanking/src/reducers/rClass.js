import * as type from '../constants'
// import Config from '../../config/config'
import * as handing from '../modules/HandingData'
let defaultState = {}
const Class = (state = defaultState, action) => {
    switch (action.type) {
        case type.GET_CLASS:
            var data = handing.getHandingDataSelect2(action.payload.data)
            // console.log("handing", data)
            return {
                ...state,
                class: action.payload,
                selectClass: data
            };
        default:
            return {
                ...state,
            }
    }
}
export default Class