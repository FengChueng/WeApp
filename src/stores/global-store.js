import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0,
    isLogin: false,
    userInfo: {
      avatarUrl: '',
      city: '',
      gender: '',
      nickName: '',
      province: ''
    }
  },
  mutations: {
    add (state, payload) {
      state.count += payload.num
    },
    reset (state) {
      state.count = 0
    },
    updateIsLogin: (state, change) => {
      state.isLogin = change
    },
    updateUser: (state, change) => {
      change.gender = change.gender === 1 ? '男' : '女'
      state.userInfo = change
    }
  },
  plugins: [
    createPersistedState({
      storage: {
        getItem: key => wx.getStorageSync(key),
        setItem: (key, value) => wx.setStorageSync(key, value),
        removeItem: key => ''
      }
    })
  ]
})
