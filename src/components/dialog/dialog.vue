<template>
  <div v-if="show" class="pluginDialogComponent">
    <div class="dialog">
      <div class="title" :style="titleStyle">{{title}}</div>
      <div class="content" v-html="content"></div>
      <div class="alertBtn">
        <div v-if="cancelText" class="button" @click="cancel" :style="cancelStyle" :class="{borderRightNone: borderRightNone}">{{cancelText}}</div>
        <div v-if="confirmText" class="button" @click="confirm" :style="confirmStyle" :class="{borderRightNone: borderRightNone}">{{confirmText}}</div>
        <div class="clear"></div>
      </div>
    </div>
    <div class="mask"></div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        title: '',
        content: '',
        show: false,
        cancelText: '',
        confirmText: '',
        titleStyle: {},
        cancelStyle: {},
        confirmStyle: {},
      };
    },
    computed: {
      borderRightNone(){
        return !this.cancelText || !this.confirmText
      }
    },
    methods: {
      cancel(){
        this.cancelCallback()
      },
      confirm(){
        this.confirmCallback()
      },
    }
  };
</script>

<style lang="less">
  .pluginDialogComponent{
    .dialog {
      font-family: PingFangSC-Regular;
      color:#333;
      border-radius: 0.16rem;
      background-color: #fff;
      width:85%;
      margin:auto;
      position: fixed;
      top: 30%;
      left: 0;
      right: 0;
      z-index: 2000;
      .title{
        border-top-left-radius: 0.16rem;
        border-top-right-radius: 0.16rem;
        box-sizing: border-box;
        font-size:0.36rem;
        padding:0.38rem;
        text-align: center;
      }
      .content{
        font-family: PingFangSC-Light;
        padding:0.38rem;
        padding-top:0.3rem;
        padding-bottom:0.3rem;
        font-size:0.32rem;
        border-top: 0.5px solid #e2e2e2;
        border-bottom:0.5px solid #e2e2e2;
        div{
          margin-bottom:0.1rem;
          &:last-child{
            margin-top:0.15rem;
          }
        }
      }
      .alertBtn{
        background-color: #fcfcfc;
        font-size: 0.32rem;
        border-bottom-left-radius: 0.16rem;
        border-bottom-right-radius: 0.16rem;
        position: relative;
        text-align: center;
        .button{
          font-size:0.32rem;
          text-align: center;
          padding:0.29rem;
          text-align: center;
          width:49.0%;
          display: inline-block;
          background: #fcfcfc;
          letter-spacing: 0;
          outline: none;
          border: #fcfcfc;
          display: inline-block;
          box-sizing: border-box;
          border-bottom-right-radius: 0.16rem;
          &:first-child{
            border-bottom-left-radius: 0.16rem;
            border-bottom-right-radius: 0;
            border-right:1px solid #eee;
          }
          &:active{
            opacity: 0.4;
          }
        }
      }
      .clear{
        clear: both;
      }
      .borderRightNone{
        border-right: none!important;
      }
    }
    .mask{
      position:fixed;
      top:0;
      bottom:0;
      left:0;
      right:0;
      z-index:1000;
      background-color:#666;
      opacity: 0.4;
    }
  }
</style>
