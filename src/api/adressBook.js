import request from '@/utils/request'

export function queryAllAddress(body) {
  return request({
    url: '/address',
    method: 'post',
    jsonData: true,
    data: body
  })
}

export function addAddress(body) {
  return request({
    url: '/address/add',
    method: 'post',
    jsonData: true,
    data: body
  })
}

export function deleteAddById(id) {
  return request({
    url: '/address/delete',
    method: 'post',
    params: {
      id: id
    }
  })
}

export function editAddress(body) {
  return request({
    url: '/address/edit',
    method: 'post',
    jsonData: true,
    data: body
  })
}
