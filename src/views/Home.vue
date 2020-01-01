<template>
  <div class="home">
    <router-link to="/about">about</router-link>
    <router-link to="/welcome/">welcome</router-link>
  </div>
</template>

<script>
import {getPosts} from '@/api/ghost-index'

export default {
  name: 'Home',
  async created() {
    console.log(await this.getData())
  },
  methods: {
    async getData() {
      return await getPosts()
    }
  }
}
</script>
