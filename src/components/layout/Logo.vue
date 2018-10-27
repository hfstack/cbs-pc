<template>
  <div class="logo-container">
    <div class="logo"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {

  }
};
</script>
<style lang="less">
@import '~less/tool';
.logo-container{
  .logo {
    .wh(150, 74);
    background: url('~assets/logo.png') no-repeat;
  }
}
</style>
