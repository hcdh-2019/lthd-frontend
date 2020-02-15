import axios from "axios";
import * as helper from '../../modules/Helper.js'

export function createStudent(params, callback) {
    axios.post(helper.getApiUrl('student'), params).then(function (response) {
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

export function updateStudent(params, callback) {
    // console.log("update_Student params: ", params)
    axios.put(helper.getApiUrl('student') + "/" + params.id, params).then(function (response) {
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

export function deleteStudent(params, callback) {
    // console.log("update_Student params: ", params)
    axios.delete(helper.getApiUrl('student') + "/" + params.id, params).then(function (response) {
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

export function getStudent(params, callback) {
    axios.get(helper.getApiUrl('student'), params).then(function (response) {
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