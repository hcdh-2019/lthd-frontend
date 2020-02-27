import axios from "axios";
import * as helper from '../../modules/Helper.js'

// Thêm giáo viên
export function createTeacher(params, callback) {
    axios.post(helper.getApiUrl('teacher'), params).then(function (response) {
        //  console.log("response_api",response)
        if (response.status === 200) {
            callback(null, response.data)
        }
        else callback(response, null)
    }).catch(function (error) {
        console.log("ERROR:", error)
        callback(error, null)
    })
}
//cập nhật giáo viên
export function updateTeacher(params, callback) {
    // console.log("updateTeacher params: ", params)
    axios.put(helper.getApiUrl('teacher') + "/" + params.id, params).then(function (response) {
        // console.log("response",response)
        if (response.status === 200) {
            callback(null, response.data)
        }
        else callback(response, null)
    }).catch(function (error) {
        console.log("ERROR:", error)
        callback(error, null)
    })
}
//xóa giáo viên
export function deleteTeacher(params, callback) {
    // console.log("deleteTeacher params: ", params)
    axios.delete(helper.getApiUrl('teacher') + "/" + params.id, params).then(function (response) {
        // console.log("response",response)
        if (response.status === 200) {
            callback(null, response.data)
        }
        else callback(response, null)
    }).catch(function (error) {
        console.log("ERROR:", error)
        callback(error, null)
    })
}
//lấy danh sách giáo viên
export function getTeacher(params, callback) {
    axios.get(helper.getApiUrl('teacher'),params).then(function (response) {
        // console.log("response",response)
        if (response.status === 200) {
            callback(null, response.data)
        }
        else callback(response, null)
    }).catch(function (error) {
        console.log("ERROR:", error)
        callback(error, null)
    })
}

export function getTeacherNotIn(params, callback) {
    axios.get(helper.getApiUrl('teacher')  + "/getTeacherNotInClass",params).then(function (response) {
        // console.log("response",response)
        if (response.status === 200) {
            callback(null, response.data)
        }
        else callback(response, null)
    }).catch(function (error) {
        console.log("ERROR:", error)
        callback(error, null)
    })
}
