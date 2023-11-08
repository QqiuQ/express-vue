import request from '@/utils/request'

export function queryList(user) {
  return request({
    url: '/user',
    method: 'post',
    jsonData: true,
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
