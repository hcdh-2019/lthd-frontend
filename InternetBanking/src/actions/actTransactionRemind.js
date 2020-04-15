import * as type from '../constants'
import { apiTransactionRemind } from './api'
import { toast } from 'react-toastify';

export function getTransactionRemind(values) {
    return (dispatch, getState) => {
        apiTransactionRemind.getTransactionRemind(values, function (err, response) {
            //  console.log("getTransactionRemind", response)
            if (response) {
                dispatch(_getTransactionRemind(response));
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

// tạo nhắc nợ
export function createTransactionRemind(values) {
    return (dispatch, getState) => {
        apiTransactionRemind.createTransactionRemind(values, function (err, response) {
            // console.log("createTransactionRemind", response)
            if (response) {
                if (response.status === "success") {
                    toast.success("Tạo nhắc nợ thành công!");
                } else {
                    toast.error("Tạo nhắc nợ thất bại!");
                }
                // dispatch(getTransactionRemind({number_payment : response.data.number_payment, status : 0}));
            }
            else {
                toast.error("Tạo nhắc nợ thất bại!");
            }
        })
    }
}
//huỷ nhắc nợ
export function updateTransactionRemind(values) {
    return (dispatch, getState) => {
        apiTransactionRemind.updateTransactionRemind(values, function (err, response) {
            // console.log("updateTransactionRemind", response)
            if (response) {
                if (response.status === "success") {
                    toast.success("Huỷ nhắc nợ thành công!");
                } else {
                    toast.error("Huỷ nhắc nợ thất bại!");
                }
                // dispatch(getTransactionRemind());
            }
            else {
                toast.error("Huỷ nhắc nợ thất bại!");
            }
        })
    }
}