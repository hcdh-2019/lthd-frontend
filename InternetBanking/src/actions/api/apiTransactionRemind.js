import axios from "axios";
import * as helper from '../../modules/Helper.js'

//lấy danh sách nhắc nợ
export function getTransactionRemind(params, callback) {
    axios.get(helper.getApiUrl('transaction_remind'), params).then(function (response) {
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