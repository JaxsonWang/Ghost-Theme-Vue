import api from '@/utils/ghost'
import config from '@/theme.config'

export const getPostsList = async(page) => {
  return await api.posts
    .browse({
      include: 'authors,tags',
      formats: 'html,plaintext',
      limit: config.config.posts_per_page,
      page: page
    })
    .catch(err => {
      console.error(err)
    })
}
