<template>
  <a-menu
    :mode="mode"
    :theme="theme"
  >
    <a-menu-item v-for="(item, index) in menuList" :key="index">
      <router-link :to="item.url">{{ item.label }}</router-link>
    </a-menu-item>
  </a-menu>
</template>

<script>

import {Menu} from 'ant-design-vue'

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
  computed: {
    menuList() {
      return this.$store.getters.settings.navigation
    }
  }
}
</script>

<style scoped>

</style>
