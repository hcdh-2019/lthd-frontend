import axios from "axios";
import { toast } from 'react-toastify';
import * as Auth from '../../modules/Auth'
import * as type from '../../constants'

// console.log("token",localStorage.getItem('token'))
axios.defaults.headers['Authorization'] = `bearer ${localStorage.getItem('token')}`
axios.interceptors.response.use(response => {
    return response;
}, error => {
    if (error.response && error.response.status === 401) {
        //hết ssesion đăng nhập lại
        // console.log("??",localStorage.getItem('token'))
        Auth.removeUserLogin(true)
    }
    else {
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
    apiCustomer: require('./apiCustomer')
}