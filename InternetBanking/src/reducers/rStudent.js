import * as type from '../constants'
// import Config from '../../config/config'
import * as handing from '../modules/HandingData'
let defaultState = {}
const Student = (state = defaultState, action) => {
    switch (action.type) {
        case type.GET_STUDENT:
            var data = handing.getHandingDataSelect2(action.payload.data)
            return {
                ...state,
                student: action.payload,
                selectStudent: data
            };
        default:
            return {
                ...state,
            }
    }
}
export default Student