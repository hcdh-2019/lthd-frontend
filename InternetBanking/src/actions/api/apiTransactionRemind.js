import axios from "axios";
import * as helper from '../../modules/Helper.js'

//lấy danh sách nhắc nợ
export function getTransactionRemind(params, callback) {
    axios.get(helper.getApiUrl('transaction_remind') + '?' + (params.number_payment ? ('number_payment=' + params.number_payment + '&') : '') + (params.number_payment_receive ? ('number_payment_receive=' + params.number_payment_receive) : '') + '&status=' + params.status, params).then(function (response) {
        // console.log("response",response)
        if (response.status === 200) {
            callback(null, response.data.data)
        }
        else callback(response, null)
    }).catch(function (error) {
        console.log("ERROR:", error)
        callback(error, null)
    })
}

// Thêm khách hàng
export function createTransactionRemind(params, callback) {
    // console.log("createTransactionRemind", JSON.stringify(params))
    axios.post(helper.getApiUrl('transaction_remind'), params).then(function (response) {
        //  console.log("response_api",response)
        if (response.status === 201 && response.statusText === "CREATED") {
            callback(null, response.data)
        }
        else callback(response, null)
    }).catch(function (error) {
        console.log("ERROR:", error)
        callback(error, null)
    })
}
//cập nhật khách hàng
export function updateTransactionRemind(params, callback) {
    axios.patch(helper.getApiUrl('transaction_remind'), params).then(function (response) {
        // console.log("response",response)
        if (response.status === 201) {
            callback(null, response.data)
        }
        else callback(response, null)
    }).catch(function (error) {
        console.log("ERROR:", error)
        callback(error, null)
    })
}