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
        :style="{ paddingTop: fixedHeader ? '64px' : '0' }"
      >
        <transition name="page-transition">
          <app-main />
        </transition>
      </a-layout-content>
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
/*
 * The following styles are auto-applied to elements with
 * transition="page-transition" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the page transition by editing
 * these styles.
 */

.page-transition-enter {
  opacity: 0;
}

.page-transition-leave-active {
  opacity: 0;
}

.page-transition-enter .page-transition-container,
.page-transition-leave-active .page-transition-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
