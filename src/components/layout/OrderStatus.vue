<template>
  <div class="global-order-status">
    <ul>
      <li class="cur">
        <i class="iconfont">&#xe624;</i>
        <p>SHOPPING CART</p>
      </li>
      <li :class="{'cur': activetwo}">
        <i class="iconfont">&#xe637;</i>
        <p>PLACE ORDER</p>
      </li>
      <li :class="{'cur': activethree}">
        <i class="iconfont">&#xe602;</i>
        <p>ORDER COMPLETE</p>
      </li>
    </ul>
    <div class="line"></div>
    <div :class="{'line-two': activetwo, 'line-three': activethree}"></div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    activetwo: {
      type: Boolean,
      default: false
    },
    activethree: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {},
  beforeDestory() {}
};
</script>
<style lang="less">
@import '~less/tool';
.global-order-status {
  width: 1240px;
  height: 155px;
  margin: 0 auto;
  position: relative;
  .clearfix();
  ul {
    display: block;
    position: absolute;
    left: 300px;
    top: 45px;
    z-index: 5;
    .wh(650, 90);
    .clearfix();
    li {
      float: left;
      width: 216px;
      text-align: center;
      i {
        display: inline-block;
        vertical-align: middle;
        border-radius: 50%;
        .wh(45, 45);
        line-height: 46px;
        background-color: #eee;
        color: #999;
        font-size: 22px;
      }
      &.cur {
        i {
          background-color: @orange;
          color: #fff;
          background:linear-gradient(0deg,rgba(249,108,23,1),rgba(254,165,111,1));
        }
      }
      p {
        height: 50px;
        line-height: 30px;
        font-weight: bold;
        letter-spacing: -.25px;
      }
    }
  }
  .line,
  .line-two,
  .line-three {
    width: 420px;
    height: 4px;
    background-color: #eee;
    position: absolute;
    left: 400px;
    top: 66px;
  }
  .line-two {
    width: 200px;
    background-color: @orange;
    z-index: 2;
  }
  .line-three {
    width: 420px;
    background-color: @orange;
    z-index: 3;
  }
}
</style>
