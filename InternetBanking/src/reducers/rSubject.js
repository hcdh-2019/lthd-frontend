import * as type from '../constants'
// import Config from '../../config/config'
import * as handing from '../modules/HandingData'
let defaultState = {}
const Subject = (state = defaultState, action) => {
    switch (action.type) {
        case type.GET_SUBJECT:
            var data = handing.getHandingDataSelect2(action.payload.data)
            return {
                ...state,
                subject: action.payload,
                selectSubject: data
            };
        default:
            return {
                ...state,
            }
    }
}
export default Subject