import request from '@/utils/request'

export function uploadAvatar(file) {
  return request({
    url: '/upload/avatar',
    method: 'post',
    fileData: true,
    data: file
  })
}

