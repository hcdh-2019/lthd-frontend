import * as type from '../constants'
import { apiSubject } from './api'
import { toast } from 'react-toastify';

// Đăng nhật
export function createSubject(values) {
    return (dispatch, getState) => {
        apiSubject.createSubject(values, function (err, response) {
            // console.log("createSubject", response)
            if (response) {
                if (response.status === "success") {
                    toast.success("Thêm môn học thành công!");
                } else {
                    toast.error("Thêm môn học thất bại!");
                }
                dispatch(getSubject());
            }
            else {
                toast.error("Thêm môn học thất bại!");
            }
        })
    }
}

export function updateSubject(values) {
    return (dispatch, getState) => {
        apiSubject.updateSubject(values, function (err, response) {
            // console.log("updateSubject", response)
            if (response) {
                if (response.status === "success") {
                    toast.success("Cập nhật môn học thành công!");
                } else {
                    toast.error("Cập nhật môn học thất bại!");
                }
                dispatch(getSubject());
            }
            else {
                toast.error("Cập nhật môn học thất bại!");
            }
        })
    }
}

export function deleteSubject(values) {
    return (dispatch, getState) => {
        apiSubject.deleteSubject(values, function (err, response) {
            // console.log("deleteSubject", response)
            if (response) {
                if (response.status === "success") {
                    toast.success("Xóa môn học thành công!");
                } else {
                    toast.error("Xóa môn học thất bại!");
                }
                dispatch(getSubject());
            }
            else {
                toast.error("Xóa môn học thất bại!");
            }
        })
    }
}

export function getSubject(values) {
    return (dispatch, getState) => {
        apiSubject.getSubject(values, function (err, response) {
            // console.log("getSubject", response)
            if (response) {
                dispatch(_getSubject(response));
            }
        })
    }
}
export function _getSubject(payload) {
    return {
        type: type.GET_SUBJECT,
        payload
    }
}