import axios from "axios";
import * as helper from '../../modules/Helper.js'

// Thêm thu chi
export function createRevenueDetail(params, callback) {
    axios.post(helper.getApiUrl('revenue_detail'), params).then(function (response) {
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
export function updateRevenueDetail(params, callback) {
    axios.put(helper.getApiUrl('revenue_detail') + "/" + params.id, params).then(function (response) {
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
export function deleteRevenueDetail(params, callback) {
    axios.delete(helper.getApiUrl('revenue_detail') + "/" + params.id, params).then(function (response) {
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
export function getRevenueDetail(params, callback) {
    axios.get(helper.getApiUrl('revenue_detail'),params).then(function (response) {
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
export function getObject(params, callback) {
    axios.get(helper.getApiUrl('object')+ "/?id=" + params.id,params).then(function (response) {
         console.log("response obj",response)
        if (response.status === 200) {
            callback(null, response.data)
        }
        else callback(response, null)
    }).catch(function (error) {
        console.log("ERROR:", error)
        callback(error, null)
    })
}