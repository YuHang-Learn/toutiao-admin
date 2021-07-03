import { request } from 'utils/request'

export function getArticleData (params) {
  return request({
    url: '/mp/v1_0/articles',
    params
  })
}

export function getArticleChannel () {
  return request({
    url: '/mp/v1_0/channels'
  })
}
