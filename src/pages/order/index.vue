<template>
  <div class="container">
    <div class="msg">{{ msg }} ":" {{ msg2 }}</div>
    <div>计数结果: {{ count }}</div>
  </div>
</template>

<script>

import globalStore from '../../stores/global-store.js'

export default {
  data () {
    return {
      msg: 'test',
      msg2: 'name'
    }
  },
  computed: {
    count () {
      return globalStore.getters.stateGetter
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