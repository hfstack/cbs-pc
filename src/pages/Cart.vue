<template>
  <div class="cart-main-layout">
    <headers :isCart="true"></headers>
    <div class="cart-main">
      <div class="cart-empty" v-if="cartEmpty">
        <div class="img"></div>
        <p>Your shopping cart is currently empty</p>
        <router-link :to="{path: '/home'}" class="btn">SHOP NOW</router-link>
      </div>
      <div class="cart-have" v-else>
        <orderstatus></orderstatus>
        <div class="global-layout">
          <div class="fl left-layout">
            <div class="left-title">Shopping Cart<span> ( 4 Items )</span></div>
            <div class="left-box">
              <div class="left-top">
                .More $20 to get $10 off.
                <router-link :to="{path: '/'}">Explore more >></router-link>
              </div>
              <div class="left-content">
                <div class="goods">
                  <div class="img fl"><img src="https://g-search1.alicdn.com/img/bao/uploaded/i4/i2/1905882464/O1CN011U4YM0F0X2S73du_!!1905882464.jpg_.webp?x-oss-process=image/format,webp"></div>
                  <div class="info fl">
                    <div class="title">Women's T Shirt O Neck Short Sleeve Figure Pattern Casual Style Top Casual StyleCasual Style</div>
                    <div class="sku">
                      <span>Color : </span><span class="mr">White</span>
                      <span>Size : </span><span>M</span>
                    </div>
                    <div class="operator">
                      <i class="iconfont">&#xe63d;</i> Delete
                    </div>
                  </div>
                  <div class="price fl">
                    <div class="now-price">$150.00</div>
                    <div class="origin-price">$244.99</div>
                  </div>
                  <div class="qty fl">
                    <a href="javascript:;" class="reduce fl">
                      <i class="iconfont">&#xe62a;</i>
                    </a>
                    <div class="num fl">1</div>
                    <a href="javascript:;" class="add fl">
                      <i class="iconfont">&#xe66f;</i>
                    </a>
                  </div>
                  <div class="total-price red fl">$244.99</div>
                </div>
              </div>
            </div>
          </div>
          <div class="fr right-layout">
            <div class="right-title">Checkout</div>
            <div class="right-box">
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import orderstatus from 'components/layout/OrderStatus';
export default {
  name: 'cart',
  components: {
    orderstatus
  },
  data () {
    return {
      cartsData: [],
      isShowCoupon: false, // 显示优惠券
      couponId: '', // 优惠券ID
      isUsePoint: false, // 是否使用积分
      addSt: null, // 添加数据节流st
      reduceSt: null, // 减少数据节流st
      totalPrice: 0,
      confirmModal: {},
      cartEmpty: false,
      couponPrice: '$0' // 券价
    };
  },
  computed: {},
  mounted () {
    this.getCartData();
  },
  watch: {
    'isUsePoint': function (value) {
      // 积分的使用
      if (value) {
        this.totalPrice -= this.cartsData.integral / 100;
      } else {
        this.totalPrice += this.cartsData.integral / 100;
      }
    }
  },
  methods: {
    // 获取购物车数据
    getCartData () {
      this.request('Carts', {}).then((res) => {
        if (res.status === 200 && res.content) {
          this.cartsData = res.content;
          if (!localStorage.userToken) {
            // 认定是游客访问
            localStorage.setItem('userToken', res.content.token);
          }
          if (this.cartsData && this.cartsData.goods && this.cartsData.goods.length) {
            this.cartEmpty = false;
            this.computeTotalPrice();
          } else {
            this.cartEmpty = true;
          }
        } else {
          this.cartEmpty = true;
          // this.$router.push({name: 'sign'})
        }
      }, err => {
        // this.$Toast(err);
      });
    },
    // 计算总价格
    computeTotalPrice () {
      let goods = this.cartsData.goods;
      let len = goods.length;
      for (let i = 0; i < len; i++) {
        this.totalPrice += goods[i].num * goods[i].price;
      }
      this.totalPrice -= +this.cartsData.specialoffer;
      // 处理券价格
      // this.totalPrice = this.totalPrice - this.couponPrice.substring(1, this.couponPrice.length);
      this.totalPrice = this.totalPrice - this.couponPrice.replace(/[^0-9]/ig, '');
      if (this.totalPrice < 0) {
        this.totalPrice = 0;
      }
    },
    // 增加 - 登录后
    add (item) {
      let self = this;
      if (item.num >= item.stock) {
        return false;
      }
      item.num++;
      this.totalPrice = this.totalPrice + (+item.price);
      clearTimeout(self.addSt);
      // 函数节流
      self.addSt = setTimeout(function() {
        self.request('CartsAdd', {
          good_id: item.id,
          sku_id: item.sku_id,
          num: item.num
        }).then((res) => {
          if (res.status === 200) {
            this.$Toast('add success')
          } else {
            this.$Toast(res.msg)
          }
        }, err => {
          self.$Toast(err);
        });
      }, 1000);
    },
    // 减少 - 登录后
    reduce (item) {
      let self = this;
      if (item.num <= 0) {
        return;
      }
      // item.num--;
      // this.totalPrice = this.totalPrice - (+item.price);
      clearTimeout(self.reduceSt);
      if (item.num <= 1) {
        self.confirmModal = {
          show: true,
          title: 'Confirmed to delete?',
          onText: 'Yes',
          content: `Delete the product!`,
          action: function () {
            self.confirmModal.show = false;
            self.reduceSt = setTimeout(function() {
              self.request('CartsAdd', {
                good_id: item.id,
                sku_id: item.sku_id,
                num: item.num
              }).then((res) => {
                if (res.status === 200) {
                  self.cartsData.goods = res.content.goods;
                  item.num--;
                  self.totalPrice = self.totalPrice - (+item.price);
                }
              }, err => {
                self.$Toast(err);
              });
            }, 1000);
          }
        }
        return;
      }
      item.num--;
      self.totalPrice = self.totalPrice - (+item.price);
      // 函数节流
      self.reduceSt = setTimeout(function() {
        self.request('CartsAdd', {
          good_id: item.id,
          sku_id: item.sku_id,
          num: item.num
        }).then((res) => {
          if (res.status === 200) {}
        }, err => {
          self.$Toast(err);
        });
      }, 1000);
    },
    // 弹出券
    clickShowCoupon () {
      this.isShowCoupon = true;
    },
    // 点击购物券
    clickCoupon (item) {
      this.couponPrice = item.price + '';
      this.isShowCoupon = false;
      this.couponId = item.id;
      // 计算券
      this.totalPrice = this.totalPrice - this.couponPrice.replace(/[^0-9]/ig, '');
      if (this.totalPrice < 0) {
        this.totalPrice = 0;
      }
    },
    // 提交购物车
    submitCart () {
      // 判定是否有登录token
      if (!localStorage.userToken) {
        // 去登录页面
        this.$router.push({path: '/my/sign'});
        return;
      }
      this.request('OrdersCheckout', {
        type: 2,	// 是	Number	单订来源(1：PC端，2：H5，4：APP)
        coupon_id: this.couponId,	// 是	String或者null	优惠券id 没有则为空
        integral: this.isUsePoint,	// 是	Boolean	积分是否选择 ture或者false
        date: Date.parse(new Date())	// 否	string	用户本地时间
      }).then((res) => {
        if (res.status === 200 && res.content) {
          this.$router.push({path: '/cart/secure?orderId=' + res.content});
        } else if (res.status === 403 || res.status === 402) {
          this.$router.push({name: 'sign'})
        } else {
          this.$Toast(res.msg)
        }
      }, err => {
        this.$Toast(err);
      });
    }
  },
  beforeDestroy () {
    // this.$refs.indexMain.removeEventListener('scroll', this.dispatchScroll, false);
  }
};
</script>

