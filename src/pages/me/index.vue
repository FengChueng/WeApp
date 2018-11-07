<template>
  <div class="container">
    <div class="msg">{{msg}}</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Hello world'
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