import axios from "axios";
import * as helper from '../../modules/Helper.js'

// Đăng nhập
export function signIn(params, callback) {
    const email = encodeURIComponent(params.email.toLowerCase());
    const password = encodeURIComponent(params.password);
    const formData = `email=${email}&password=${password}`;
    axios.post(helper.getApiUrl('login'), formData).then(function (response) {
        // console.log("response",response)
        if (response.status === 200) {
            callback(null, response.data)
        }
        else callback(response, null)
    }).catch(function (error) {
        console.log("ERROR SigIn:", error)
        callback(error, null)
    })
}

export function getProfile(params, callback) {
    axios.get(helper.getApiUrl('get_profile'), params).then(function (response) {
        // console.log("response",response)
        if (response.status === 200) {
            callback(null, response.data)
        }
        else callback(response, null)
    }).catch(function (error) {
        console.log("ERROR SigIn:", error)
        callback(error, null)
    })
}