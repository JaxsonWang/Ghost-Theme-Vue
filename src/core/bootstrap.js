import Vue from 'vue'
import store from '@/store/'
import {
  DEFAULT_THEME,
  SIDEBAR_TYPE
} from '@/store/mutation-types'
import config from '@/defaultSettings'

export default function Initializer() {
  store.commit('SET_SIDEBAR_TYPE', Vue.ls.get(SIDEBAR_TYPE, false))
  store.commit('TOGGLE_THEME', Vue.ls.get(DEFAULT_THEME, config.navTheme))

  // last step
}
