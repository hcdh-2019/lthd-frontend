import * as type from '../constants'
import { apiCustomer } from './api'
import { toast } from 'react-toastify';

// thêm khách hàng
export function createCustomer(values) {
    return (dispatch, getState) => {
        apiCustomer.createCustomer(values, function (err, response) {
            // console.log("createCustomer", response)
            if (response) {
                if(response.status === "success"){
                    toast.success("Thêm khách hàng thành công!");
                }else{
                    toast.error("Thêm khách hàng thất bại!");
                }
                dispatch(getCustomer());
            }
            else
            {
                toast.error("Thêm khách hàng thất bại!");
            }
        })
    }
}
//cập nhật khách hàng
export function updateCustomer(values) {
    return (dispatch, getState) => {
        apiCustomer.updateCustomer(values, function (err, response) {
            // console.log("updateCustomer", response)
            if (response) {
                if (response.status === "success") {
                    toast.success("Cập nhật khách hàng thành công!");
                } else {
                    toast.error("Cập nhật khách hàng thất bại!");
                }
                dispatch(getCustomer());
            }
            else {
                toast.error("Cập nhật khách hàng thất bại!");
            }
        })
    }
}
//xóa khách hàng
export function deleteCustomer(values) {
    return (dispatch, getState) => {
        apiCustomer.deleteCustomer(values, function (err, response) {
            // console.log("deleteCustomer", response)
            if (response) {
                if (response.status === "success") {
                    toast.success("Xóa khách hàng thành công!");
                } else {
                    toast.error("Xóa khách hàng thất bại!");
                }
                dispatch(getCustomer());
            }
            else {
                toast.error("Xóa khách hàng thất bại!");
            }
        })
    }
}

export function getCustomer(values) {
    return (dispatch, getState) => {
        apiCustomer.getCustomer(values, function (err, response) {
            //  console.log("getCustomer", response)
            if (response) {
                dispatch(_getCustomer(response));
            }
        })
    }
}

export function _getCustomer(payload) {
    return {
        type: type.GET_CUSTOMER,
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

