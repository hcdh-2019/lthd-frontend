import * as type from '../constants'
import { apiEvent } from './api'
import { toast } from 'react-toastify';

// thêm hoạt động
export function createEvent(values) {
    return (dispatch, getState) => {
        apiEvent.createEvent(values, function (err, response) {
            console.log("createEvent", response)
            if (response) {
                if(response.status === "success"){
                    toast.success("Thêm hoạt động thành công!");
                }else{
                    toast.error("Thêm hoạt động thất bại!");
                }
                dispatch(getEvent());
            }
            else
            {
                toast.error("Thêm hoạt động thất bại!");
            }
        })
    }
}
//cập nhật hoạt động
export function updateEvent(values) {
    return (dispatch, getState) => {
        apiEvent.updateEvent(values, function (err, response) {
            // console.log("updateEvent", response)
            if (response) {
                if (response.status === "success") {
                    toast.success("Cập nhật hoạt động thành công!");
                } else {
                    toast.error("Cập nhật hoạt động thất bại!");
                }
                dispatch(getEvent());
            }
            else {
                toast.error("Cập nhật hoạt động thất bại!");
            }
        })
    }
}
//xóa hoạt động
export function deleteEvent(values) {
    return (dispatch, getState) => {
        apiEvent.deleteEvent(values, function (err, response) {
            // console.log("deleteEvent", response)
            if (response) {
                if (response.status === "success") {
                    toast.success("Xóa hoạt động thành công!");
                } else {
                    toast.error("Xóa hoạt động thất bại!");
                }
                dispatch(getEvent());
            }
            else {
                toast.error("Xóa hoạt động thất bại!");
            }
        })
    }
}

export function getEvent(values) {
    return (dispatch, getState) => {
        apiEvent.getEvent(values, function (err, response) {
             console.log("getEvent", response)
            if (response) {
                dispatch(_getEvent(response));
            }
        })
    }
}
export function _getEvent(payload) {
    return {
        type: type.GET_EVENT,
        payload
    }
}
