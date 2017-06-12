// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import Browser from './js/browser'
import VueLazyload from 'vue-lazyload'
//import VueLazyload from 'vue-lazyload';
import VueAwesomeSwiper from 'vue-awesome-swiper'
import store from './store'


Vue.config.productionTip = false
//Vue.use(VueLazyload)


Vue.use(VueLazyload,{
	preLoad : 1.3,
	error: "./../static/error.png",
	loading: "http://cdn.uehtml.com/201402/1392662591495_1140x0.gif",
	attempt	:1,
	listenEvents: [ 'scroll' ]
})
Vue.use(VueAwesomeSwiper)
//Vue.use(VueLazyload,{
//preLoad: 1.3,
//error: 'http://a0.att.hudong.com/77/31/20300542906611142174319458811.jpg',
//loading: 'http://cdn.uehtml.com/201402/1392662591495_1140x0.gif',
//attempt: 1,
//listenEvents: [ 'scroll']
//});


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { 
  	App
  }
})
Vue.prototype.$axios = axios

//var browser = new Browser()