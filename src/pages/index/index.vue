<template>
  <div class="container" @click="clickHandle">
    <div class="message">{{msg}}</div>
    <clickCounterVue />
  </div>
</template>

<script>
import clickCounterVue from '@/components/clickcounter'

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
</style>