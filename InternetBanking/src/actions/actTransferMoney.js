import * as type from '../constants'
import { apiTransferMoney, apiCustomer } from './api'
import { toast } from 'react-toastify';

export function getCustomerStoreByCustomerId(values) {
    return (dispatch, getState) => {
        apiTransferMoney.getCustomerStoreByCustomerId(values, function (err, response) {
            // console.log("getCustomerStoreByCustomerId", response, "params", values)
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

export function _ClearCustomerPayment(payload) {
    return {
        type: type.CLEARCUSTOMERPAYMENT,
        payload
    }
}

export function SaveCustomerStore(values) {
    return (dispatch, getState) => {
        apiTransferMoney.SaveCustomerStore(values, function (err, response) {
            console.log("SaveCustomerStore", response)
            if (response) {
                if (response.status === "success") {
                    toast.success("Lưu tên gợi nhớ thành công!");
                    dispatch(getCustomerStoreByCustomerId({ id: values.customer_id }));
                } else {
                    toast.error("Lưu tên gợi nhớ thất bại!");
                }
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
                    toast.success("Mã OTP đã được gửi tới gmail, OTP có hạn trong 2 phút.");
                } else {
                    toast.error(response.data.message);
                }
            }
            else {
                toast.error("Gửi mã OTP thất bại, xin vui lòng thử lại.");
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
                    toast.success("Chuyển tiền thành công.");
                    dispatch(getCustomerByID({
                        id: values.customer_id
                    }));

                    dispatch(_ConfirmOTPDisabled(true));
                } else {
                    toast.error(response.data.message);
                }
            }
            else {
                toast.error("Chuyển tiền thất bại.");
            }
        })
    }
}


export function _ConfirmOTPDisabled(payload) {
    return {
        type: type.CONFIRMOTP,
        payload
    }
}

export function getCustomerByID(values) {
    return (dispatch, getState) => {
        apiCustomer.getCustomerByID(values, function (err, response) {
            //  console.log("getCustomer", response)
            if (response) {
                dispatch(_getCustomerByID(response));
            }
        })
    }
}


export function _getCustomerByID(payload) {
    return {
        type: type.GET_CUSTOMERBYID,
        payload
    }
}
