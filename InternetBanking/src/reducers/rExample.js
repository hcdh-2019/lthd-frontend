import * as type from '../constants'
let defaultState = { data: [] }
const Example = (state = defaultState, action) => {
    switch (action.type) {
        case type.GET_EX:
            return {
                ...state,
                data: action.payload
            }
        default:
            return {
                ...state,
            }
    }
}
export default Example