/** @format */

//基本引用
import Vue from 'vue'
import App from './App'
import router from './router'
//axios
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
//引用element
import el_install from './ElementUi/index'
el_install()
import * as el_css from './ElementUi/css'//导入所有样式到命名空间

//Vuex
import store from './store'

Vue.config.productionTip = false
//实例化
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
})
