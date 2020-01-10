<template>
  <div class="Page">
    <div v-html="pageData.html" />
  </div>
</template>
<script>
import {getPostData, getPageData} from '@/api/ghost/post'
export default {
  name: 'Page',
  data() {
    return {
      pageData: {
        primary_tag: {
          name: ''
        },
        primary_author: {
          name: ''
        },
        feature_image_width: 0,
        feature_image_height: 0
      }
    }
  },
  watch: {
    'pageData.feature_image': {
      handler(value) {
        const self = this
        const image = new Image()
        image.src = value
        self.pageData.feature_image_width = image.width
        self.pageData.feature_image_height = image.height
      },
      immediate: false,
      deep: false
    }
  },
  metaInfo() {
    const self = this
    return {
      title: self.$store.getters.settings.meta_title,
      meta: [
        {vmid: 'description', name: 'description', content: self.$store.getters.settings.description},
        {vmid: 'og:site_name', property: 'og:site_name', content: self.$store.getters.settings.title},
        {vmid: 'og:type', property: 'og:type', content: 'article'},
        {vmid: 'og:title', property: 'og:title', content: self.pageData.og_title},
        {vmid: 'og:description', property: 'og:description', content: self.pageData.og_description},
        {vmid: 'og:url', property: 'og:url', content: self.pageData.url},
        {vmid: 'og:image', property: 'og:image', content: self.pageData.og_image},
        {vmid: 'og:image:width', property: 'og:image:width', content: self.pageData.feature_image_width},
        {vmid: 'og:image:height', property: 'og:image:height', content: self.pageData.feature_image_height},
        {vmid: 'article:tag', property: 'article:tag', content: self.pageData.primary_tag.name},
        {vmid: 'article:modified_time', property: 'article:modified_time', content: self.pageData.updated_at},
        {vmid: 'article:published_time', property: 'article:published_time', content: self.pageData.published_at},
        {vmid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image'},
        {vmid: 'twitter:title', name: 'twitter:title', content: self.pageData.twitter_title},
        {vmid: 'twitter:description', name: 'twitter:description', content: self.pageData.twitter_description},
        {vmid: 'twitter:url', name: 'twitter:url', content: self.pageData.url},
        {vmid: 'twitter:image', name: 'twitter:image', content: self.pageData.feature_image},
        {vmid: 'twitter:site', name: 'twitter:site', content: self.$store.getters.settings.twitter},
        {vmid: 'twitter:creator', name: 'twitter:creator', content: self.$store.getters.settings.twitter},
        {vmid: 'twitter:label1', name: 'twitter:label1', content: 'Written by'},
        {vmid: 'twitter:label2', name: 'twitter:label2', content: 'Filed under'},
        {vmid: 'twitter:data1', name: 'twitter:data1', content: self.pageData.primary_author.name},
        {vmid: 'twitter:data2', name: 'twitter:data2', content: self.pageData.primary_tag.name},
        {vmid: 'apple-mobile-web-app-title', name: 'apple-mobile-web-app-title', content: self.$store.getters.settings.meta_title}
      ]
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      const self = this
      if (self.$route.query.isPage) {
        getPageData(self.$route.params.page).then(response => {
          self.pageData = response.pages[0]
        })
      } else {
        getPostData(self.$route.params.page).then(response => {
          self.pageData = response.posts[0]
        })
      }
    }
  }
}
</script>
