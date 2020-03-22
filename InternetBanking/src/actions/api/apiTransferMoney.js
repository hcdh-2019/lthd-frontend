import axios from "axios";
import * as helper from '../../modules/Helper.js'

//lấy danh sách tên gợi nhớ theo khách hàng
export function getCustomerStoreByCustomerId(params, callback) {
    axios.get(helper.getApiUrl('customer') + "customer_store/" + params.id, params).then(function (response) {
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

//lấy thông tin khách hàng theo số tài khoản
export function getCustomerByNumberPayment(params, callback) {
    axios.get(helper.getApiUrl('customer') + "number_payment/" + params.id, params).then(function (response) {
        // console.log("response1",response)
        if (response.data.status === "success") {
            callback(null, response.data)
        }
        else callback(response, null)
    }).catch(function (error) {
        console.log("ERROR:", error)
        callback(error, null)
    })
}

// Thêm tên gợi nhớ
export function SaveCustomerStore(params, callback) {
    console.log("SaveCustomerStore", params)
    axios.post(helper.getApiUrl('customer') + "customer_store/", params).then(function (response) {
        console.log("response_api", response)
        if (response.status === 201 && response.statusText === "CREATED") {
            callback(null, response.data)
        }
        else callback(response, null)
    }).catch(function (error) {
        console.log("ERROR:", error)
        callback(error, null)
    })
}

// Chuyển tiền
export function TransactionMoney(params, callback) {
    console.log("TransactionMoney", params)
    axios.post(helper.getApiUrl('customer') + "payment/transaction", params).then(function (response) {
        console.log("response_api", response)
        if (response.status === 201 && response.statusText === "CREATED") {
            callback(null, response.data)
        }
        else callback(response, null)
    }).catch(function (error) {
        console.log("ERROR:", error)
        callback(error, null)
    })
}

// Xác nhận OTP
export function ConfirmOTP(params, callback) {
    console.log("ConfirmOTP", params)
    axios.post(helper.getApiUrl('customer') + "payment/transaction_confirm", params).then(function (response) {
        console.log("response_api", response)
        if (response.status === 201 && response.statusText === "CREATED") {
            callback(null, response.data)
        }
        else callback(response, null)
    }).catch(function (error) {
        console.log("ERROR:", error)
        callback(error, null)
    })
}