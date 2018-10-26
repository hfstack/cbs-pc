<template>
  <div class="point-modal" v-show="showPoint">
    <div class="info a-fadeinT">
      <p class="detail">Points Rules</p>
      <span class="close" @click="clickPointClose"><i class="iconfont">&#xe63f;</i></span>
      <p class="title">WaiWaiMall Points Rules</p>
      <ul>
        <li>
          <div class="fl">1.</div>
          <p>You can get the relevant points, after you paying the order. For example, if you place an order for $75.63, you can get 75 points. The value of the points will be accurate to unit digit, and the value after the decimal point is not included in the rounding.</p>
        </li>
        <li>
          <div class="fl">2.</div>
          <p>All Points will be automatically deposited into your account after you confirm receipt your order.</p>
        </li>
        <li>
          <div class="fl">3.</div>
          <p>The earned points can offset the corresponding amount, 100 points equals to U.S.$1, when paying the order.</p>
        </li>
        <li>
          <div class="fl">4.</div>
          <p>Wai Wai Mall reserves the right to cancel or change the program at any time.</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    showPoint: {
      type: Boolean,
      default: false
    }
  },
  created () {},
  mounted () {},
  methods: {
    clickPointClose () {
      this.$emit('update:showPoint', false);
    }
  }
};
</script>

<style lang="less">
@import "~less/tool.less";
.point-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 222;
  background-color: rgba(0, 0, 0, 0.5);
  .info{
    position: absolute;
    bottom: 0;
    width: 100%;
    background:rgba(246,247,246,1);
    height: 897/@rem;
    padding: 0 38/@rem;
    text-align: left;
    .detail{
      color: #020100;
      font-size: 30/@rem;
      font-weight: bold;
      padding: 20/@rem  0 20/@rem 0;
      text-align: center;
      border-bottom: 1px solid @gray3;
    }
    .title {
      .height(80);
      font-size: 28/@rem;
      font-weight: bold;
      margin: 10/@rem 0;
    }
    ul {
      display: block;
      li {
        .clearfix();
        font-size: 26/@rem;
        font-weight: bold;
        line-height: 40/@rem;
        margin-bottom: 35/@rem;
        .fl {
          width: 30/@rem;
        }
        p {
          margin-left: 30/@rem;
        }
      }
    }
    .close{
      position: absolute;
      right: 23/@rem;
      top: 23/@rem;
      i {
        color: #939399;
        font-size: 32/@rem;
      }
    }
  }
}
</style>

