import axios from "axios";
import * as helper from '../../modules/Helper.js'

export function createSubject(params, callback) {
    axios.post(helper.getApiUrl('subject'), params).then(function (response) {
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

export function updateSubject(params, callback) {
    // console.log("update_subject params: ", params)
    axios.put(helper.getApiUrl('subject') + "/" + params.id, params).then(function (response) {
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

export function deleteSubject(params, callback) {
    // console.log("update_subject params: ", params)
    axios.delete(helper.getApiUrl('subject') + "/" + params.id, params).then(function (response) {
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

export function getSubject(params, callback) {
    axios.get(helper.getApiUrl('subject'), params).then(function (response) {
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