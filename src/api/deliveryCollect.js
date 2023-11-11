import request from '@/utils/request'
import axios from 'axios'
// 按照页码和页大小获取用户列表

export function queryList(id) {
  return request({
    url: '/delivery',
    method: 'post',
    params:{
      id : id
    }
  })
}

export function expresser(id) {
    return request({
      url: '/employee',
      method: 'get',
      params:{
        id : id
      }
    })
  }

export function change_status(id) {
  return request({
    url: '/delivery/collect',
    method: 'post',
    params:{
      id : id
    }
  })
}