<style lang="less">
@import '~less/tool.less';
.cart-main-layout {
  width: 100%;
  background-color: #fff;
}
.cart-main {
  width: 1240px;
  margin: 0 auto;
  padding-bottom: 200px;

  .cart-empty {
    text-align: center;
    .img {
      display: inline-block;
      margin-top: 100px;
      .wh(210, 114);
      background: url('~img/cart/cart_empty.png') no-repeat;
      background-size: 100% auto;
      margin-left: 50px;
      img {
        display: block;
      }
    }
    p {
      margin-top: 20px;
      .height(40);
      font-size: 20px;
      color: @gray2;
    }
    .btn {
      display: inline-block;
      .whl(320, 50);
      margin-top: 20px;
      margin-bottom: 400px;
      border: 1px solid @orange;
      border-radius: 10px;
      color: @orange;
    }
  }

  .left-title,
  .right-title {
    .height(20);
    font-size: 20px;
    margin-bottom: 12px;
    span {
      color: @gray;
      font-size: 16px;
    }
  }

  .goods {
    .wh(830, 150);
    border-bottom: 1px solid @bgray;
    margin-top: 30px;
    padding-bottom: 30px;
    font-size: 16px;
    &:last-child {
      border: none;
    }
    .clearfix();
    .img {
      .wh(120, 120);
      img {
        .wh(120, 120);
      }
      .status {

      }
    }
    .info {
      width: 280px;
      margin-left: 20px;
      margin-top: -5px;
      .title {
        line-height: 25px;
        .line2();
      }
      .sku {
        margin-top: 20px;
        color: @gray;
        .mr {
          margin-right: 38px;
        }
      }
      .operator {
        cursor: pointer;
        margin-top: 24px;
        color: @gray;
        i {
          vertical-align: top;
          font-size: 18px;
          font-weight: bold;
        }
      }
    }
    .price {
      width: 130px;
      margin: 40px 0 0 35px;
      line-height: 25px;
      font-size: 22px;
      .origin-price {
        color: @gray;
        text-decoration: line-through;
      }
    }
    .total-price {
      margin-top: 50px;
      font-size: 22px;
    }
    .qty {
      width: 96px;
      height: 26px;
      border: 1px solid #666;
      overflow: hidden;
      margin-top: 50px;
      margin-right: 50px;
      cursor: pointer;
      .reduce {
        border-right: 1px solid #666;
        i {
          font-size: 14px;
        }
        &.ban i {
          color: #c7c7c7;
        }
      }
      .add {
        border-left: 1px solid #666;
      }
      .reduce, .add {
        display: block;
        text-align: center;
        font-weight: bold;
        .whl(24, 24);
      }
      .num {
        .whl(45, 24);
        text-align: center;
      }
    }
  }
}
// 公用
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
        position: relative;
        color: @orange;
        a {
          position: absolute;
          top: 20px;
          right: 20px;
          .height(18);
          color: @gray;
        }
      }
      .left-content {
        padding: 0 20px;
      }
    }
  }
  .right-layout {
    width: 350px;
    .right-box {
      width: 350px;
      border-radius: 8px;
      border: 1px solid @bgray;
      box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.2);
    }
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
        .img {
          .wh(310, 88);
          background: url('~img/cart/1.png') no-repeat;
          background-size: 100% auto;
          margin-top: 10px;
          margin-bottom: 25px;
        }
      }
    }
  }
}
</style>
