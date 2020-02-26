import { combineReducers } from 'redux'
import Example from './rExample'
import SignIn from './rSignIn'
import Subject from './rSubject'
import Teacher from './rTeacher'
import Student from './rStudent'
import Class from './rClass'
import Event from './rEvent'
import Score from './rScore'
import Revenue from './rRevenue'
import RevenueDetail from './rRevenueDetail'
import TransferMoney from './rTransferMoney'
export default combineReducers({
    Example,
    SignIn,
    Subject,
    Teacher,
    Student,
    Class,
    Event,
    Score,
    Revenue,
    RevenueDetail,
    TransferMoney
})