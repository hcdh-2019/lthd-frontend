import * as type from '../constants'
import { apiTransferMoney } from './api'
import { toast } from 'react-toastify';

export function getCustomerStoreByCustomerId(values) {
    return (dispatch, getState) => {
        apiTransferMoney.getCustomerStoreByCustomerId(values, function (err, response) {
            console.log("getCustomerStoreByCustomerId", response, "params", values)
            if (response) {
                dispatch(_getCustomerStoreByCustomerId(response));
            }
        })
    }
}

export function _getCustomerStoreByCustomerId(payload) {
    return {
        type: type.GET_CUSTOMERSTORE,
        payload
    }
}

export function getCustomerByNumberPayment(values) {
    return (dispatch, getState) => {
        apiTransferMoney.getCustomerByNumberPayment(values, function (err, response) {
            //  console.log("getCustomerByNumberPayment", response)
            if (response) {
                dispatch(_getCustomerByNumberPayment(response));
            } else {
                toast.error("Số tài khoản không chính xác.");
            }
        })
    }
}

export function _getCustomerByNumberPayment(payload) {
    return {
        type: type.GET_CUSTOMERBYPAYMENT,
        payload
    }
}

export function SaveCustomerStore(values) {
    return (dispatch, getState) => {
        apiTransferMoney.SaveCustomerStore(values, function (err, response) {
            console.log("SaveCustomerStore", response)
            if (response) {
                if (response.status === "success") {
                    toast.success("Lưu thành công!");
                } else {
                    toast.error("Lưu thất bại!");
                }
                dispatch(getCustomerStoreByCustomerId({
                    id: values.customer_id
                }));
            }
            else {
                toast.error("Lưu thất bại!");
            }
        })
    }
}


export function TransactionMoney(values) {
    return (dispatch, getState) => {
        apiTransferMoney.TransactionMoney(values, function (err, response) {
            console.log("TransactionMoney", response)
            if (response) {
                if (response.status === "success") {
                    toast.success("Lưu thành công!");
                } else {
                    toast.error("Lưu thất bại!");
                }
                // dispatch(getCustomerStoreByCustomerId({
                //     id: values.customer_id
                // }));
            }
            else {
                toast.error("Lưu thất bại!");
            }
        })
    }
}


export function ConfirmOTP(values) {
    return (dispatch, getState) => {
        apiTransferMoney.ConfirmOTP(values, function (err, response) {
            console.log("ConfirmOTP", response)
            if (response) {
                if (response.status === "success") {
                    toast.success("Lưu thành công!");
                } else {
                    toast.error("Lưu thất bại!");
                }
                // dispatch(getCustomerStoreByCustomerId({
                //     id: values.customer_id
                // }));
            }
            else {
                toast.error("Lưu thất bại!");
            }
        })
    }
}