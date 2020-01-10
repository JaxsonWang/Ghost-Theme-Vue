<template>
  <div class="home">
    <a-list item-layout="vertical" size="large" :data-source="postList">
      <a-list-item slot="renderItem" key="item.title" slot-scope="item">
        <img
          v-if="!loading"
          slot="extra"
          width="272"
          alt="logo"
          :src="item.feature_image"
        >
        <a-skeleton :loading="loading" active avatar>
          <a-list-item-meta :description="item.custom_excerpt">
            <a slot="title" :href="`/${item.slug}/`">{{ item.title }}</a>
            <a-avatar slot="avatar" :src="item.primary_author.profile_image" />
          </a-list-item-meta>
          {{ item.content }}
        </a-skeleton>
      </a-list-item>
    </a-list>
    <a-pagination
      v-if="!loading"
      :current="pagination.page"
      :total="pagination.total"
      :default-page-size="pagination.limit"
      :page-size.sync="pagination.limit"
      @change="onPageChange"
    />
  </div>
</template>

<script>
import {List, Skeleton, Avatar, Pagination} from 'ant-design-vue'
import {getTagsPostsList} from '@/api/ghost/post'

export default {
  name: 'Home',
  components: {
    'a-avatar': Avatar,
    'a-list': List,
    'a-list-item': List.Item,
    'a-list-item-meta': List.Item.Meta,
    'a-skeleton': Skeleton,
    'a-pagination': Pagination
  },
  data() {
    return {
      loading: true,
      postList: [],
      pagination: {},
      feature_image: {
        width: 0,
        height: 0
      }
    }
  },
  watch: {
    '$store.getters.settings.cover_image': {
      handler(value) {
        const self = this
        const image = new Image()
        image.src = value
        self.feature_image.width = image.width
        self.feature_image.height = image.height
      },
      immediate: true,
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
        {vmid: 'og:type', property: 'og:type', content: 'website'},
        {vmid: 'og:title', property: 'og:title', content: self.$store.getters.settings.meta_title},
        {vmid: 'og:description', property: 'og:description', content: self.$store.getters.settings.meta_description},
        {vmid: 'og:url', property: 'og:url', content: self.$store.getters.settings.url},
        {vmid: 'og:image', property: 'og:image', content: self.$store.getters.settings.og_image},
        {vmid: 'og:image:width', property: 'og:image:width', content: self.feature_image.width},
        {vmid: 'og:image:height', property: 'og:image:height', content: self.feature_image.height},
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
    this.getData(1)
  },
  mounted() {
  },
  methods: {
    getData(page) {
      const self = this
      self.loading = true
      getTagsPostsList(page, self.$route.params.tag).then(response => {
        self.postList = response.posts
        self.pagination = response.meta.pagination
        self.loading = false
      })
    },
    onPageChange(page, pageSize) {
      this.getData(page)
    }
  }
}
</script>
