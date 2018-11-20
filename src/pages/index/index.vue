<template>
  <div class="container">
    <div class="message"
         @click="clickHandle">{{msg}}</div>
    <clickCounterVue />

    <div class="mesage"> {{ newcounter }} </div>
    <button type="button"
            @click="add">add num</button>
    <button type="button"
            @click="reset">reset</button>
    <a href="/pages/order/main"
       class="navlink">进入计数器页面</a>
    <div>openid: {{ openid }}</div>
  </div>
</template>

<script>
import clickCounterVue from '@/components/clickcounter'
import globalStore from '../../stores/global-store.js'

export default {
  data () {
    return {
      msg: 'Hello',
      openid: ''
    }
  },

  components: { clickCounterVue },
  methods: {
    clickHandle () {
      this.msg = 'Clicked!!!!!!'
    },
    add () {
      globalStore.commit('add', {
        num: 10
      })
    },
    reset () {
      globalStore.commit('reset')
    }
  },
  computed: {
    newcounter () {
      return this.$store.state.count
    }
  },
  // 小程序生命周期
  onLoad (opt) {
    this.openid = opt.id
    var scene = decodeURIComponent(opt.scene)
    console.log('scene:' + scene)
  },
  onUnload () {
    // 解决同一页面不同参数进入后页面缓存问题
    // mpvue踩坑
    Object.assign(this.$data, this.$options.data())
  }
}
</script>

<style scoped>
.message {
  color: red;
  padding: 15px;
  text-align: center;
}
.navlink {
  text-decoration: underline;
}
</style>