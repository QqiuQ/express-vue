import request from '@/utils/request'

// 按照页码和页大小获取用户列表

export function availableEmployees() {
  return request({
    url: '/station/employees/available',
    method: 'get'
  })
}

export function queryList(stationId) {
  return request({
    url: '/station/employees',
    method: 'get',
    params: {
      stationId: stationId
    }
  })
}

export function queryStation(employeeId) {
  return request({
    url: '/station',
    method: 'get',
    params: {
      employeeId: employeeId
    }
  })
}

export function addStationemployee(employeeId, stationId) {
  return request({
    url: '/station/employee/add',
    method: 'post',
    params: {
      employeeId: employeeId,
      stationId: stationId
    }
  })
}
export function addStationCourier(employeeId, stationId) {
  return request({
    url: '/station/courier/add',
    method: 'post',
    params: {
      employeeId: employeeId,
      stationId: stationId
    }
  })
}

// export function editStation(station) {
//   return request({
//     url: '/station/edit',
//     method: 'post',
//     jsonData: true,
//     data: station
//   })
// }
export function deleteoneStation(id) {
  console.log(id)
  return request({
    url: '/station/employee/delete',
    method: 'post',
    params: {
      id: id
    }
  })
}

// export function deletemanyStation(ids) {
//   return request({
//     url: '/station/deletemany',
//     method: 'post',
//     jsonData: true,
//     data: ids
//   })
// }



