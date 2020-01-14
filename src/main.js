import Vue from 'vue'
import VueMeta from 'vue-meta'
import VueStorage from 'vue-ls'

import '@/styles/index.less' // global css
import '@/components/global.less'

import App from '@/App.vue'
import router from '@/router'
import store from '@/store'

import config from '@/defaultSettings'

import bootstrap from '@/core/bootstrap'

import '@/initApp'
import '@/icons'
import '@/registerServiceWorker'

Vue.use(VueMeta, {
  keyName: 'metaInfo',
  tagIDKeyName: 'vmid',
  attribute: 'ghost',
  refreshOnceOnNavigation: true
})

Vue.use(VueStorage, config.storageOptions)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  created: bootstrap,
  render: h => h(App)
}).$mount('#app')
