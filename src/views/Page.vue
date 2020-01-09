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
      pageData: {}
    }
  },
  metaInfo() {
    const self = this
    return {
      title: self.$store.getters.settings.meta_title,
      meta: [
        {vmid: 'description', name: 'description', content: self.$store.getters.settings.description},
        {vmid: 'og:site_name', property: 'og:site_name', content: self.$store.getters.settings.title},
        {vmid: 'og:type', property: 'og:type', content: 'website'},
        {vmid: 'og:title', property: 'og:title', content: self.$store.getters.settings.meta_title},
        {vmid: 'og:description', property: 'og:description', content: self.$store.getters.settings.meta_description},
        {vmid: 'og:url', property: 'og:url', content: self.$store.getters.settings.url},
        {vmid: 'og:image', property: 'og:image', content: self.$store.getters.settings.og_image},
        {vmid: 'og:image:width', property: 'og:image:width', content: '4032'},
        {vmid: 'og:image:height', property: 'og:image:height', content: '3024'},
        {vmid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image'},
        {vmid: 'twitter:title', name: 'twitter:title', content: self.$store.getters.settings.twitter_title},
        {vmid: 'twitter:description', name: 'twitter:description', content: self.$store.getters.settings.twitter_description},
        {vmid: 'twitter:url', name: 'twitter:url', content: self.$store.getters.settings.url},
        {vmid: 'twitter:image', name: 'twitter:image', content: self.$store.getters.settings.twitter_image},
        {vmid: 'twitter:site', name: 'twitter:site', content: self.$store.getters.settings.twitter},
        {vmid: 'twitter:site', name: 'twitter:site', content: self.$store.getters.settings.twitter},
        {vmid: 'twitter:label1', name: 'twitter:label1', content: 'Written by'},
        {vmid: 'twitter:label2', name: 'twitter:label2', content: 'Filed under'},
        {vmid: 'twitter:data1', name: 'twitter:data1', content: self.pageData},
        {vmid: 'twitter:data2', name: 'twitter:data2', content: self.pageData},
        {vmid: 'apple-mobile-web-app-title', name: 'apple-mobile-web-app-title', content: self.$store.getters.settings.meta_title}
      ]
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      if (this.$route.query.isPage) {
        getPageData(this.$route.params.page).then(response => {
          this.pageData = response.pages[0]
        })
      } else {
        getPostData(this.$route.params.page).then(response => {
          this.pageData = response.posts[0]
        })
      }
    }
  }
}
</script>
