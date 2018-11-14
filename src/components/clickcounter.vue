<template>
  <div class="clickcounter">
    <div class="counter-num">次数：{{num}}</div>
    <button class="counter-btn" @click="handlerClick">点击</button>
    <button class="counter-reset" @click="resetClick">清零</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      num: 0
    }
  },
  methods: {
    handlerClick () {
      this.num += 1
    },
    resetClick () {
      this.num = 0
    }
  }
}
</script>

<style>
.click-counter {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid red;
  background-color: aqua;
  padding: 10px;
}

.counter-num,
.counter-btn,
.counter-reset {
  flex: 1;
  margin: 3px;
}


</style>

