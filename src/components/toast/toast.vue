<template>
  <div class="toast" v-show="show" :class="position">
    {{msg}}
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      msg: "",
      time: 100,
      position: "middle",
    };
  },
};
</script>

<style lang="less" scoped>
.toast {
  position: fixed;
  // top: 50%;
  left: 50%;
  transform: translateX(-50%);
  padding: 2vw;
  max-width: 60vw;
  font-size: 4vw;
  color: #fff;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 0.1rem;
  line-height: 1.2;
  z-index: 9999;

}

.top{
    top:15%;
}
.middle{
    top:50%;
}
.bottom{
    bottom:15%;
}

.fade-enter-active,
.fade-leave-active {
  transition: 0.3s ease-out;
}
.fade-enter {
  opacity: 0;
  transform: scale(1.2);
}
.fade-leave-to {
  opacity: 0;
  transform: scale(0.8);
}
</style>
