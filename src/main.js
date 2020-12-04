import Vue from 'vue'
import App from './App.vue'
import store from './store'
import VueProgressBar from 'vue-progressbar'

import './plugins/element.js'

import 'common/stylus/index.styl'

Vue.use(VueProgressBar, {
  color: '#409eff',
  failedColor: '#f56c6c',
  // 进度条的高度
  thickness: '2px'
})

Vue.config.productionTip = false

export default new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
