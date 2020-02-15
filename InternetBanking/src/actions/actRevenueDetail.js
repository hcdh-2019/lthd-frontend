import * as type from '../constants'
import { apiRevenueDetail } from './api'
import { toast } from 'react-toastify';

// thêm chi tiết thu chi
export function createRevenueDetail(values) {
    return (dispatch, getState) => {
        apiRevenueDetail.createRevenueDetail(values, function (err, response) {
            console.log("createRevenueDetail", response)
            if (response) {
                if(response.status === "success"){
                    toast.success("Thêm chi tiết thu chi thành công!");
                }else{
                    toast.error("Thêm chi tiết thu chi thất bại!");
                }
                dispatch(getRevenueDetail());
            }
            else
            {
                toast.error("Thêm chi tiết thu chi thất bại!");
            }
        })
    }
}
//cập nhật chi tiết thu chi
export function updateRevenueDetail(values) {
    return (dispatch, getState) => {
        apiRevenueDetail.updateRevenueDetail(values, function (err, response) {
            // console.log("updateRevenue", response)
            if (response) {
                if (response.status === "success") {
                    toast.success("Cập nhật chi tiết thu chi thành công!");
                } else {
                    toast.error("Cập nhật chi tiết thu chi thất bại!");
                }
                dispatch(getRevenueDetail());
            }
            else {
                toast.error("Cập nhật chi tiết thu chi thất bại!");
            }
        })
    }
}
//xóa chi tiết thu chi
export function deleteRevenueDetail(values) {
    return (dispatch, getState) => {
        apiRevenueDetail.deleteRevenueDetail(values, function (err, response) {
            // console.log("deleteRevenue", response)
            if (response) {
                if (response.status === "success") {
                    toast.success("Xóa chi tiết thu chi thành công!");
                } else {
                    toast.error("Xóa chi tiết thu chi thất bại!");
                }
                dispatch(getRevenueDetail());
            }
            else {
                toast.error("Xóa chi tiết thu chi thất bại!");
            }
        })
    }
}

export function getRevenueDetail(values) {
    return (dispatch, getState) => {
        apiRevenueDetail.getRevenueDetail(values, function (err, response) {
             console.log("getRevenueDetail", response)
            if (response) {
                dispatch(_getRevenueDetail(response));
            }
        })
    }
}
export function _getRevenueDetail(payload) {
    return {
        type: type.GET_REVENUEDETAIL,
        payload
    }
}
export function getObject(values) {
    return (dispatch, getState) => {
        apiRevenueDetail.getObject(values, function (err, response) {
             console.log("getObject", response)
            if (response) {
                dispatch(_getObject(response));
            }
        })
    }
}
export function _getObject(payload) {
    return {
        type: type.GET_OBJECT,
        payload
    }
}
