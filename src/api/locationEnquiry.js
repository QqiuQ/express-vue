import request from '@/utils/request'
import axios from 'axios'
// 按照页码和页大小获取用户列表

export function queryList(station) {
  return request({
    url: '/locationEnquiry',
    method: 'post',
    jsonData: true,
    data: station
  })
}

// export function editOrder(order) {
//   return request({
//     url: '/order/edit',
//     method: 'post',
//     jsonData: true,
//     data: order
//   })
// }