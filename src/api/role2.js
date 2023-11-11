import request from '@/utils/request'

export function getAllRoles() {
  return request({
    url: '/role',
    method: 'get'
  })
}

export function queryEmployeeByRoleId(id) {
  return request({
    url: '/role/employee',
    method: 'get',
    params: {
      id: id
    }
  })
}

export function changeEmployeeRole(employeeId, curRoleId, newRoleId) {
  return request({
    url: '/role/change',
    method: 'post',
    params: {
      employeeId: employeeId, curRoleId: curRoleId, newRoleId: newRoleId
    }
  })
}

