import * as type from '../constants'
import { apiTeacher } from './api'
import { toast } from 'react-toastify';

// thêm gíao viên
export function createTeacher(values) {
    return (dispatch, getState) => {
        apiTeacher.createTeacher(values, function (err, response) {
            // console.log("createTeacher", response)
            if (response) {
                if(response.status === "success"){
                    toast.success("Thêm giáo viên thành công!");
                }else{
                    toast.error("Thêm giáo viên thất bại!");
                }
                dispatch(getTeacher());
            }
            else
            {
                toast.error("Thêm giáo viên thất bại!");
            }
        })
    }
}
//cập nhật giáo viên
export function updateTeacher(values) {
    return (dispatch, getState) => {
        apiTeacher.updateTeacher(values, function (err, response) {
            // console.log("updateTeacher", response)
            if (response) {
                if (response.status === "success") {
                    toast.success("Cập nhật giáo viên thành công!");
                } else {
                    toast.error("Cập nhật giáo viên thất bại!");
                }
                dispatch(getTeacher());
            }
            else {
                toast.error("Cập nhật giáo viên thất bại!");
            }
        })
    }
}
//xóa giáo viên
export function deleteTeacher(values) {
    return (dispatch, getState) => {
        apiTeacher.deleteTeacher(values, function (err, response) {
            // console.log("deleteTeacher", response)
            if (response) {
                if (response.status === "success") {
                    toast.success("Xóa giáo viên thành công!");
                } else {
                    toast.error("Xóa giáo viên thất bại!");
                }
                dispatch(getTeacher());
            }
            else {
                toast.error("Xóa giáo viên thất bại!");
            }
        })
    }
}

export function getTeacher(values) {
    return (dispatch, getState) => {
        apiTeacher.getTeacher(values, function (err, response) {
            //  console.log("getTeacher", response)
            if (response) {
                dispatch(_getTeacher(response));
            }
        })
    }
}
export function _getTeacher(payload) {
    return {
        type: type.GET_TEACHER,
        payload
    }
}

export function getTeacherNotIn(values) {
    return (dispatch, getState) => {
        apiTeacher.getTeacherNotIn(values, function (err, response) {
            //  console.log("getTeacher", response)
            if (response) {
                dispatch(_getTeacherNotIn(response));
            }
        })
    }
}
export function _getTeacherNotIn(payload) {
    return {
        type: type.GET_TEACHER_NOTIN,
        payload
    }
}
