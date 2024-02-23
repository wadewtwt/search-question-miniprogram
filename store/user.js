
import apis from "$apis/index.js";
let errRequestTime = 0
export default {
  namespaced: true,
  state: {
    isLogin: wx.getStorageSync('isLogin') || false,
    isCertified: wx.getStorageSync('isCertified') || false,
    baseInfo: wx.getStorageSync('baseInfo') || {
      avatar: ""
    },
    details: wx.getStorageSync('details') || {},
    token: wx.getStorageSync('token') || ''
  },
  mutations: {
    isLogin(state, flag) {
      wx.setStorageSync('isLogin', flag)
      state.isLogin = flag
    },
    isCertified(state, flag) {
      wx.setStorageSync('isCertified', flag)
      state.isCertified = flag
    },
    baseInfo(state, info) {
      wx.setStorageSync('isLogin', true)
      wx.setStorageSync('baseInfo', info)
      state.isLogin = true
      state.baseInfo = info
    },
    details(state, info) {

      // wx.setStorageSync('isCertified', true)
      wx.setStorageSync('details', info)
      // state.isCertified = true
      state.details = info
      if (info.real_name) {
        wx.setStorageSync('isCertified', true)
        state.isCertified = true
      }
    },
    token(state, payload) {
      wx.setStorageSync('token', payload)
      state.token = payload
    }
  },
  actions: {
    personalCenter({ commit, dispatch }, info) {
      return apis.personalCenter().then(baseInfo => {
        commit('baseInfo', baseInfo.data)
        return apis.personalInfo().then(details => {
          commit('details', details.data)
        })
      })
    },
    refreshPersonalCenter({ commit }) {
      apis.personalCenter().then(baseInfo => {
        commit('baseInfo', baseInfo.data)
        apis.personalInfo().then(details => {
          commit('details', details.data)
        })
      })
    }
  },
  getters: {
    isLogin: state => state.isLogin,
    isCertified: state => state.isCertified,
    baseInfo: state => state.baseInfo,
    details: state => state.details
  }
}