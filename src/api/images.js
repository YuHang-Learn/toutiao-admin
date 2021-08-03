import { request } from 'utils/request'

export function getImages (params) {
  return request({
    url: '/mp/v1_0/user/images',
    method: 'GET',
    params
  })
}

export function collectImage (imageId, collect) {
  return request({
    url: `/mp/v1_0/user/images/${imageId}`,
    method: 'PUT',
    data: {
      collect
    }
  })
}

export function deleteImage (imageId) {
  return request({
    url: `/mp/v1_0/user/images/${imageId}`,
    method: 'DELETE'
  })
}

export function uploadImage (data) {
  return request({
    url: '/mp/v1_0/user/images',
    method: 'POST',
    data
  })
}
