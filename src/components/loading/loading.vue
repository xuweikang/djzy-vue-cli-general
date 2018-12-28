<template>
  <div v-show="show">
    <div class="loading">
      <div class="subLoading fixStyle"></div>
      <div class="loadingTxt">{{text}}</div>
    </div>
    <div :class="{mask: mask}"></div>
  </div>
</template>

<script>
export default {
  name: "Loading",
  data() {
    return {
      text: '正在加载',
      show: false,
      mask: false
    }
  },
}
</script>

<style lang="less" scoped>
  .mask{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000001;
  }
.loading{
    width: 90px;
    height: 90px;
    opacity: 0.3;
    border-radius: 4px;
    background-color: #000000;
    position: fixed;
    left: 50%;
    top: 40%;
    margin: auto;
    margin-left: -0.9rem;
    z-index: 1000000;
    .subLoading{
        position: absolute;
        top: 22px;
        left: 32px;
        width: 26px;
        height: 26px;
        background-image: url('../../img/loading.png');
        background-size: 26px 26px;
        animation: doLoading 1s linear infinite;
    }
    @-webkit-keyframes doLoading {
        0% {
            -webkit-transform: rotate(0)
        }
        50% {
            -webkit-transform: rotate(180deg)
        }
        100% {
            -webkit-transform: rotate(360deg)
        }
    }
    @keyframes doLoading {
        0% {
            transform: rotate(0)
        }
        50% {
            transform: rotate(180deg)
        }
        100% {
            transform: rotate(360deg)
        }
    }
    .fixStyle{
        position: absolute;
    }
    .loadingTxt{
        width: 100%;
        height: 30px;
        font-size: 12px;
        text-align: center;
        color: #ffffff;
        position: absolute;
        left: 0;
        bottom: 0;
    }
}
</style>
