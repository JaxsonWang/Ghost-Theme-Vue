import router from './router'
import store from './store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import getPageTitle from '@/utils/get-page-title'

// 进度条配置
NProgress.configure({
  showSpinner: false
})

router.beforeEach(async(to, from, next) => {
  // 开始进度条
  NProgress.start()

  // 设置网页标题
  document.title = getPageTitle(to.meta.title)

  // 缓存 接口 数据
  if (Object.keys(store.getters.settings).length === 0) {
    await store.dispatch('settings/getSetting')
  }

  next()

  NProgress.done()
})

router.afterEach(() => {
  // 结束进度条
  NProgress.done()
})
