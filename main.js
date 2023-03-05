import App from './App'

import store from "store/store.js"


// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false

// 引入uView组件库
import uView from 'uview-ui';
Vue.use(uView);

Vue.prototype.$bus = new Vue()

//引入分享
import {share} from './mixins/index.js'
Vue.mixin(share)

App.mpType = 'app'
const app = new Vue({
    ...App,
	store
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif