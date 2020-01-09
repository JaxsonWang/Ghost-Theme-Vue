import request from '@/utils/request'

export const getSettings = () => {
  return request({
    url: '/content/settings/',
    method: 'get'
  })
}
