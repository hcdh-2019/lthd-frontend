import axios from "axios";
import * as helper from '../../modules/Helper.js'

// Đăng nhập
export function signIn1(params, callback) {
    const email = encodeURIComponent(params.email.toLowerCase());
    const password = encodeURIComponent(params.password);
    const formData = `email=${email}&password=${password}`;
    // var data ={
    //     status: "success",
    //     token : "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC91c2VyXC9sb2dpbiIsImlhdCI6MTU4MjU1Nzg4OCwiZXhwIjoxNTgyNTYxNDg4LCJuYmYiOjE1ODI1NTc4ODgsImp0aSI6IjlPdzNKSmRsdEFiZWpkbkkiLCJzdWIiOjEsInBydiI6Ijg3ZTBhZjFlZjlmZDE1ODEyZmRlYzk3MTUzYTE0ZTBiMDQ3NTQ2YWEifQ.pZGi4CP5buQ-Y9HBL7Q6heBJPOeeOhvE21tmigYjU9M"
    // }

    // callback(null, data);
    axios.post(helper.getApiUrl('login'), formData).then(function (response) {
        console.log("response", response)
        if (response.status === 200) {
            callback(null, response.data)
        }
        else callback(response, null)
    }).catch(function (error) {
        console.log("ERROR SigIn:", error)
        callback(error, null)
    })
}

// Đăng nhập
export function signIn(params, callback) {
    var paramsLogin = {
        "email_or_username": params.email,
        "password": params.password
    }
    // console.log("paramsLogin", paramsLogin)

    axios.post(helper.getApiUrl('customer') + "login", paramsLogin).then(function (response) {
        console.log("response signIn", response)
        if (response.status === 201) {
            callback(null, response.data)
        }
        else callback(response, null)
    }).catch(function (error) {
        console.log("ERROR SigIn:", error)
        callback(error, null)
    })
}

// Refresh token
// export function refreshToken(params, callback) {
//     axios.post(helper.getApiUrl('customer') + "refresh_token", params).then(function (response) {
//         console.log("response refreshToken", response)
//         if (response.status === 200) {
//             // localStorage.setItem('token', response.data.access_token);
//             callback(null, response.data)
//         }
//         else callback(response, null)
//     }).catch(function (error) {
//         console.log("ERROR SigIn:", error)
//         callback(error, null)
//     })
// }

export function getProfile(params, callback) {
    axios.get(helper.getApiUrl('customer') + "profile", params).then(function (response) {
        // console.log("response params", response)
        if (response.status === 200) {
            callback(null, response.data)
        }
        else callback(response, null)
    }).catch(function (error) {
        console.log("ERROR SigIn:", error)
        callback(error, null)
    })
}