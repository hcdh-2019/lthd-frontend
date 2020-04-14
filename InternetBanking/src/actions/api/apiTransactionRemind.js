import axios from "axios";
import * as helper from '../../modules/Helper.js'

//lấy danh sách nhắc nợ
export function getTransactionRemind(params, callback) {
    debugger
    axios.get(helper.getApiUrl('transaction_remind') + '?number_payment=2874475617&number_payment_receive=2874475617&status=0', params).then(function (response) {
        console.log("response",response)
        debugger
        if (response.status === 200) {
            callback(null, response.data.data)
        }
        else callback(response, null)
    }).catch(function (error) {
        console.log("ERROR:", error)
        callback(error, null)
    })
}