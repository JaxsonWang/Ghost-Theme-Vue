import request from '@/utils/request'

export const getSettings = () => {
  return request({
    url: '/settings/',
    method: 'get'
  })
}
