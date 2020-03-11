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
        // console.log("response",response)
        if (response.data.http_status_response === 200) {
            callback(null, response.data)
        }
        else callback(response, null)
    }).catch(function (error) {
        console.log("ERROR:", error)
        callback(error, null)
    })
}
