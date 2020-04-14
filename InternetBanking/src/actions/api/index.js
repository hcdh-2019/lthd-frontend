import axios from "axios";
import { toast } from 'react-toastify';
import * as Auth from '../../modules/Auth'
import * as type from '../../constants'
import * as helper from '../../modules/Helper.js'
// import * as api from './apiSignIn'


console.log("token", localStorage.getItem('token'));
console.log("refresh_token", localStorage.getItem('refresh_token'));
axios.defaults.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`
axios.interceptors.response.use(response => {
    return response;
}, error => {
    if (error.response && error.response.status === 401) {
        //hết ssesion đăng nhập lại
        // console.log("??",localStorage.getItem('token'))
        Auth.removeUserLogin(true)
    }
    else {
        // api.refreshToken();
        axios.defaults.headers['Authorization'] = `Bearer ${localStorage.getItem('refresh_token')}`
        axios.post(helper.getApiUrl('customer') + "refresh_token", {}).then(function (res) {
            console.log("res refreshToken", res)
            if (res.status === 200) {
                // localStorage.setItem('token', res.data.access_token);
            }
            // else Auth.removeUserLogin(true)
        }).catch(function (error) {
            console.log("ERROR refreshToken:", error)
        })

        console.log("api error:", error.response)
        var message = error.response ? error.response.data ? error.response.data.message ? error.response.data.message : error.response.data : error.response : 'Cannot connect to server'
        // toast.error(message + "!")
    }
    return error;
});
module.exports = {
    axios,
    apiExample: require('./apiExample'),
    apiSignIn: require('./apiSignIn'),
    apiSubject: require('./apiSubject'),
    apiStudent: require('./apiStudent'),
    apiClass: require('./apiClass'),
    apiTeacher: require('./apiTeacher'),
    apiEvent: require('./apiEvent'),
    apiScore: require('./apiScore'),
    apiRevenue: require('./apiRevenue'),
    apiRevenueDetail: require('./apiRevenueDetail'),
    apiTransferMoney: require('./apiTransferMoney'),
    apiCustomer: require('./apiCustomer'),
    apiReceiveMoney: require('./apiReceiveMoney'),
    apiHistory: require('./apiHistory'),
    apiTransactionRemind: require('./apiTransactionRemind')
}