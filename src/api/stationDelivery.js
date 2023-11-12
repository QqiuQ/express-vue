import request from '@/utils/request'

export function shipping(id) {
  return request({
    url: '/station/delivery/shipping',
    method: 'post',
    params: {
      id: id
    }
  })
}

export function stocking(id) {
  return request({
    url: '/station/delivery/stocking',
    method: 'post',
    params: {
      id: id
    }
  })
}

export function removeStock(id) {
  return request({
    url: '/station/delivery/removestock',
    method: 'post',
    params: {
      id: id
    }
  })
}
