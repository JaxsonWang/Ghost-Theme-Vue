<template>
  <div class="app-wrapper">
    <div class="main-container">
      <app-main />
    </div>
  </div>
</template>

<script>
import {AppMain} from './components'

export default {
  name: 'Layout',
  components: {
    AppMain
  }
}
</script>

