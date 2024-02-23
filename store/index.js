import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import user from './user'
import sys from './sys'

Vue.use(Vuex)

export default new Vuex.Store({
  getters,
  modules: {
    user,
    sys
  }
})
