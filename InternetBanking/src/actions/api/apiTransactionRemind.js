import axios from "axios";
import * as helper from '../../modules/Helper.js'

//lấy danh sách nhắc nợ
export function getTransactionRemind(params, callback) {
    debugger
    console.log("params",params)
    axios.get(helper.getApiUrl('transaction_remind') + '?' + (params.number_payment ? ('number_payment=' + params.number_payment + '&') : '') + (params.number_payment_receive ? ('number_payment_receive=' + params.number_payment_receive) : '') + '&status=0', params).then(function (response) {
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