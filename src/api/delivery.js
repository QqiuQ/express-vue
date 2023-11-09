import request from '@/utils/request'

export function queryReceive(phone) {
  return request({
    url: '/delivery/receive',
    method: 'get',
    params: {
      phone: phone
    }
  })
}

export function receiveConfirm(id) {
  return request({
    url: '/delivery/confirm',
    method: 'post',
    params: {
      id: id
    }
  })
}

export function getDelivery(id) {
  return request({
    url: '/delivery',
    method: 'get',
    params: {
      id: id
    }
  })
}

