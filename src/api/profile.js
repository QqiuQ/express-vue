import request from '@/utils/request'

export function userProfile(userId) {
  return request({
    url: '/profile/user',
    method: 'get',
    params: {
      id: userId
    }
  })
}

export function employeeProfile(empId) {
  return request({
    url: '/profile/employee',
    method: 'get',
    params: {
      id: empId
    }
  })
}

export function userProfileUpdate(user) {
  return request({
    url: '/profile/user/edit',
    method: 'post',
    jsonData: true,
    data: user
  })
}

export function employeeProfileUpdate(employee) {
  return request({
    url: '/profile/employee/edit',
    method: 'post',
    jsonData: true,
    data: employee
  })
}


