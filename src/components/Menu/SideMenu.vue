<template>
  <a-layout-sider
    v-model="collapsed"
    :class="['sider', isDesktop() ? null : 'shadow', theme, fixSiderbar ? 'ant-fixed-sidemenu' : null ]"
    width="256px"
    :collapsible="collapsible"
    :trigger="null"
  >
    <logo />
    <a-menu
      :collapsed="collapsed"
      :menu="menus"
      :theme="theme"
      :mode="mode"
      style="padding: 16px 0;"
      @select="onSelect"
    >
      <a-menu-item v-for="(item, index) in menuList" :key="index">
        <router-link :to="item.url">{{ item.label }}</router-link>
      </a-menu-item>
    </a-menu>
  </a-layout-sider>

</template>

<script>
import {Layout, Menu} from 'ant-design-vue'
import Logo from '@/components/tools/Logo'
import {mixin, mixinDevice} from '@/utils/mixin'

export default {
  name: 'SideMenu',
  components: {
    Logo,
    'a-layout-sider': Layout.Sider,
    'a-menu': Menu,
    'a-menu-item': Menu.Item
  },
  mixins: [mixin, mixinDevice],
  props: {
    mode: {
      type: String,
      required: false,
      default: 'inline'
    },
    theme: {
      type: String,
      required: false,
      default: 'dark'
    },
    collapsible: {
      type: Boolean,
      required: false,
      default: false
    },
    collapsed: {
      type: Boolean,
      required: false,
      default: false
    },
    menus: {
      type: Array,
      required: true
    }
  },
  computed: {
    menuList() {
      return this.$store.getters.settings.navigation
    }
  },
  methods: {
    onSelect(obj) {
      this.$emit('menuSelect', obj)
    }
  }
}
</script>
