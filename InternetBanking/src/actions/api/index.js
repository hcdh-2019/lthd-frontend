import axios from "axios";
import { toast } from 'react-toastify';
import * as Auth from '../../modules/Auth'
import * as type from '../../constants'

// console.log("token",localStorage.getItem('token'))
// axios.defaults.headers['Authorization'] = `bearer ${localStorage.getItem('token')}`
// axios.defaults.headers['Access-Control-Allow-Origin']= '*';
// axios.defaults.headers['Access-Control-Allow-Methods']= 'POST, GET, OPTIONS, PUT, DELETE';
// axios.defaults.headers['Access-Control-Allow-Headers']= 'Origin, Content-Type, Accept, Authorization, X-Request-With';
// axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';

// axios.defaults.headers['Access-Control-Allow-Origin'] = `http://ec2-54-173-45-32.compute-1.amazonaws.com`
// axios.defaults.headers['Access-Control-Allow-Headers'] = `Origin, X-Requested-With, Content-Type, Accept`

axios.interceptors.response.use(response => {
    // response.header("Access-Control-Allow-Origin", "http://ec2-54-173-45-32.compute-1.amazonaws.com"); // update to match the domain you will make the request from
    // response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
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