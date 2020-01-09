import Vue from 'vue'
import VueMeta from 'vue-meta'

import '@/styles/index.scss' // global css

import App from './App.vue'

import router from './router'
import store from './store'

import './registerServiceWorker'

import './initApp'

Vue.use(VueMeta, {
  keyName: 'metaInfo',
  tagIDKeyName: 'vmid',
  attribute: 'ghost',
  refreshOnceOnNavigation: true
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
