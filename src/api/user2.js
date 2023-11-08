import request from '@/utils/request'

export function queryList(user) {
  return request({
    url: '/user',
    method: 'post',
    jsonData: true, // request请求发出之前做了一个处理
    data: user
  })
}

export function editUser(user) {
  return request({
    url: '/user/edit',
    method: 'post',
    jsonData: true,
    data: user
  })
}

export function deleteUser(userId) {
  return request({
    url: '/user/delete',
    method: 'post',
    params: {
      id: userId
    }
  })
}

export function queryUser(id) {
  return request({
    url: '/user',
    method: 'get',
    params: {
      id: id
    }
  })
}
