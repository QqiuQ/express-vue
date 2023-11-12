import request from '@/utils/request'

export function queryTasks(region) {
  return request({
    url: '/region/deliveries',
    method: 'get',
    params: { region: region }
  })
}

// 传递的是一个 CourierDelivery对象
export function acceptTask(delivery) {
  return request({
    url: '/courier/delivery/accept',
    method: 'post',
    jsonData: true,
    data: delivery
  })
}

export function collectTasks(courierId) {
  return request({
    url: '/courier/delivery/collect',
    method: 'get',
    params: {
      courierId: courierId
    }
  })
}

export function dispatchTasks(courierId) {
  return request({
    url: '/courier/delivery/dispatch',
    method: 'get',
    params: {
      courierId: courierId
    }
  })
}

export function confirmCollectTask(deliveryId, stationId) {
  return request({
    url: '/courier/delivery/collect/confirm',
    method: 'post',
    params: {
      deliveryId: deliveryId,
      stationId: stationId
    }
  })
}

export function confirmDispatchTask(deliveryId, courierId, stationId) {
  return request({
    url: '/courier/delivery/dispatch/confirm',
    method: 'post',
    params: {
      deliveryId: deliveryId,
      courierId: courierId,
      stationId: stationId
    }
  })
}
