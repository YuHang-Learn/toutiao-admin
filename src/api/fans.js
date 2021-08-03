import { request } from 'utils/request'

export function getFansData (params) {
  return request({
    url: '/mp/v1_0/followers',
    method: 'GET',
    params
  })
}

export function getFansAllData () {
  return request({
    url: '/mp/v1_0/statistics/followers',
    method: 'GET'
  })
}
