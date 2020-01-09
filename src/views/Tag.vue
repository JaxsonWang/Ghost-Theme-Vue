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
      pagination: {}
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
