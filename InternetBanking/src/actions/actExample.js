import * as type from '../constants'
import { apiExample } from './api'

// GET EXAMPLE
export function getExample(values) {
    return (dispatch, getState) => {
        apiExample.getEx(values, function (err, response) {
            // console.log(response);
            dispatch(_getExample(response))
        })
    }
}
export function _getExample(payload) {
    return {
        type: type.GET_EX,
        payload
    }
}