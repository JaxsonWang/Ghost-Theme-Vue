<template>
  <div class="app-wrapper">
    <div class="container main-container">
      <a-row>
        <a-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
          <div class="site-header">
            <div class="site-header-title">
              <router-link to="/">淮城一只猫</router-link>
            </div>
            <div class="site-header-description">永远年轻，永远热泪盈眶！</div>
            <a-menu
              class="site-header-menu"
              theme="light"
            >
              <a-menu-item
                v-for="(item, index) in menuList"
                :key="index"
                :to="item.url"
                :subl="item.url"
                @click="onMenuClick"
              >
                {{ item.label }}
              </a-menu-item>
            </a-menu>
          </div>
        </a-col>
        <a-col :xs="24" :sm="24" :md="18" :lg="18" :xl="18">
          <app-main />
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
import {Row, Col, Menu} from 'ant-design-vue'
import {AppMain} from './components'
import {isTagLink} from '@/utils/validate'

export default {
  name: 'Layout',
  components: {
    AppMain,
    'a-row': Row,
    'a-col': Col,
    'a-menu': Menu,
    'a-menu-item': Menu.Item
  },
  data() {
    return {
    }
  },
  computed: {
    menuList() {
      return this.$store.getters.settings.navigation
    }
  },
  methods: {
    onMenuClick({item}) {
      if (isTagLink(item.$attrs.to)) {
        this.$router.push(item.$attrs.to)
      } else {
        this.$router.push({
          path: item.$attrs.to,
          query: {isPage: true}
        })
      }
    }
  }
}
</script>
<style lang="less" scoped>
.main-container {
  padding: 1rem 0;
  .site {
    &-header {
      position: relative;
      padding-top: 2rem;
      &-title {
        position: relative;
        padding-bottom: 1.5rem;
        margin-bottom: 1.5rem;
        a {
          font-size: 1.5rem;
        }
        &::after {
          position: absolute;
          right: 0;
          bottom: 0;
          left: 0;
          height: 1px;
          width: 50%;
          content: '';
          background-color: #c8c7cc;
          transform: scaleY(.5);
        }
      }
      &-description {
        position: relative;
        padding-bottom: 1.5rem;
        margin-bottom: 1.5rem;
        &::after {
          position: absolute;
          right: 0;
          bottom: 0;
          left: 0;
          height: 1px;
          width: 40%;
          content: '';
          background-color: #c8c7cc;
          transform: scaleY(.5);
        }
      }
      &-menu {
        border-right: none;
        .ant-menu-item-selected {
          background-color: initial;
          &::after {
            opacity: 0
          }
        }
      }
    }
  }
}
</style>
