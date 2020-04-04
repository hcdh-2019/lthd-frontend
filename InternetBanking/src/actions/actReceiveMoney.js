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
                dispatch(getCustomerBySTK({number_payment: values.number_payment_or_user_name}));
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
            else
            {
                toast.error("Khách hàng không tồn tại!");
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