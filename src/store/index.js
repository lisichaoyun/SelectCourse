/** @format */

import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex)
export default new vuex.Store({
  state: {
    userInfo: {
      realName: '',
      phone: '',
      Class: '',
      studyCode: '',
      courseName: [],
    },
  },
  mutations: {
    setRealName(state, value) {
      state.userInfo.realName = value
    },
    setPhone(state, value) {
      state.userInfo.phone = value
    },
    setClass(state, value) {
      state.userInfo.Class = value
    },
    setStudyCode(state, value) {
      state.userInfo.studyCode = value
    },
    setCourseName(state, value) {
      //传字符串
      state.userInfo.courseName =
        value.trim() == '' ? ['您没有选择任何课程'] : value.trim().split(' ')
    },
  },
  actions: {
    setUserInfo({ commit }, value) {
      commit('setRealName', value.RealName)
      commit('setPhone', value.Phone)
      commit('setClass', value.Class)
      commit('setStudyCode', value.StudyCode)
      commit('setCourseName', value.CourseName)
    },
  },
  getters: {
    //计算属性
  },
})
