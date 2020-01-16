import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'

import navigation from './modules/navigation'
import settings from './modules/settings'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    navigation,
    settings
  },
  getters
})
