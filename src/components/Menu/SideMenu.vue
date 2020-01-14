<template>
  <a-layout-sider
    :collapsed="false"
    :collapsible="true"
    :trigger="null"
    :class="['sider', isDesktop() ? null : 'shadow', theme, fixSiderbar ? 'ant-fixed-sidemenu' : null ]"
    width="256px"
  >
    <logo />
    <s-menu mode="inline" :theme="theme" />
  </a-layout-sider>

</template>

<script>
import {Layout} from 'ant-design-vue'
import SMenu from '@/components/Menu'
import Logo from '@/components/tools/Logo'
import {mixin, mixinDevice} from '@/utils/mixin'

export default {
  name: 'SideMenu',
  components: {
    Logo,
    SMenu,
    'a-layout-sider': Layout.Sider
  },
  mixins: [mixin, mixinDevice],
  props: {
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
    }
  },
  computed: {
    menuList() {
      return this.$store.getters.settings.navigation
    }
  },
  methods: {
  }
}
</script>
