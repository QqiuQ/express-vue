import request from '@/utils/request'

export function register(user) {
  return request({
    url: '/register',
    method: 'post',
    user
  })
}

export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}


export function logout() {
  return request({
    url: '/logout',
    method: 'post'
  })
}
