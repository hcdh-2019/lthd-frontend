import * as type from '../constants'
import { apiTransferMoney } from './api'
import { toast } from 'react-toastify';

export function getCustomerStoreByCustomerId(values) {
    return (dispatch, getState) => {
        apiTransferMoney.getCustomerStoreByCustomerId(values, function (err, response) {
            //  console.log("getCustomerStoreByCustomerId", response)
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