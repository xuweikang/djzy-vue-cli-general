<template>
  <div class="debug">
    <h1>大家中医，用大家，成大家，为大家 </h1>
    <h2>vue初始化完成</h2>
  </div>
</template>
<script>

export default {
  name: "debug",
  components: {

  },
  data(){
    return {

    }
  },
  watch: {

  },
  created() {
    console.error(this.$route.matched)
  },
}
</script>

<style lang="less" scoped>
h1,h2{
  text-align: center;
}
</style>
