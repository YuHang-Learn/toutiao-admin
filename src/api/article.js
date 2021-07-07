import { request } from 'utils/request'

// 获取文章列表
export function getArticleData (params) {
  return request({
    url: '/mp/v1_0/articles',
    params
  })
}

// 获取指定文章
export function getArticle (articleId) {
  // console.log(articleId)
  return request({
    url: `/mp/v1_0/articles/${articleId}`
  })
}

// 获取频道列表
export function getArticleChannel () {
  return request({
    url: '/mp/v1_0/channels'
  })
}

// 删除文章
export function deleteArticle (articleId) {
  return request({
    url: `/mp/v1_0/articles/${articleId}`,
    method: 'Delete'
  })
}

// 新建文章
export function createArticle (data, draft = false) {
  return request({
    url: '/mp/v1_0/articles',
    method: 'POST',
    params: {
      draft
    },
    data
  })
}

// 修改文章
export function updateArticle (articleId, data, draft = false) {
  return request({
    url: `/mp/v1_0/articles/${articleId}`,
    method: 'PUT',
    params: {
      draft
    },
    data
  })
}
