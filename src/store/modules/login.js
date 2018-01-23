import { login } from '../../api'
import * as types from '../mutation-types'
import config from '../../utils/config'

const merge = require('webpack-merge')

// initial data
const state = merge(config.login.state, {
  passwordType: 'password', // 登录页面输入框类型
  loginLoading: false, // 登录状态按钮loading
  isLogin: false // 是否已登录
})

const getters = {
  msg: state => state.msg,
  loginForm: state => state.loginForm,
  loginRules: state => state.loginRules,
  passwordType: state => state.passwordType,
  loginLoading: state => state.loginLoading,
  isLogin: state => state.isLogin
}

// mutations，同步数据，用于methods中commit调用
const mutations = {

  // 登录状态
  [types.POST_LOGIN] (state, payload) {
    state.isLogin = payload.data
  },

  // 正在登录
  [types.SHOW_LOAD] (state) {
    state.loginLoading = true
  },

  // 切换密码框类型
  [types.TOGGLE_TYPE] (state, payload) {
    state.passwordType = payload.value
  },
  // 登录完成
  [types.HIDE_LOAD] (state) {
    state.loginLoading = false
  }

}

// actions， 异步操作数据，用于this.$store.dispatch
const actions = {
  /**
   * 登录
   * new Promise((resolve, reject) => {})
   * data: payload.data
   */
  postLogin ({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      commit({type: types.SHOW_LOAD})
      login(payload.data)
        .then(
          res => {
            commit({type: types.HIDE_LOAD})
            commit({type: types.POST_LOGIN, data: res.data})
            resolve(res)
          }
        )
        .catch(
          err => {
            commit({type: types.HIDE_LOAD})
            console.log('fail', err)
            reject(err)
          }
        )
    })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
