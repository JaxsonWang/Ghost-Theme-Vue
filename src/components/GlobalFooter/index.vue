<template>
  <transition name="showFooter">
    <a-layout-footer class="site-footer">
      <p>
        Powered by <a href="https://ghost.org/" rel="noopener nofollow" target="_blank">Ghost</a>. Copyright © 2020. Crafted with 淮城一只猫.
      </p>
      <p>
        <a href="http://beian.miit.gov.cn/" rel="noopener nofollow" target="_blank">苏ICP备15050739号-4</a> - <a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=32010402000196" rel="noopener nofollow" target="_blank">苏公网安备32010402000196号</a> - <a href="https://tongji.baidu.com/web/10921506/overview/index?siteId=11569818" rel="noopener nofollow" target="_blank">百度统计</a>
      </p>
    </a-layout-footer>
  </transition>
</template>

<script>
import {Layout} from 'ant-design-vue'
export default {
  name: 'GlobalFooter',
  components: {
    'a-layout-footer': Layout.Footer
  }
}
</script>

<style lang="less">
.site-footer {
  text-align: center;
  margin: 1rem 0;
  p {
    margin: 0;
  }
}

.showFooter-enter-active {
  transition: all 0.25s ease;
}
.showFooter-leave-active {
  transition: all 0.5s ease;
}
.showFooter-enter, .showFooter-leave-to {
  opacity: 0;
}
</style>
