import axios from "axios";
import * as helper from '../../modules/Helper.js'

// Đăng nhập
export function signIn(params, callback) {
    const email = encodeURIComponent(params.email.toLowerCase());
    const password = encodeURIComponent(params.password);
    const formData = `email=${email}&password=${password}`;
    // var data ={
    //     status: "success",
    //     token : "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC91c2VyXC9sb2dpbiIsImlhdCI6MTU4MjU1Nzg4OCwiZXhwIjoxNTgyNTYxNDg4LCJuYmYiOjE1ODI1NTc4ODgsImp0aSI6IjlPdzNKSmRsdEFiZWpkbkkiLCJzdWIiOjEsInBydiI6Ijg3ZTBhZjFlZjlmZDE1ODEyZmRlYzk3MTUzYTE0ZTBiMDQ3NTQ2YWEifQ.pZGi4CP5buQ-Y9HBL7Q6heBJPOeeOhvE21tmigYjU9M"
    // }

    // callback(null, data);
    axios.post(helper.getApiUrl('login'), formData).then(function (response) {
         console.log("response",response)
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