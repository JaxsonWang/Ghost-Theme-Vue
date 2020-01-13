<template>
  <a-locale-provider :locale="locale">
    <div id="app">
      <router-view />
    </div>
  </a-locale-provider>
</template>

<script>
import {LocaleProvider} from 'ant-design-vue'
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import {AppDeviceEnquire} from '@/utils/mixin'

export default {
  name: 'App',
  components: {
    'a-locale-provider': LocaleProvider
  },
  mixins: [AppDeviceEnquire],
  data() {
    return {
      locale: zhCN
    }
  }
}
</script>
