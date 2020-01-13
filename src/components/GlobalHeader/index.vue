<template>
  <transition name="showHeader">
    <div v-if="visible" class="header-animat">
      <a-layout-header
        v-if="visible"
        :class="[fixedHeader && 'ant-header-fixedHeader', sidebarOpened ? 'ant-header-side-opened' : 'ant-header-side-closed', ]"
        :style="{ padding: '0' }"
      >
        <div v-if="mode === 'sidemenu'" class="header">
          <a-icon v-if="device==='mobile'" class="trigger" :type="collapsed ? 'menu-fold' : 'menu-unfold'" @click="toggle" />
          <a-icon v-else class="trigger" :type="collapsed ? 'menu-unfold' : 'menu-fold'" @click="toggle" />
        </div>
        <div v-else :class="['top-nav-header-index', theme]">
          <div class="header-index-wide">
            <div class="header-index-left">
              <logo class="top-nav-header" :show-title="device !== 'mobile'" />
              <a-menu
                v-if="device !== 'mobile'"
                mode="horizontal"
                :theme="theme"
              >
                <a-menu-item v-for="(item, index) in menuList" :key="index">
                  <router-link :to="item.url">{{ item.label }}</router-link>
                </a-menu-item>
              </a-menu>
              <a-icon v-else class="trigger" :type="collapsed ? 'menu-fold' : 'menu-unfold'" @click="toggle" />
            </div>
          </div>
        </div>
      </a-layout-header>
    </div>
  </transition>
</template>

<script>
import {Layout, Icon, Menu} from 'ant-design-vue'
import Logo from '../tools/Logo'
import {mixin} from '@/utils/mixin'

export default {
  name: 'GlobalHeader',
  components: {
    Logo,
    'a-layout-header': Layout.Header,
    'a-icon': Icon,
    'a-menu': Menu,
    'a-menu-item': Menu.Item
  },
  mixins: [mixin],
  props: {
    mode: {
      type: String,
      // sidemenu, topmenu
      default: 'topmenu'
    },
    menus: {
      type: Array,
      required: true
    },
    theme: {
      type: String,
      required: false,
      default: 'dark'
    },
    collapsed: {
      type: Boolean,
      required: false,
      default: false
    },
    device: {
      type: String,
      required: false,
      default: 'desktop'
    }
  },
  data() {
    return {
      visible: true,
      oldScrollTop: 0
    }
  },
  computed: {
    menuList() {
      return this.$store.getters.settings.navigation
    }
  },
  mounted() {
    document.addEventListener('scroll', this.handleScroll, {passive: true})
  },
  beforeDestroy() {
    document.body.removeEventListener('scroll', this.handleScroll, true)
  },
  methods: {
    handleScroll() {
      if (!this.autoHideHeader) {
        return
      }

      const scrollTop = document.body.scrollTop + document.documentElement.scrollTop
      if (!this.ticking) {
        this.ticking = true
        requestAnimationFrame(() => {
          if (this.oldScrollTop > scrollTop) {
            this.visible = true
          } else if (scrollTop > 300 && this.visible) {
            this.visible = false
          } else if (scrollTop < 300 && !this.visible) {
            this.visible = true
          }
          this.oldScrollTop = scrollTop
          this.ticking = false
        })
      }
    },
    toggle() {
      this.$emit('toggle')
    }
  }
}
</script>

<style lang="less">
@import '../index.less';

.header-animat{
  position: relative;
  z-index: @ant-global-header-zindex;
}
.showHeader-enter-active {
  transition: all 0.25s ease;
}
.showHeader-leave-active {
  transition: all 0.5s ease;
}
.showHeader-enter, .showHeader-leave-to {
  opacity: 0;
}
</style>
