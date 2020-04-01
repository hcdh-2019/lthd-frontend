import ConfigURL from './config_url'
// import * as helper from '../src/modules/Helper'


module.exports = {
    // _env:ConfigURL,
    api: {
        'root': ConfigURL.API_URL,
        'login': ConfigURL.API_URL + '/api/user/login',
        'get_profile': ConfigURL.API_URL + '/api/user',
        'teacher': ConfigURL.API_URL + '/api/teacher',
        'subject': ConfigURL.API_URL + '/api/subject',
        'student': ConfigURL.API_URL + '/api/student',
        'class': ConfigURL.API_URL + '/api/class',
        'event': ConfigURL.API_URL + '/api/event',
        'score': ConfigURL.API_URL + '/api/score',
        'revenue': ConfigURL.API_URL + '/api/revenue',
        'revenue_detail': ConfigURL.API_URL + '/api/revenue_detail',
        'object': ConfigURL.API_URL + '/api/revenue/getListObjectByID',
        'customer': ConfigURL.API_URL2 + '/customer/',
        'receive': ConfigURL.API_URL2 + '/payment/'
    },
    urlPath: {
        'SignIn': {
            name: "SignIn",
            url: "/signin",
            permission: false,
            title: "Đăng nhập"
        },
        'Profile': {
            name: "Profile",
            url: "/Profile",
            permission: false,
            title: "Thông tin cá nhân"
        },
        'StudentManagement': {
            name: "StudentManagement",
            url: '/student-management',
            role: 'student',
            permission: true,
            title: "Quản lý học sinh",
            breadcrumb: "Quản lý học sinh"
        },
        'TeacherManagement': {
            name: "TeacherManagement",
            url: '/teacher-management',
            role: 'teacher',
            permission: true,
            title: "Quản lý giáo viên",
            breadcrumb: "Quản lý giáo viên"
        },
        'SubjectManagement': {
            name: "SubjectManagement",
            url: '/subject-management',
            role: 'subject',
            permission: true,
            title: "Quản lý môn học",
            breadcrumb: "Quản lý môn học"
        },
        'EventManagement': {
            name: "EventManagement",
            url: '/event-management',
            role: 'event_school',
            permission: true,
            title: "Quản lý hoạt động",
            breadcrumb: "Quản lý hoạt động"
        },
        'ClassManagement': {
            name: "ClassManagement",
            url: '/class-management',
            role: 'class',
            permission: true,
            title: "Quản lý lớp học",
            breadcrumb: "Quản lý lớp học"
        },
        'ScoreManagement': {
            name: "ScoreManagement",
            url: '/score-management',
            role: 'score',
            permission: true,
            title: "Quản lý điểm",
            breadcrumb: "Quản lý điểm"
        },
        'RevenueManagement': {
            name: "RevenueManagement",
            url: '/revenue-management',
            role: 'budget',
            permission: true,
            title: "Quản lý thu chi",
            breadcrumb: "Quản lý thu chi"
        },
        'RevenueDetailManagement': {
            name: "RevenueDetailManagement",
            url: '/revenue-detail-management',
            role: 'budget',
            permission: true,
            title: "Quản lý chi tiết thu chi",
            breadcrumb: "Quản lý chi tiết thu chi"
        },
        'TransferMoneySameBank': {
            name: "TransferMoneySameBank",
            url: '/transfer-money-same-bank',
            role: 'budget',
            permission: true,
            title: "Chuyển tiền cùng ngân hàng",
            breadcrumb: "Chuyển tiền cùng ngân hàng"
        },
        'CustomerManagement': {
            name: "CustomerManagement",
            url: '/customer-management',
            role: 'budget',
            permission: true,
            title: "Quản lý khách hàng",
            breadcrumb: "Quản lý khách hàng"
        },
        'ReceiveMoneyBankAccount': {
            name: "ReceiveMoneyBankAccount",
            url: '/receive-money-bankaccount',
            role: 'budget',
            permission: true,
            title: "Nạp tiền vào tài khoản",
            breadcrumb: "Nạp tiền vào tài khoản"
        }
    }

    // test:{
    //     student:"StudentManagement",
    //     teacher:"",
    //     score:"",
    //     event_school:"",
    //     budget:"",
    //     schedule:"",
    //     subject:"SubjectManagement",
    //     class:""
    // }
};