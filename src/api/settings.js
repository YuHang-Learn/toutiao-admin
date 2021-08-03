import { request } from 'utils/request'

export function getInfo () {
  return request({
    url: '/mp/v1_0/user/profile',
    method: 'GET'
  })
}

export function changeInfo (data) {
  return request({
    url: '/mp/v1_0/user/profile',
    method: 'PATCH',
    data
  })
}

export function changePhoto (data) {
  return request({
    url: '/mp/v1_0/user/photo',
    method: 'PATCH',
    data
  })
}
