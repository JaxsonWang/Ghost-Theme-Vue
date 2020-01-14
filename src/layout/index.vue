<template>
  <a-layout :class="['layout', device]">
    <!-- SideMenu -->
    <a-drawer
      v-if="isMobile()"
      placement="left"
      :wrap-class-name="`drawer-sider ${navTheme}`"
      :closable="false"
      :visible="collapsed"
      @close="drawerClose"
    >
      <side-menu
        :theme="navTheme"
        :collapsed="false"
        :collapsible="true"
      />
    </a-drawer>

    <a-layout
      :class="[layoutMode, `content-width-${contentWidth}`]"
      :style="{paddingLeft: contentPaddingLeft}"
    >
      <global-header
        :mode="layoutMode"
        :theme="navTheme"
        :collapsed="collapsed"
        :device="device"
        @toggle="toggle"
      />
      <!-- layout content -->
      <a-layout-content
        :style="{ height: '100%', margin: '24px 24px 0', paddingTop: fixedHeader ? '64px' : '0' }"
      >
        <transition name="page-transition">
          <app-main />
        </transition>
      </a-layout-content>
      <a-layout-content />
      <a-layout-header />
      <a-layout-footer />
    </a-layout>
  </a-layout>
</template>

<script>
import {mapActions} from 'vuex'
import {Layout, Drawer} from 'ant-design-vue'
import {mixin, mixinDevice} from '@/utils/mixin'
import GlobalHeader from '@/components/GlobalHeader'
import SideMenu from '@/components/Menu/SideMenu'
import {AppMain} from '@/layout/components'

import {triggerWindowResizeEvent} from '@/utils/util'

export default {
  name: 'Layout',
  components: {
    'a-layout': Layout,
    'a-drawer': Drawer,
    'a-layout-header': Layout.Header,
    'a-layout-content': Layout.Content,
    'a-layout-footer': Layout.Footer,
    GlobalHeader,
    AppMain,
    SideMenu
  },
  mixins: [mixin, mixinDevice],
  data() {
    return {
      collapsed: false
    }
  },
  computed: {
  },
  mounted() {
    this.$store.commit('TOGGLE_THEME', 'light')
    console.log(this.navTheme)
  },
  methods: {
    ...mapActions(['setSidebar']),
    contentPaddingLeft() {
      if (!this.fixSidebar || this.isMobile()) {
        return '0'
      }
      if (this.sidebarOpened) {
        return '256px'
      }
      return '80px'
    },
    toggle() {
      this.collapsed = !this.collapsed
      this.setSidebar(!this.collapsed)
      triggerWindowResizeEvent()
    },
    drawerClose() {
      this.collapsed = false
    }
  }
}
</script>
<style lang="less" scoped>
</style>
