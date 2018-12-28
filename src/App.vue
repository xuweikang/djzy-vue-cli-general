<template>
  <div id="app" v-cloak>
    <router-view class="fade"></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  watch: {
    $route(to, from) {
      this.$dialog().hide()
    }
  },
}
</script>


<style lang="less" scoped>

.fade{
    animation: fade-in;
    animation: fade-in;
    animation-duration: 0.5s;
    -webkit-animation: fade-in 0.5s;
}
@keyframes fade-in {
    0% {opacity: 0;}/*初始状态 透明度为0*/
    40% {opacity: 0.4;}
    60% {opacity: 0.6;}
    80% {opacity: 0.8;}
    100% {opacity: 1;}/*结束状态 透明度为1*/
}
@-webkit-keyframes fade-in {/*针对webkit内核*/
    0% {opacity: 0;}
    40% {opacity: 0.4;}
    60% {opacity: 0.6;}
    80% {opacity: 0.8;}
    100% {opacity: 1;}
}

body {
  margin: 0;
}
@media screen and (min-width: 480px) {
  html {
    font-size: 60px;
  }
}

@media screen and (min-width: 375px) and (max-width: 479px) {
  html {
    font-size: 50px;
  }
}
@media screen and (max-width: 374px) {
  html {
    font-size: 40px;
  }
}

[v-cloak] {
  display: none;
}

#app {
}
image[lazy=loading] {
  width: 100%;
  height: auto;
  margin: auto;
}
</style>

