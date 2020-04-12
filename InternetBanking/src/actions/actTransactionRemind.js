import * as type from '../constants'
import { apiTransactionRemind } from './api'
import { toast } from 'react-toastify';

export function getTransactionRemind(values) {
    return (dispatch, getState) => {
        apiTransactionRemind.getTransactionRemind(values, function (err, response) {
            //  console.log("getCustomer", response)
            if (response) {
                dispatch(_getTransactionRemind(response));
            }
            else
            {
                toast.error("Khách hàng không tồn tại!");
            }
        })
    }
}


export function _getTransactionRemind(payload) {
    return {
        type: type.GET_TRANSACTION_REMIND,
        payload
    }
}