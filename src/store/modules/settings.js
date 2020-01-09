import {getSettings} from '@/api/ghost/settings'

const state = {
  settings: {}
}

const mutations = {
  SET_SETTINGS: (state, settings) => {
    state.settings = settings
  }
}

const actions = {
  getSetting({commit, state}) {
    return new Promise((resolve, reject) => {
      getSettings().then(response => {
        const data = response.settings
        commit('SET_SETTINGS', data)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
