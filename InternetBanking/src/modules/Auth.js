// import * as helper from './Helper'

export function rolesMatched(role) {
  // console.log("token",localStorage.getItem('token'))
  if (localStorage.getItem('token') && (role || role === "any")) {
    return true
  }
  return false;
}

export function removeUserLogin(isReload) {
  localStorage.removeItem('token');
  isReload && (window.location.href = '/#/signin');
}