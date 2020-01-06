import Vue from 'vue'

import '@/styles/index.less' // global css

import App from './App.vue'

import router from './router'
import store from './store'

import './registerServiceWorker'

import './initApp'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
