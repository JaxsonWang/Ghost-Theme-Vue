import Vue from 'vue'
import {
  SIDEBAR_TYPE,
  DEFAULT_THEME
} from '@/store/mutation-types'

const navigation = {
  state: {
    sidebar: false,
    device: 'desktop',
    theme: ''
  },
  mutations: {
    SET_SIDEBAR_TYPE: (state, type) => {
      state.sidebar = type
      Vue.ls.set(SIDEBAR_TYPE, type)
    },
    CLOSE_SIDEBAR: (state) => {
      Vue.ls.set(SIDEBAR_TYPE, true)
      state.sidebar = false
    },
    TOGGLE_DEVICE: (state, device) => {
      state.device = device
    },
    TOGGLE_THEME: (state, theme) => {
      // setStore('_DEFAULT_THEME', theme)
      Vue.ls.set(DEFAULT_THEME, theme)
      state.theme = theme
    }
  },
  actions: {
    setSidebar({commit}, type) {
      commit('SET_SIDEBAR_TYPE', type)
    },
    CloseSidebar({commit}) {
      commit('CLOSE_SIDEBAR')
    },
    ToggleDevice({commit}, device) {
      commit('TOGGLE_DEVICE', device)
    },
    ToggleTheme({commit}, theme) {
      commit('TOGGLE_THEME', theme)
    }
  }
}

export default navigation
