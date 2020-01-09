import request from '@/utils/request'
import config from '@/theme.config'

export const getPostsList = (currentPage) => {
  return request({
    url: '/posts/',
    method: 'get',
    params: {
      limit: config.config.posts_per_page,
      page: currentPage,
      include: 'tags,authors'
    }
  })
}

export const getTagsPostsList = (page, slug) => {
  return request({
    url: '/content/posts/',
    method: 'get',
    params: {
      filter: `tag:${slug}`,
      include: 'authors,tags',
      formats: 'html,plaintext',
      limit: config.config.posts_per_page,
      page: page
    }
  })
}

export const getPostData = (slug) => {
  return request({
    url: `/content/posts/slug/${slug}/`,
    method: 'get',
    params: {
      formats: 'html,plaintext',
      include: 'authors,tags'
    }
  })
}

export const getPageData = (slug) => {
  return request({
    url: `/content/pages/slug/${slug}/`,
    method: 'get',
    params: {
      formats: 'html,plaintext',
      include: 'authors,tags',
      fields: ['title']
    }
  })
}
