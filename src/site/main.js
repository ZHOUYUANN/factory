import Vue from 'vue';
import App from './App.vue';
import store from '../store'
import VueProgressBar from 'vue-progressbar'

import '../plugins/element.js'

import 'common/stylus/index.styl'

Vue.config.productionTip = false;

Vue.use(VueProgressBar, {
  color: '#409eff',
  failedColor: '#f56c6c',
  // 进度条的高度
  thickness: '2px'
})

const app = new Vue({
  store,
  render: h => h(App),
}).$mount('#app');

if (window.self !== window.parent) {
  window.parent.postMessage({ 
    readyState: document.readyState 
  }, '*');
}

window.addEventListener('message', e => {
  const { components } = e.data;
  const [appVM] = app.$children;
  if (components) appVM.components = components;
});
