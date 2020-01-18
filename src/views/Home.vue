<template>
  <div class="site-home site-main-post">
    <a-skeleton
      :loading="loading"
      active
      :paragraph="{
        rows: 15
      }"
      class="site-main-skeleton"
    >
      <main class="site-post-list">
        <a-row type="flex" class="site-post-row">
          <a-col
            v-for="item in postList"
            :key="item.id"
            :xs="24"
            :sm="24"
            :md="24"
            :lg="12"
            :xl="12"
            :xxl="12"
            class="site-post-col"
          >
            <article class="site-post-article">
              <div class="article-image">
                <router-link :to="`/${item.slug}/`">
                  <img :src="item.feature_image" :alt="item.title">
                </router-link>
              </div>
              <div class="article-title">
                <router-link :to="`/${item.slug}/`">{{ item.title }}</router-link>
              </div>
              <div class="article-excerpt">
                <p>{{ item.custom_excerpt }}</p>
              </div>
              <div class="article-meta">
                <a-row type="flex" justify="space-between">
                  <a-col class="meta-authors">
                    <router-link
                      v-for="itemAuthor in item.authors"
                      :key="itemAuthor.id"
                      :class="['author-item', itemAuthor.id, itemAuthor.slug]"
                      to="#"
                    >
                      <a-tooltip>
                        <template slot="title">
                          {{ itemAuthor.name }}
                        </template>
                        <a-avatar :src="itemAuthor.profile_image" />
                      </a-tooltip>
                    </router-link>
                  </a-col>
                  <a-col class="meta-date">
                    {{ formatTime(new Date(item.published_at), '{y}年{m}月{d}日') }}
                  </a-col>
                </a-row>
              </div>
            </article>
          </a-col>
        </a-row>
      </main>
    </a-skeleton>
    <div v-if="!loading" class="site-post-pagination">
      <a-pagination
        :current="pagination.page"
        :total="pagination.total"
        :default-page-size="pagination.limit"
        :page-size.sync="pagination.limit"
        @change="onPageChange"
      />
    </div>
  </div>
</template>

<script>
import {Row, Col, Pagination, Tooltip, Avatar, Skeleton} from 'ant-design-vue'
import {getPostsList} from '@/api/ghost/post'
import {formatTime} from '@/utils/util'

export default {
  name: 'Home',
  components: {
    'a-pagination': Pagination,
    'a-row': Row,
    'a-col': Col,
    'a-tooltip': Tooltip,
    'a-avatar': Avatar,
    'a-skeleton': Skeleton
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
  methods: {
    formatTime,
    getData(page) {
      const self = this
      self.loading = true
      getPostsList(page).then(response => {
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
<style lang="less" scoped>
.site-main-post {
  background-color: #fff;
  .site-post-list {
    padding-top: 3rem;
    .site-post-article {
      margin: 0 15% 2.75rem;
      .article-image {
        overflow: hidden;
        transition: transform 250ms ease-in-out;
        &:hover {
          transform: scale(0.95);
          transition: transform 200ms ease-in-out 0ms;
        }
        img {
          width: 100%;
          transition: transform 250ms ease-in-out;
          &:hover {
            transform: scale(1.25);
            transition: transform 200ms ease-in-out 0ms;
          }
        }
      }
      .article-title {
        font-size: 1.25rem;
        a {
          color: #000;
        }
      }
      .article-excerpt {
        p {
          font-size: 1rem;
        }
      }
      .article-meta {
        .meta-date {
          display: flex;
          align-items: center;
        }
      }
    }
  }
  .site-post-pagination {
    text-align: center;
    padding-bottom: 1rem;
  }
  .site-main-skeleton {
    &.ant-skeleton-active {
      padding: 3rem;
    }
  }
}
</style>
