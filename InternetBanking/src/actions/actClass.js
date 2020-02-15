import * as type from '../constants'
import {  apiClass } from './api'
import { toast } from 'react-toastify';

// Đăng nhật
export function createClass(values) {
    return (dispatch, getState) => {
        apiClass.createClass(values, function (err, response) {
            // console.log("createClass", response)
            if (response) {
                if (response.status === "success") {
                    toast.success("Thêm lớp học thành công!");
                } else {
                    toast.error("Thêm lớp học thất bại!");
                }
                dispatch(getClass());
            }
            else {
                toast.error("Thêm lớp học thất bại!");
            }
        })
    }
}

export function updateClass(values) {
    return (dispatch, getState) => {
        apiClass.updateClass(values, function (err, response) {
            // console.log("updateClass", response)
            if (response) {
                if (response.status === "success") {
                    toast.success("Cập nhật lớp học thành công!");
                } else {
                    toast.error("Cập nhật lớp học thất bại!");
                }
                dispatch(getClass());
            }
            else {
                toast.error("Cập nhật lớp học thất bại!");
            }
        })
    }
}

export function deleteClass(values) {
    return (dispatch, getState) => {
        apiClass.deleteClass(values, function (err, response) {
            // console.log("deleteClass", response)
            if (response) {
                if (response.status === "success") {
                    toast.success("Xóa lớp học thành công!");
                } else {
                    toast.error("Xóa lớp học thất bại!");
                }
                dispatch(getClass());
            }
            else {
                toast.error("Xóa lớp học thất bại!");
            }
        })
    }
}

export function getClass(values) {
    return (dispatch, getState) => {
        apiClass.getClass(values, function (err, response) {
            // console.log("getClass", response)
            if (response) {
                dispatch(_getClass(response));
            }
        })
    }
}
export function _getClass(payload) {
    return {
        type: type.GET_CLASS,
        payload
    }
}