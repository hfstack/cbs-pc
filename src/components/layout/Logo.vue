<template>
  <div class="logo-container">
    <div class="logo" @click="goHome"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    goHome: function() {
      this.$router.push({
        name: 'home'
      })
    }
  }
};
</script>
<style lang="less">
@import '~less/tool';
.logo-container{
  .logo {
     cursor: pointer;
    .wh(150, 74);
    background: url('~assets/logo.png') no-repeat;
  }
}
</style>
