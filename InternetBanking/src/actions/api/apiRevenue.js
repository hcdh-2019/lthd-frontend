import axios from "axios";
import * as helper from '../../modules/Helper.js'

// Thêm thu chi
export function createRevenue(params, callback) {
    axios.post(helper.getApiUrl('revenue'), params).then(function (response) {
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
//cập nhật thu chi
export function updateRevenue(params, callback) {
    axios.put(helper.getApiUrl('revenue') + "/" + params.id, params).then(function (response) {
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
//xóa thu chi
export function deleteRevenue(params, callback) {
    axios.delete(helper.getApiUrl('revenue') + "/" + params.id, params).then(function (response) {
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
//lấy danh sách thu chi
export function getRevenue(params, callback) {
    axios.get(helper.getApiUrl('revenue'),params).then(function (response) {
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