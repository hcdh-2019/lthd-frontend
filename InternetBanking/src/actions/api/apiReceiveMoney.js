import axios from "axios";
import * as helper from '../../modules/Helper.js'

// Thêm khách hàng
export function receiveMoney(params, callback) {
    console.log("receiveMoney",params)
    axios.post(helper.getApiUrl('receive'), params).then(function (response) {
         console.log("response_api",response)
        if (response.status === 201) {
            callback(null, response.data)
        }
        else callback(response, null)
    }).catch(function (error) {
        console.log("ERROR:", error)
        callback(error, null)
    })
}