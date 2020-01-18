<template>
  <div class="logo">
    <router-link to="/">
      <svg-icon icon-class="logo" />
      <h1 v-if="showTitle">{{ title }}</h1>
    </router-link>
  </div>
</template>

<script>
import theme from '@/theme.config'
export default {
  name: 'Logo',
  components: {
  },
  props: {
    title: {
      type: String,
      default: theme.blogTitle,
      required: false
    },
    showTitle: {
      type: Boolean,
      default: true,
      required: false
    }
  }
}
</script>
