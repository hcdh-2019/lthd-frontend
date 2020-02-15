import * as type from '../constants'
import { apiRevenue } from './api'
import { toast } from 'react-toastify';

// thêm thu chi
export function createRevenue(values) {
    return (dispatch, getState) => {
        apiRevenue.createRevenue(values, function (err, response) {
            // console.log("createRevenue", response)
            if (response) {
                if(response.status === "success"){
                    toast.success("Thêm thu chi thành công!");
                }else{
                    toast.error("Thêm thu chi thất bại!");
                }
                dispatch(getRevenue());
            }
            else
            {
                toast.error("Thêm thu chi thất bại!");
            }
        })
    }
}
//cập nhật thu chi
export function updateRevenue(values) {
    return (dispatch, getState) => {
        apiRevenue.updateRevenue(values, function (err, response) {
            // console.log("updateRevenue", response)
            if (response) {
                if (response.status === "success") {
                    toast.success("Cập nhật thu chi thành công!");
                } else {
                    toast.error("Cập nhật thu chi thất bại!");
                }
                dispatch(getRevenue());
            }
            else {
                toast.error("Cập nhật thu chi thất bại!");
            }
        })
    }
}
//xóa thu chi
export function deleteRevenue(values) {
    return (dispatch, getState) => {
        apiRevenue.deleteRevenue(values, function (err, response) {
            // console.log("deleteRevenue", response)
            if (response) {
                if (response.status === "success") {
                    toast.success("Xóa thu chi thành công!");
                } else {
                    toast.error("Xóa thu chi thất bại!");
                }
                dispatch(getRevenue());
            }
            else {
                toast.error("Xóa thu chi thất bại!");
            }
        })
    }
}

export function getRevenue(values) {
    return (dispatch, getState) => {
        apiRevenue.getRevenue(values, function (err, response) {
            //  console.log("getRevenue", response)
            if (response) {
                dispatch(_getRevenue(response));
            }
        })
    }
}
export function _getRevenue(payload) {
    return {
        type: type.GET_REVENUE,
        payload
    }
}
