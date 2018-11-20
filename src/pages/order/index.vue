<template>
  <div class="container">
    <div class="msg">{{ msg }} ":" {{ msg2 }}</div>
    <div>计数结果: {{ count }}</div>
    <div>openid: {{ openid }}</div>
    <button @click.stop="gotoHome()">回到首页</button>
    <navigator url="/pages/index/main"
               open-type="switchTab"
               class="msg">去往首页</navigator>
  </div>
</template>

<script>

import globalStore from '../../stores/global-store.js'

export default {
  data () {
    return {
      msg: 'test',
      msg2: 'name',
      openid: ''
    }
  },
  methods: {
    gotoHome () {
      const url = '/pages/index/main'
      // wx.navigateTo({ url })
      wx.switchTab({ url })
    }
  },
  computed: {
    count () {
      return globalStore.getters.stateGetter
    }
  },
  // 小程序生命周期
  onLoad (opt) {
    this.openid = opt.id
  },
  onUnload () {
    // 解决同一页面不同参数进入后页面缓存问题
    // mpvue踩坑
    Object.assign(this.$data, this.$options.data())
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