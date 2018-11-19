<template>
  <div class="container">
    <div class="msg">{{ msg }}</div>
    <div>计数结果: {{ count }}</div>
    <button class="msg"
            @click.stop="wxlogin()">登录</button>
    <button class="msg"
            open-type="getUserInfo"
            @getuserinfo="getUserInfo">获取权限</button>
    <!-- <image :src="UserInfo.avatarUrl"
           mode="aspectFill" /> -->
    <div>是否登录: {{ isLogin }}</div>
    <ul v-if="isLogin===true">
      <li>{{ UserInfo.nickName }}</li>
      <li>{{ UserInfo.province }} {{ UserInfo.city }} {{ UserInfo.gender }}</li>
    </ul>
    <!-- 获取formId -->
    <form @submit="formSubmit"
          report-submit="true">
      <button plain
              class="msg"
              form-type="submit"
              data-type="click">获取formId</button>
    </form>
    <button open-type="share">分享</button>
  </div>
</template>

<script>
import qs from 'qs'
// import globalStore from '../../stores/global-store.js'
export default {
  data () {
    return {
      msg: 'Hello world'
      // isLogin: this.$store.state.isLogin,
      // userInfo: this.$store.state.userInfo
    }
  },
  onLoad (opt) {
    // wx.showShareMenu({
    //   withShareTicket: true
    // })
    console.log('分享的id:' + opt.id)
    console.log('分享的id:' + this.$root.$mp.query.id)
    // if (this.$root.$mp.appOptions.shareTicket) {
    //   this.shareTicket = this.$root.$mp.appOptions.shareTicket
    //   console.log('通过携带 shareTicket 的分享卡片进入小程序')
    // }
  },
  // onShow (opt) {

  // },
  onShareAppMessage (res) {
    console.log('res:' + qs.stringify(res))
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log('页面内按钮转发' + res.target)
    } else {
      console.log('菜单转发' + res.target)
    }
    return {
      title: '测试分享',
      path: this.url + '?id=12',
      success: function (res) {
        // that.web_url = return_url
        // 转发成功
        wx.showToast({
          title: '转发成功',
          icon: 'success',
          duration: 2000
        })
        console.log('已成功获取到加密信息')
        // console.log('iv:' + res.shareTicket.iv)
        // console.log('encryptedData:' + res.shareTicket.encryptedData)
        // console.log('errmsg:' + res.shareTicket.errMsg)
        // 发送http请求
        // wx.getShareInfo({
        //   shareTicket: res.shareTickets[0],
        //   success: (res) => {
        //     console.log('已成功获取到加密信息')
        //     console.log('iv:' + res.shareTicket.iv)
        //     console.log('encryptedData:' + res.shareTicket.encryptedData)
        //     console.log('errmsg:' + res.shareTicket.errMsg)
        //   },
        //   fail: (res) => {
        //     console.log(res)
        //   }
        // })
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  methods: {
    formSubmit (e) {
      // 非真机运行时 formId 为 the formId is a mock one
      // let formId = e.detail.formId 小程序
      let formId = e.mp.detail.formId // mpvue
      console.log('formId:' + formId)
    },
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
    UserInfo () {
      let userInfoVar = this.$store.state.userInfo
      console.log('用户信息:' + qs.stringify(userInfoVar))
      return userInfoVar
    },
    isLogin () {
      return this.$store.state.isLogin
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