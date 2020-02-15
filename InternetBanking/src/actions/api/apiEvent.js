import axios from "axios";
import * as helper from '../../modules/Helper.js'

// Thêm hoạt động
export function createEvent(params, callback) {
    axios.post(helper.getApiUrl('event'), params).then(function (response) {
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
//cập nhật hoạt động
export function updateEvent(params, callback) {
    axios.put(helper.getApiUrl('event') + "/" + params.id, params).then(function (response) {
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
//xóa hoạt động
export function deleteEvent(params, callback) {
    axios.delete(helper.getApiUrl('event') + "/" + params.id, params).then(function (response) {
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
//lấy danh sách hoạt động
export function getEvent(params, callback) {
    axios.get(helper.getApiUrl('event'),params).then(function (response) {
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