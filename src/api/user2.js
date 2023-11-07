import request from '@/utils/request'
import axios from 'axios'
// 按照页码和页大小获取用户列表
export function fetchList(page, limit) {
  return request({
    url: '/user',
    method: 'get',
    params: { page, limit }
  })
}

export function queryList(user) {
  return request({
    url: '/user',
    method: 'post',
    jsonData: true,
    data: user
  })
}

export function queryUsers(pageParams, user) {
  return request({
    url: '/user/query',
    method: 'post',
    // jsonData: true, // 添加jsonData content-type: application/json 向后端請求
    jsonData: true,
    params: {
      pageParams: pageParams,
      user: user
    }
  })
}
