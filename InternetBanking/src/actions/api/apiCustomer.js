import axios from "axios";
import * as helper from '../../modules/Helper.js'

// Thêm khách hàng
export function createCustomer(params, callback) {
    // console.log("createCustomer", JSON.stringify(params))
    axios.post(helper.getApiUrl('customer'), params).then(function (response) {
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
export function updateCustomer(params, callback) {
    axios.patch(helper.getApiUrl('customer'), params).then(function (response) {
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
//xóa khách hàng
export function deleteCustomer(params, callback) {
    // console.log("deleteCustomer params: ", params)
    axios.delete(helper.getApiUrl('customer') + params.id, params).then(function (response) {
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
//lấy danh sách khách hàng
export function getCustomer(params, callback) {
    var api = '';
    if (params) {
        api = helper.getApiUrl('customer') + '?' + (params.phone ? ('phone=' + params.phone) : '') + (params.customer_name ? ('&customer_name=' + params.customer_name) : '');
    } else {
        api = helper.getApiUrl('customer')
    }

    axios.get(api, params).then(function (response) {
        // console.log("response_cus",response)
        if (response.status === 200) {
            callback(null, response.data.data)
        }
        else callback(response, null)
    }).catch(function (error) {
        console.log("ERROR:", error)
        callback(error, null)
    })
}

//lấy khách hàng theo id
export function getCustomerByID(params, callback) {
    // console.log("getCustomerByID params: ", params)
    axios.get(helper.getApiUrl('customer') + params.id, params).then(function (response) {
        // console.log("response",response)
        if (response.status === 201) {
            callback(null, response.data.data)
        }
        else callback(response, null)
    }).catch(function (error) {
        console.log("ERROR:", error)
        callback(error, null)
    })
}

// Cập nhật mật khẩu
export function UpdatePass(params, callback) {
    console.log("UpdatePass", JSON.stringify(params))
    axios.post(helper.getApiUrl('customer') + "change_password", params).then(function (response) {
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