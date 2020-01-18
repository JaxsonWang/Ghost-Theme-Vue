<template>
  <a-menu
    v-model="selectedKeys"
    :mode="mode"
    :theme="theme"
    @select="selectMenu"
  >
    <a-menu-item v-for="item in menuList" :key="item.url">
      <router-link :to="urlJudge(item.url)">{{ item.label }}</router-link>
    </a-menu-item>
  </a-menu>
</template>

<script>

import {Menu} from 'ant-design-vue'
import {mapActions} from 'vuex'
import {isTagLink} from '@/utils/validate'

export default {
  name: 'Menu',
  components: {
    'a-menu': Menu,
    'a-menu-item': Menu.Item
  },
  props: {
    mode: {
      type: String,
      required: false,
      default: 'inline'
    },
    theme: {
      type: String,
      required: false,
      default: 'dark'
    }
  },
  data() {
    return {
      selectedKeys: []
    }
  },
  computed: {
    menuList() {
      return this.$store.getters.settings.navigation
    }
  },
  watch: {
    $route: function(value) {
      let hasNav = false
      const nav = this.$store.getters.settings.navigation
      for (let i = 0; i < nav.length; i++) {
        if (nav[i].url === value.path) {
          hasNav = true
          break
        }
      }
      // hasNav = false 清空 this.selectedKeys
      if (!hasNav) {
        this.selectedKeys = []
        this.CloseSidebar()
      }
    }
  },
  created() {
    this.selectedKeys = [this.$route.path]
  },
  methods: {
    ...mapActions(['CloseSidebar']),
    selectMenu(item) {
      this.$emit('select', item)
    },
    urlJudge(url) {
      return isTagLink(url) ? url : `${url}?isPage=true`
    }
  }
}
</script>

<style scoped>

</style>
