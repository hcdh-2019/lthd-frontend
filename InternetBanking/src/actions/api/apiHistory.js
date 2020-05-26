import axios from "axios";
import * as helper from '../../modules/Helper.js'

//lấy lịch sử giao dịch theo STK, Mã khách hàng
export function getHistoryBySTK(params, callback) {
    // console.log("getCustomerByID params: ", params);
    axios.get(helper.getApiUrl('history') + params.number_payment + '?from=' + params.from + '&to=' + params.to).then(function (response) {
         console.log("response_his",response);
        if (response.status === 201) {
            callback(null, response.data.data)
        }
        else callback(response, null)
    }).catch(function (error) {
        console.log("ERROR:", error)
        callback(error, null)
    })
}