import axios from "axios";
import * as helper from '../../modules/Helper.js'

export function createClass(params, callback) {
    axios.post(helper.getApiUrl('class'), params).then(function (response) {
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

export function updateClass(params, callback) {
    // console.log("update_Class params: ", params)
    axios.put(helper.getApiUrl('class') + "/" + params.id, params).then(function (response) {
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

export function deleteClass(params, callback) {
    // console.log("update_Class params: ", params)
    axios.delete(helper.getApiUrl('class') + "/" + params.id, params).then(function (response) {
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

export function getClass(params, callback) {
    axios.get(helper.getApiUrl('class'), params).then(function (response) {
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