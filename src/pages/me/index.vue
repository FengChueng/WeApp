<template>
  <div class="container">
    <div class="msg">{{ msg }}</div>
    <div>计数结果: {{ count }}</div>
    <button class="msg" @click.stop="wxlogin()">登录</button>
    <button class="msg" open-type="getUserInfo" @getuserinfo="getUserInfo">获取权限</button>
    <image :src="userInfo.avatarUrl" mode="aspectFill"/>
    <ul v-if="isLogin===true" >
      <li>{{userInfo.nickName}}</li>
      <li>{{userInfo.province}} {{userInfo.city}} {{userInfo.gender}}</li>
    </ul>
  </div>
</template>

<script>
import qs from 'qs'
// import globalStore from '../../stores/global-store.js'

export default {
  data () {
    return {
      msg: 'Hello world'
    }
  },
  methods: {
    getUserInfo (e) {
      // let self = this
      if (e.target.userInfo) {
        // 点击Button弹窗授权，如果授权了，执行login
        // 因为Login流程中有wx.getUserInfo，此时就可以获取到了
        // self.wxlogin(() => {
        //   // 登录成功后，返回
        //   // wx.navigateBack()
        //   console.log('登录成功')
        // })
        this.$store.commit('updateIsLogin', true)
        this.$store.commit('updateUser', e.mp.detail.userInfo)
        console.log(qs.stringify(e.mp.detail.userInfo))
      }
    },
    wxlogin (callback) {
      let self = this
      wx.login({
        success: function (res) {
          if (res.code) {
            let code = res.code
            console.log('code:' + code)
            self.userInfo(code, callback)
          } else {
            console.log('用户登录失败')
          }
        },
        fail: err => {
          wx.showToast({
            title: err
          })
        }
      })
    },
    userInfo (code, callback) {
      wx.getUserInfo({
        success (res) {
          console.log('usre-info:' + res.userInfo)
          console.log('iv:' + res.iv)
          console.log('encryptedData:' + res.encryptedData)
          callback && callback()
        }
      })
    }
  },
  computed: {
    count () {
      return this.$store.state.count
    },
    userInfo () {
      return this.$store.state.userInfo
    },
    isLogin () {
      return this.$store.isLogin
    }
  }
}
</script>

<style scoped>
.msg {
  color: red;
  padding: 15px;
  text-align: center;
}
</style>