import request from '@/utils/request'

// 获取管理员列表
export function getAdmins(stationId) {
  return request({
    url: '/station/admin',
    method: 'get',
    params: {
      id: stationId
    }
  })
}
