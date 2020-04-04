import * as type from '../constants'
import { apiHistory } from './api'
import { toast } from 'react-toastify';

export function getHistoryBySTK(values) {
    return (dispatch, getState) => {
        apiHistory.getHistoryBySTK(values, function (err, response) {
            //  console.log("getCustomer", response)
            if (response) {
                dispatch(_getHistoryBySTK(response));
            }
        })
    }
}


export function _getHistoryBySTK(payload) {
    return {
        type: type.GET_HISTORY,
        payload
    }
}