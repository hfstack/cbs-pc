<template>
  <div class="topbar">
    <div class="content">
      <div class="lang fl">Englist</div>
      <div class="area fl">US$ USD</div>
      Wlecom to WIWIMAL!
      <div class="contact fr">Contact US</div>
      <div class="l-r fr" @click="login">Login | Register</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    login: function() {
      this.$router.push({
        name: 'login'
      })
    }
  }
};
</script>
<style lang="less">
.topbar{
  height: 40px;
  width: 100%;
  background-color: #333333;
  .content {
    margin: 0 auto;
    width: 1240px;
    text-align: center;
    color: #fff;
    line-height: 40px;
    font-size: 12px;
    .contact{
      margin-left: 30px;
    }
    .lang{
      margin-right: 30px;
    }
    .l-r{
      cursor: pointer;
    }
  }
}
</style>
