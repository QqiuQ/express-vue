import request from '@/utils/request'

export function removeStationAdmin(id) {
  return request({
    url: '/station/employee/delete',
    method: 'post',
    params: {
      id: id
    }
  })
}

export function addStationAdmin(stationId, employeeId) {
  return request({
    url: '/station/admins/add',
    method: 'post',
    params: {
      stationId: stationId,
      employeeId: employeeId
    }
  })
}

export function unAvailableStationEmployee(stationId) {
  return request({
    url: '/station/admins/unavailable',
    method: 'get',
    params: {
      stationId: stationId
    }
  })
}

export function availableEmployees() {
  return request({
    url: '/station/admins/available',
    method: 'get'
  })
}

export function queryAdmins(stationId) {
  return request({
    url: '/station/admins',
    method: 'get',
    params: {
      stationId: stationId
    }
  })
}

export function queryList() {
  return request({
    url: '/station',
    method: 'post'
  })
}

export function addStation(station) {
  return request({
    url: '/station/add',
    method: 'post',
    jsonData: true,
    data: station
  })
}

export function editStation(station) {
  return request({
    url: '/station/edit',
    method: 'post',
    jsonData: true,
    data: station
  })
}

export function deleteoneStation(id) {
  return request({
    url: '/station/deleteone',
    method: 'post',
    jsonData: true,
    data: id
  })
}

export function deletemanyStation(ids) {
  return request({
    url: '/station/deletemany',
    method: 'post',
    jsonData: true,
    data: ids
  })
}


// export function getAllRelatedDelivery() {
//   return ''
// }


// export function queryUsers(pageParams, user) {
//   return request({
//     url: '/user/query',
//     method: 'post',
//     // jsonData: true, // 添加jsonData content-type: application/json 向后端請求
//     jsonData: true,
//     params: {
//       pageParams: pageParams,
//       user: user
//     }
//   })
// }
