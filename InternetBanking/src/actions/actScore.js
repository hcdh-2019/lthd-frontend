import * as type from '../constants'
import {  apiScore } from './api'
import { toast } from 'react-toastify';

// Đăng nhật
export function createScore(values,query) {
    return (dispatch, getState) => {
        apiScore.createScore(values, function (err, response) {
            // console.log("createScore", response)
            if (response) {
                if (response.status === "success") {
                    toast.success("Thêm điểm thành công!");
                } else {
                    toast.error("Thêm điểm thất bại!");
                }
                dispatch(getScore(query));
            }
            else {
                toast.error("Thêm điểm thất bại!");
            }
        })
    }
}

export function updateScore(values) {
    return (dispatch, getState) => {
        apiScore.updateScore(values, function (err, response) {
            // console.log("updateScore", response)
            if (response) {
                if (response.status === "success") {
                    toast.success("Cập nhật điểm thành công!");
                } else {
                    toast.error("Cập nhật điểm thất bại!");
                }
                dispatch(getScore());
            }
            else {
                toast.error("Cập nhật điểm thất bại!");
            }
        })
    }
}

export function deleteScore(values) {
    return (dispatch, getState) => {
        apiScore.deleteScore(values, function (err, response) {
            // console.log("deleteScore", response)
            if (response) {
                if (response.status === "success") {
                    toast.success("Xóa điểm thành công!");
                } else {
                    toast.error("Xóa điểm thất bại!");
                }
                dispatch(getScore());
            }
            else {
                toast.error("Xóa điểm thất bại!");
            }
        })
    }
}

export function getScore(values) {
    return (dispatch, getState) => {
        apiScore.getScore(values, function (err, response) {
            // console.log("getScore", response)
            if (response) {
                dispatch(_getScore(response));
            }
        })
    }
}
export function _getScore(payload) {
    return {
        type: type.GET_SCORE,
        payload
    }
}