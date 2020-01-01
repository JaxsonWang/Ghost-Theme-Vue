import GhostContentAPI from '@tryghost/content-api'

const api = new GhostContentAPI({
  url: process.env.VUE_APP_CONTENT_API_URL,
  key: process.env.VUE_APP_CONTENT_API_KEY,
  version: 'v3'
})

export default api
