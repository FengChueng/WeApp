<template>
  <div class="container" >
    <div class="message" @click="clickHandle">{{msg}}</div>
    <clickCounterVue />
    <button type="button" @click="add">add num</button>
    <button type="button" @click="reset">reset</button>
    <a href="/pages/order/main" class="navlink">进入计数器页面</a>
  </div>
</template>

<script>
import clickCounterVue from '@/components/clickcounter'
import globalStore from '../../stores/global-store.js'

export default {
  data () {
    return {
      msg: 'Hello'
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