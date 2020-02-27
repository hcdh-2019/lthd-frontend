import * as type from '../constants'
import * as handing from '../modules/HandingData'
// import Config from '../../config/config'
let defaultState = {}
const Teacher = (state = defaultState, action) => {
    switch (action.type) {
        case type.GET_TEACHER:
            var data = handing.getHandingDataSelect2(action.payload.data)
            return {
                ...state,
                teacher: action.payload,
                selectTeacher: data
            };
        case type.GET_TEACHER_NOTIN:
            var data = handing.getHandingDataSelect2(action.payload.data)
            return {
                ...state,
                selectTeacherNotInClass: data
            };
        default:
            return {
                ...state,
            }
    }
}
export default Teacher