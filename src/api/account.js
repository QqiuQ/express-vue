import request from '@/utils/request'

export function getInfo(accountType, token) {
  return request({
    url: '/account/info',
    method: 'get',
    params: { accountType, token }
  })
}

export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/logout',
    method: 'post'
  })
}
