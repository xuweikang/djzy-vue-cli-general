<template>
  <div class="mask" v-if="show"></div>
</template>

<script>
export default {
  name: "maskComponent",
  data(){
    return {
      show: false,
    }
  }
}
</script>

<style lang="less" scoped>
.mask{
  position:fixed;
  top:0;
  bottom:0;
  left:0;
  right:0;
  z-index:100;
  background-color:#666;
  opacity: 0.4;
}
</style>
