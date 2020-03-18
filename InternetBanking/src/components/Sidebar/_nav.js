import * as helper from '../../modules/Helper';
export default {
  items: [
    {
      name: helper.getPathHost("SubjectManagement", "title"),
      url: helper.getPathHost("SubjectManagement", "url"),
      icon: 'icon-home',
      role: helper.getPathHost("SubjectManagement", "role"),
    },
    {
      name: helper.getPathHost("TeacherManagement", "title"),
      url: helper.getPathHost("TeacherManagement", "url"),
      icon: 'icon-home',
      role: helper.getPathHost("TeacherManagement", "role"),
    },
    {
      name: helper.getPathHost("ClassManagement", "title"),
      url: helper.getPathHost("ClassManagement", "url"),
      icon: 'icon-home',
      role: helper.getPathHost("ClassManagement", "role"),
    },
    {
      name: helper.getPathHost("StudentManagement", "title"),
      url: helper.getPathHost("StudentManagement", "url"),
      icon: 'icon-home',
      role: helper.getPathHost("StudentManagement", "role"),
    },
    {
      name: helper.getPathHost("ScoreManagement", "title"),
      url: helper.getPathHost("ScoreManagement", "url"),
      icon: 'icon-home',
      role: helper.getPathHost("ScoreManagement", "role"),
    },
    {
      name: helper.getPathHost("RevenueManagement", "title"),
      url: helper.getPathHost("RevenueManagement", "url"),
      icon: 'icon-home',
      role: helper.getPathHost("RevenueManagement", "role"),//budget
    },
    {
      name: helper.getPathHost("RevenueDetailManagement", "title"),
      url: helper.getPathHost("RevenueDetailManagement", "url"),
      icon: 'icon-home',
      role: helper.getPathHost("RevenueDetailManagement", "role"),
    },
    {
      name: helper.getPathHost("EventManagement", "title"),
      url: helper.getPathHost("EventManagement", "url"),
      icon: 'icon-home',
      role: helper.getPathHost("EventManagement", "role"),
    },
    {
      name: helper.getPathHost("TransferMoneySameBank", "title"),
      url: helper.getPathHost("TransferMoneySameBank", "url"),
      icon: 'icon-home',
      role: helper.getPathHost("TransferMoneySameBank", "role"),
    },
    {
      name: helper.getPathHost("CustomerManagement", "title"),
      url: helper.getPathHost("CustomerManagement", "url"),
      icon: 'icon-home',
      role: helper.getPathHost("CustomerManagement", "role"),
    },
    {
      name: helper.getPathHost("ReceiveMoneyBankAccount", "title"),
      url: helper.getPathHost("ReceiveMoneyBankAccount", "url"),
      icon: 'icon-home',
      role: helper.getPathHost("ReceiveMoneyBankAccount", "role"),
    },
    // {
    //   name: 'Quản lý đoàn đội',
    //   url: '/dashboard',
    //   icon: 'icon-home',
    //   role: 'event_school'
    // },
    // {
    //   name: 'Quản lý thời khóa biểu',
    //   url: '/dashboard',
    //   icon: 'icon-home',
    //   role: 'schedule'
    // },
  ]
};