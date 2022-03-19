/** @format */

import Vue from 'vue'
import VueRouter from 'vue-router'
import HelloComing from '../Pages/HelloComing'
import Register from '../Pages/Register'
import Home from '../Pages/Home'
import Login from '../Pages/Login'
//解决罕见错误,有两个地方可以触发跳转事件导致跳转时报错问题
const originalPush = VueRouter.prototype.push
const originalReplace = VueRouter.prototype.replace
// push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}
// replace
VueRouter.prototype.replace = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalReplace.call(this, location, onResolve, onReject)
  return originalReplace.call(this, location).catch(err => err)
}

Vue.use(VueRouter)
export default new VueRouter({
  routes: [
    {
      path: '/helloComing',
      name: 'HelloComing',
      component: HelloComing,
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
    },
    {
      path: '/',
      name: 'Login',
      component: Login,
    },
  ],
})
