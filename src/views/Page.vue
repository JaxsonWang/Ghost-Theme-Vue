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
  created() {
    this.getData()
  },
  methods: {
    getData() {
      if (this.$route.query.isPage) {
        getPageData(this.$route.params.page).then(response => {
          this.pageData = response
        })
      } else {
        getPostData(this.$route.params.page).then(response => {
          this.pageData = response
        })
      }
    }
  }
}
</script>
