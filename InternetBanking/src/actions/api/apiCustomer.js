import axios from "axios";
import * as helper from '../../modules/Helper.js'

// Thêm khách hàng
export function createCustomer(params, callback) {
    axios.post(helper.getApiUrl('customer'), params).then(function (response) {
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
//cập nhật khách hàng
export function updateCustomer(params, callback) {
    axios.put(helper.getApiUrl('customer') + "/" + params.id, params).then(function (response) {
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
//xóa khách hàng
export function deleteCustomer(params, callback) {
    // console.log("deleteCustomer params: ", params)
    axios.delete(helper.getApiUrl('customer') + "/" + params.id, params).then(function (response) {
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
//lấy danh sách khách hàng
export function getCustomer(params, callback) {
    axios.get(helper.getApiUrl('customer'),params).then(function (response) {
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

// export function getTeacherNotIn(params, callback) {
//     axios.get(helper.getApiUrl('customer')  + "/getTeacherNotInClass",params).then(function (response) {
//         // console.log("response",response)
//         if (response.status === 200) {
//             callback(null, response.data)
//         }
//         else callback(response, null)
//     }).catch(function (error) {
//         console.log("ERROR:", error)
//         callback(error, null)
//     })
// }
