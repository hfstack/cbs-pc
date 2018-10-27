<template>
  <div class="global-layout">
    <div class="fl left-layout">
      <div class="left-box">
        <div class="left-top">123</div>
        <div class="left-content">
          <!-- <ul class="cart-list">
            <li></li>
          </ul> -->
        </div>
      </div>
    </div>
    <div class="fr right-layout">
      <div class="right-top">Order Summary</div>
      <div class="right-content">
        <ul>
          <li>
            <div class="label">Product Total</div>
            <div class="price">$654.98</div>
          </li>
          <li>
            <div class="label">Estimated Shipping</div>
            <div class="price">$0.00</div>
          </li>
          <li>
            <div class="label">Buy 3 get 15% off</div>
            <div class="price red">-$7.98</div>
          </li>
          <li>
            <div class="label">Points <span>(Available: 657)</span><span></span></div>
            <div class="price red">-$0.00</div>
          </li>
          <li>
            <div class="label">Code/Coupon <span>( no coupon)</span></div>
            <div class="price red">$654.98</div>
          </li>
        </ul>
        <div class="total-price">
          <div class="label">Total</div>
          <div class="price red">$256.00</div>
        </div>
        <div class="submit-button">CHECKOUT</div>
        <div class="we-accept">
          <div class="title">we accept</div>
          <div class="img"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
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
.global-layout {
  width: 1240px;
  margin: 0 auto;
  .clearfix();
  .left-layout {
    width: 870px;
    .left-box {
      width: 870px;
      border-radius: 8px;
      border: 1px solid @bgray;
      box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.2);
      .left-top {
        padding: 0 20px;
        font-size: 16px;
        .height(60);
        background-color: #F3F3F3;
      }
      .left-content {
        padding: 0 20px;
      }
    }
  }
  .right-layout {
    width: 350px;
    border-radius: 8px;
    border: 1px solid @bgray;
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.2);
    .right-top {
      padding: 0 20px;
      font-size: 16px;
      .height(59);
      background-color: #F3F3F3;
      border-bottom: 1px solid @bgray;
    }
    .right-content {
      ul {
        display: block;
        padding: 12px 20px;
        border-bottom: 1px solid @bgray;
        li {
          .height(32);
          .label {
            float: left;
          }
          .price {
            float: right;
          }
          span {
            color: @gray;
          }
          .clearfix();
        }
      }
      .total-price {
        padding: 0 20px;
        .height(68);
        .clearfix();
        .label {
          float: left;
          font-size: 16px;
        }
        .price {
          float: right;
          font-size: 22px;
        }
      }
      .submit-button {
        margin-left: 10px;
        .whl(330, 50);
        background: @orange;
        border-radius: 8px;
        text-align: center;
        color: #fff;
        font-weight: bold;
        font-size: 18px;
        margin-bottom: 30px;
      }
      .we-accept {
        padding: 0 20px;
        .title {
          font-size: 16px;
          .height(16);
          margin-bottom: 10px;
        }
      }
    }
  }
}
</style>
