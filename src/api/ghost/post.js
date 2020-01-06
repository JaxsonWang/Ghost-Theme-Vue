import api from '@/utils/ghost'
import config from '@/theme.config'

export const getPostsList = (page) => {
  return api.posts
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

export const getTagsPostsList = (page, slug) => {
  return api.posts
    .browse({
      filter: `tag:${slug}`,
      include: 'authors,tags',
      formats: 'html,plaintext',
      limit: config.config.posts_per_page,
      page: page
    })
    .catch(err => {
      console.error(err)
    })
}

export const getPostData = (slug) => {
  return api.posts
    .read({
      slug: slug,
      formats: 'html,plaintext'
    })
    .catch(err => {
      console.error(err)
    })
}

export const getPageData = (slug) => {
  return api.pages
    .read({
      slug: slug,
      formats: 'html,plaintext',
      fields: ['title']
    })
    .catch(err => {
      console.error(err)
    })
}
