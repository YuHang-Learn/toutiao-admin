import { request } from 'utils/request'

export function getCommentStatus (articleId) {
  request({
    url: '/mp/v1_0/comments/status',
    method: 'PUT',
    params: {
      articleId
    }
  })
}
