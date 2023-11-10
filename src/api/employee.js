import request from '@/utils/request'

export function queryList(employee) {
  return request({
    url: '/employee',
    method: 'post',
    jsonData: true, // request请求发出之前做了一个处理
    data: employee
  })
}

export function editEmployee(employee) {
  return request({
    url: '/employee/edit',
    method: 'post',
    jsonData: true, // request请求发出之前做了一个处理
    data: employee
  })
}

export function deleteEmployee(emp_id) {
  return request({
    url: '/employee/delete',
    method: 'post',
    params: {
      id: emp_id
    }
  })
}
