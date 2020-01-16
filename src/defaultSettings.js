/**
 * 项目默认配置项
 * navTheme - sidebar theme ['dark', 'light'] 两种主题
 *
 * storageOptions: {} - Vue-ls 插件配置项 (localStorage/sessionStorage)
 *
 */

export default {
  navTheme: 'light', // theme for nav menu
  production: process.env.NODE_ENV === 'production' && process.env.VUE_APP_PREVIEW !== 'true',
  // vue-ls options
  storageOptions: {
    namespace: 'pro__', // key prefix
    name: 'ls', // name variable Vue.[ls] or this.[$ls],
    storage: 'local' // storage name session, local, memory
  }
}
