import App from './App'

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false

import divider from './components/common/divider.vue';
Vue.component('divider', divider);

import message from './lib/message.js';
Vue.prototype.$msg = message;

import http from './lib/http.js';
Vue.prototype.$http = http;

import store from 'store/index.js'
Vue.prototype.$store = store

import moment from 'moment'
Vue.prototype.moment = moment

import AsyncComputed from 'vue-async-computed'
Vue.use(AsyncComputed)

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