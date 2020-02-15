import * as type from '../constants'
import {  apiStudent } from './api'
import { toast } from 'react-toastify';

// Đăng nhật
export function createStudent(values) {
    return (dispatch, getState) => {
        apiStudent.createStudent(values, function (err, response) {
            // console.log("createStudent", response)
            if (response) {
                if (response.status === "success") {
                    toast.success("Thêm học sinh thành công!");
                } else {
                    toast.error("Thêm học sinh thất bại!");
                }
                dispatch(getStudent());
            }
            else {
                toast.error("Thêm học sinh thất bại!");
            }
        })
    }
}

export function updateStudent(values) {
    return (dispatch, getState) => {
        apiStudent.updateStudent(values, function (err, response) {
            // console.log("updateStudent", response)
            if (response) {
                if (response.status === "success") {
                    toast.success("Cập nhật học sinh thành công!");
                } else {
                    toast.error("Cập nhật học sinh thất bại!");
                }
                dispatch(getStudent());
            }
            else {
                toast.error("Cập nhật học sinh thất bại!");
            }
        })
    }
}

export function deleteStudent(values) {
    return (dispatch, getState) => {
        apiStudent.deleteStudent(values, function (err, response) {
            // console.log("deleteStudent", response)
            if (response) {
                if (response.status === "success") {
                    toast.success("Xóa học sinh thành công!");
                } else {
                    toast.error("Xóa học sinh thất bại!");
                }
                dispatch(getStudent());
            }
            else {
                toast.error("Xóa học sinh thất bại!");
            }
        })
    }
}

export function getStudent(values) {
    return (dispatch, getState) => {
        apiStudent.getStudent(values, function (err, response) {
            // console.log("getStudent", response)
            if (response) {
                dispatch(_getStudent(response));
            }
        })
    }
}
export function _getStudent(payload) {
    return {
        type: type.GET_STUDENT,
        payload
    }
}