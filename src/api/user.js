import { request } from 'utils/request'

export function userLogin (data) {
  const user = {
    mobile: data.name,
    code: data.password
  }
  return request({
    method: 'post',
    url: '/mp/v1_0/authorizations',
    data: user
  })
}

export function getUserInfo () {
  return request({
    method: 'get',
    url: '/mp/v1_0/user/profile'
  })
}
