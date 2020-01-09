<template>
  <div class="home">
    <router-link to="/about/">about</router-link>
    <router-link to="/welcome/">welcome</router-link>
  </div>
</template>

<script>
import {getPostsList} from '@/api/ghost/post'

export default {
  name: 'Home',
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
        {vmid: 'apple-mobile-web-app-title', name: 'apple-mobile-web-app-title', content: self.$store.getters.settings.meta_title}
      ]
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      getPostsList().then(response => {
        console.log(response)
      })
    }
  }
}
</script>
