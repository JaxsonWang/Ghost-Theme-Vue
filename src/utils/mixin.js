// import Vue from 'vue'
import {deviceEnquire, DEVICE_TYPE} from '@/utils/device'
import {mapState} from 'vuex'

// const mixinsComputed = Vue.config.optionMergeStrategies.computed
// const mixinsMethods = Vue.config.optionMergeStrategies.methods

const mixin = {
  computed: {
    ...mapState({
      navTheme: state => state.navigation.theme,
      sidebarOpened: state => state.navigation.sidebar
    })
  }
}

const mixinDevice = {
  computed: {
    ...mapState({
      device: state => state.navigation.device
    })
  },
  methods: {
    isMobile() {
      return this.device === DEVICE_TYPE.MOBILE
    },
    isDesktop() {
      return this.device === DEVICE_TYPE.DESKTOP
    },
    isTablet() {
      return this.device === DEVICE_TYPE.TABLET
    }
  }
}

const AppDeviceEnquire = {
  mounted() {
    const {$store} = this
    deviceEnquire(deviceType => {
      switch (deviceType) {
        case DEVICE_TYPE.DESKTOP:
          $store.commit('TOGGLE_DEVICE', 'desktop')
          $store.dispatch('setSidebar', false)
          break
        case DEVICE_TYPE.TABLET:
          $store.commit('TOGGLE_DEVICE', 'tablet')
          $store.dispatch('setSidebar', false)
          break
        case DEVICE_TYPE.MOBILE:
        default:
          $store.commit('TOGGLE_DEVICE', 'mobile')
          $store.dispatch('setSidebar', false)
          break
      }
    })
  }
}

export {mixin, AppDeviceEnquire, mixinDevice}
