import * as type from '../constants'
import { apiSignIn } from './api'
import { toast } from 'react-toastify';

// Đăng nhật
export function onSignIn(values) {
    return (dispatch, getState) => {
        apiSignIn.signIn(values, function (err, response) {
            //console.log("onSignIn",err, response)
            if (response) {
                localStorage.setItem('token', response.data.access_token);
                dispatch(_onSignIn(response.data));
                // localStorage.setItem('token', response.token);
                // dispatch(_onSignIn(response));
                window.location.href = '/';
            }
            else {
                toast.warning("Đăng nhập thất bại!")
            }
        })
    }
}
export function _onSignIn(payload) {
    return {
        type: type.SIGNIN,
        payload
    }
}

export function getProfile(values) {
    return (dispatch, getState) => {
        apiSignIn.getProfile(values, function (err, response) {
            // console.log("getProfile", response)
            if (response) {
                dispatch(_getProfile(response));
            }
        })
    }
}

// export function getProfile(values) {
//     return (dispatch, getState) => {
//         dispatch(_getProfile(null));
//     }
// }

export function _getProfile(payload) {
    return {
        type: type.GET_PROFILE,
        payload
    }
}
