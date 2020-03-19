import * as type from '../constants'
import { apiReceiveMoney } from './api'
import { toast } from 'react-toastify';

// thêm khách hàng
export function receiveMoney(values) {
    return (dispatch, getState) => {
        apiReceiveMoney.receiveMoney(values, function (err, response) {
            // console.log("createCustomer", response)
            if (response) {
                if(response.status === "success"){
                    toast.success("Nạp tiền thành công!");
                }else{
                    toast.error("Nạp tiền thất bại!");
                }
                // dispatch(getCustomer());
            }
            else
            {
                toast.error("Nạp tiền thất bại!");
            }
        })
    }
}

export function getCustomerBySTK(values) {
    return (dispatch, getState) => {
        apiReceiveMoney.getCustomerBySTK(values, function (err, response) {
            //  console.log("getCustomer", response)
            if (response) {
                dispatch(_getCustomerBySTK(response));
            }
        })
    }
}


export function _getCustomerBySTK(payload) {
    return {
        type: type.GET_CUSTOMERBYSTK,
        payload
    }
}