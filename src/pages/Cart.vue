<template>
  <div class="cart-main-layout">
    <headers :isCart="true"></headers>
    <div class="cart-main">
      <div class="cart-empty" v-if="cartEmpty">
        <div class="img"></div>
        <p>Your shopping cart is currently empty</p>
        <router-link :to="{path: '/index'}" class="btn">SHOP NOW</router-link>
      </div>
      <div class="cart-have" v-else>
        <orderstatus></orderstatus>
        <div class="global-layout">
          <!-- 左边内容 -->
          <div class="fl left-layout">
            <div class="left-title">SHOPPING CART<span> ( {{cartsData.goods && cartsData.goods.length || 0}} Items )</span></div>
            <div class="left-box">
              <router-link :to="{path: '/activity?activity_id=' + cartsData.promotion_id}" class="left-top" v-if="cartsData.promotion_id">
                {{cartsData.promotion_msg}}
                <span>Explore more >></span>
              </router-link>
              <div class="left-top black" v-else>Products</div>
              <div class="left-content">
                <div class="goods" v-for="(item, index) in cartsData.goods" :key="index">
                  <div class="img fl">
                    <router-link :to="{path: '/detail?id=' + item.id}">
                      <img :src="item.img && item.img.ossimg()">
                    </router-link>
                  </div>
                  <div class="info fl">
                    <div class="title">{{item.name}}</div>
                    <div class="sku">
                      <template v-for="(prop, key, index) in item.props">
                        <span>{{key}} : </span><span class="mr">{{prop}}</span>
                      </template>
                    </div>
                    <div class="operator" @click="removeGoods(item)">
                      <i class="iconfont">&#xe63d;</i> Delete
                    </div>
                  </div>
                  <div class="price fl">
                    <div class="now-price">${{item.price}}</div>
                    <div class="origin-price">${{item.origin_price}}</div>
                  </div>
                  <div class="qty fl">
                    <a href="javascript:;" class="reduce fl" @click="reduce(item)">
                      <i class="iconfont">&#xe62a;</i>
                    </a>
                    <div class="num fl">{{item.num}}</div>
                    <a href="javascript:;" class="add fl" @click="add(item)">
                      <i class="iconfont">&#xe66f;</i>
                    </a>
                  </div>
                  <div class="total-price red fl">${{item.num * (item.price * 100) / 100}}</div>
                </div>
              </div>
            </div>
          </div>
          <!-- 右边内容 -->
          <div class="fl right-layout">
            <div class="right-title">CHECKOUT</div>
            <div class="right-box">
              <div class="right-top">Order Summary</div>
              <div class="right-content">
                <ul>
                  <li>
                    <div class="label">Product Total</div>
                    <div class="price">${{returnFloat(productTotal)}}</div>
                  </li>
                  <li>
                    <div class="label">Estimated Shipping</div>
                    <div class="price">{{+shippingMoney > 0 ? ('$' + returnFloat(shippingMoney)) : 'Free'}}</div>
                  </li>
                  <li v-if="cartsData.promotion_msg">
                    <div class="label">{{cartsData.promotion_msg}}</div>
                    <div class="price red">-${{returnFloat(cartsData.specialoffer)}}</div>
                  </li>
                  <li>
                    <div class="label">
                      Points <span>( Available: {{cartsData.integral}} )</span>
                      <dswitch :status.sync="isUsePoint" :on-change="changePoints" class="disi"></dswitch>
                    </div>
                    <div class="price red">-${{ isUsePoint ? cartsData.integral * 100 / 10000 : '0.00'}}</div>
                  </li>
                  <li class="li-h">
                    <div class="clearfix">
                      <div class="label" @click="clickShowCoupon">
                        Code/Coupon <span>( {{cartsData.coupon && cartsData.coupon.length || 'no'}} coupon <i class="iconfont icon" v-if="couponList.length || (cartsData.coupon && cartsData.coupon.length)">&#xe611;</i> )</span>
                      </div>
                      <div class="price red">-${{couponPrice}}</div>
                    </div>
                    <!-- 券 -->
                    <div class="coupon-info a-fadeinT" v-show="!isShowCoupon && (couponList.length || (cartsData.coupon && cartsData.coupon.length))">
                      <div class="c-search">
                        <input type="text" v-model="redeemCode" class="s-input" placeholder="Enter Promo Code"/>
                        <div class="search-btn" @click="getCouponApply">Applay</div>
                      </div>
                      <div class="apply-info" :class="applySuccess ? 'green' : 'red'">{{applyInfo}}</div>
                      <!-- 优惠券状态个人中心 1-可用 2-未开始 3-已过期未使用 4-已使用  商品详情页 优惠券状态 1-可领取 2-已领取 3-已领完-->
                      <div v-for="(item,index) in (couponList.length && couponList || cartsData.coupon)" :key="index" class="coupon-item" @click="clickCoupon(item)">
                        <div class="coupon-radio fl">
                          <input type="radio" name="coupon" v-if="couponId === item.id" checked>
                          <input type="radio" name="coupon" v-else>
                        </div>
                        <div class="img fl">
                          <p class="price red">${{item.price}}</p>
                          <p class="des">For a purchase over ${{item.use_price}}</p>
                          <p class="time">{{item.startdate}} - {{item.enddate}}</p>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
                <div class="total-price">
                  <div class="label">Total</div>
                  <div class="price red">${{totalPrice}}</div>
                </div>
                <div class="submit-button" @click="submitCart">CHECKOUT</div>
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
    <confirm :show.sync="confirmModal.show" :title="confirmModal.title"  :content="confirmModal.content" :on-ok="confirmModal.action"  okText="Yes"></confirm>
  </div>
</template>

<script>
import orderstatus from 'components/layout/OrderStatus';
import dswitch from 'components/basic/Switch';
import confirm from 'components/layout/ConfirmModal';
export default {
  name: 'cart',
  components: {
    orderstatus,
    dswitch,
    confirm
  },
  data () {
    return {
      cartsData: [],
      couponList: [], // 搜索出的couponlist
      redeemCode: '', // 券码
      applyLocked: false, // 券锁
      applySuccess: false, // 券查询成功
      applyInfo: '', // apply 信息
      isShowCoupon: false, // 显示优惠券
      couponId: '', // 优惠券ID
      isUsePoint: false, // 是否使用积分
      addSt: null, // 添加数据节流st
      reduceSt: null, // 减少数据节流st
      productTotal: 0, // 商品总价
      totalPrice: 0, // 减积分和券的总价
      confirmModal: {},
      cartEmpty: false,
      couponPrice: 0, // 券价
      shippingMoney: 0 // 邮费 > $19美元包邮
    };
  },
  computed: {},
  mounted () {
    this.getCartData();
  },
  watch: {},
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
        }
      }, err => {
        this.$Messagebox({
          title: err || 'system error',
          type: 'error'
        });
      });
    },
    // 计算总价格
    computeTotalPrice () {
      // 初始化价格
      this.productTotal = 0;
      this.totalPrice = 0;
      let goods = this.cartsData.goods;
      let len = goods.length;
      for (let i = 0; i < len; i++) {
        this.productTotal += goods[i].num * (goods[i].price * 100);
      }
      // 浮点数处理
      this.productTotal = this.productTotal / 100;
      // 计算后的
      this.totalPrice = this.productTotal;
      // 活动
      this.totalPrice =  (this.totalPrice * 100 - +this.cartsData.specialoffer * 100) / 100;

      // 处理券价格
      this.totalPrice = (this.totalPrice * 100 - +((this.couponPrice + '').replace(/[^0-9]/ig, '')) * 100) / 100;
      // 邮费计算
      if (this.totalPrice >= 19) {
        this.shippingMoney = 0;
      } else {
        this.shippingMoney = 10;
      }
      // 运费
      this.totalPrice = (this.totalPrice * 100 + +this.shippingMoney * 100) / 100; //加运费
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
      this.productTotal = (this.productTotal * 100 + +item.price * 100) / 100;
      this.totalPrice = (this.totalPrice * 100 + +item.price * 100) / 100;
      clearTimeout(self.addSt);
      // 函数节流
      self.addSt = setTimeout(function() {
        self.request('CartsAdd', {
          good_id: item.id,
          sku_id: item.sku_id,
          num: item.num
        }).then((res) => {
          if (res.status === 200) {
            localStorage.setItem('userToken',res.content.token || '')
            // 成功
          } else {
            self.$Messagebox({
              title: res.msg,
              type: 'error'
            });
          }
        }, err => {
          self.$Messagebox({
            title: err || 'system error',
            type: 'error'
          });
        });
      }, 1000);
    },
    // 减少 - 登录后
    reduce (item) {
      let self = this;
      if (item.num <= 0) {
        return;
      }
      clearTimeout(self.reduceSt);
      item.num--;
      self.productTotal = (this.productTotal * 100 - +item.price * 100) / 100;
      self.totalPrice = (this.totalPrice * 100 - +item.price * 100) / 100;
      // 函数节流
      self.reduceSt = setTimeout(function() {
        self.request('CartsAdd', {
          good_id: item.id,
          sku_id: item.sku_id,
          num: item.num
        }).then((res) => {
          if (res.status === 200) {}
        }, err => {
          self.$Messagebox({
            title: err || 'system error',
            type: 'error'
          });
        });
      }, 1000);
    },
    // 删除
    removeGoods (item) {
      let self = this;
      self.confirmModal = {
        show: true,
        title: 'Confirmed to delete?',
        onText: 'Yes',
        content: `Delete the product!`,
        // desc: '',
        action: function () {
          self.confirmModal.show = false;
          self.reduceSt = setTimeout(function() {
            self.request('CartsAdd', {
              good_id: item.id,
              sku_id: item.sku_id,
              num: 0
            }).then((res) => {
              if (res.status === 200) {
                self.cartsData = res.content;
                self.productTotal = (self.productTotal * 100 - +item.price * 100) / 100;
                self.totalPrice = (self.totalPrice * 100 - +item.price * 100) / 100;
              }
            }, err => {
              self.$Messagebox({
                title: err || 'system error',
                type: 'error'
              });
            });
          }, 1000);
        }
      }
    },
    // 弹出券
    clickShowCoupon () {
      this.isShowCoupon = !this.isShowCoupon;
    },
    // 点击购物券
    clickCoupon (item) {
      this.couponPrice = item.price;
      this.couponId = item.id;
      // 计算券
      this.computeTotalPrice();
    },
    // 搜索券
    getCouponApply() {
      if (this.applyLocked) {
        return;
      }
      this.applyLocked = true;
      this.request('CouponsApply', {
        redeemCode: this.redeemCode
      }).then((res) => {
        if (res.status === 200 && res.content) {
          this.couponList = res.content.coupons || [];
          // apply coupon success 信息通知
          this.applySuccess = true;
          this.applyInfo = 'Apply coupon successfully';
        } else {
          this.couponList = [];
          this.applySuccess = false;
          this.applyInfo = 'Apply coupon failure';
          this.$Messagebox({
            title: 'Wrong promo code',
            type: 'error'
          });
        }
        this.applyLocked = false;
      }, err => {
        this.applyLocked = false;
        this.$Toast(err);
        this.$Messagebox({
          title: err || 'system error',
          type: 'error'
        });
      })
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
        type: 1,	// 是	Number	单订来源(1：PC端，2：H5，4：APP)
        coupon_id: this.couponId,	// 是	String或者null	优惠券id 没有则为空
        integral: this.isUsePoint,	// 是	Boolean	积分是否选择 ture或者false
        date: Date.parse(new Date())	// 否	string	用户本地时间
      }).then((res) => {
        if (res.status === 200 && res.content) {
          this.$router.push({path: '/cart/secure?orderId=' + res.content});
        } else if (res.status === 403 || res.status === 402) {
          this.$router.push({name: 'sign'})
        } else {
          this.$Messagebox({
            title: res.msg || 'system error',
            type: 'error'
          });
        }
      }, err => {
        this.$Messagebox({
          title: err || 'system error',
          type: 'error'
        });
      });
    },
    // 改变points
    changePoints (status) {
      if (status) {
        this.totalPrice = (this.totalPrice * 100 - this.cartsData.integral) / 100;
        this.isUsePoint = true;
      } else {
        this.totalPrice = (this.totalPrice * 100 + this.cartsData.integral) / 100;
        this.isUsePoint = false;
      }
    },
    // 自动补0
    returnFloat (value) {
      value = Math.round(parseFloat(value) * 100) / 100;
      let xsd = value.toString().split('.');
      if (xsd.length === 1) {
        value = value.toString() + '.00';
        return value;
      }
      if (xsd.length > 1 ) {
        if (xsd[1].length < 2) {
          value = value.toString() + '0';
        }
        return value;
      }
    }
  },
  beforeDestroy () {}
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
        word-break: break-all;
        min-height: 44px;
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

  .coupon-info {
    width: 310px;
    background-color: #F7F9FA;
    padding: 10px;
    .c-search {
      position: relative;;
      .wh(290, 40);
      background-color: #fff;
      input {
        .whl(200, 40);
        padding: 10px;
        border: 0;
      }
      .search-btn {
        position: absolute;
        right: 0;
        top: 0;
        .whl(88, 40);
        color: @gray;
        background-color: #E4E4E4;
        text-align: center;
      }

    }
    .apply-info {
      &.green {
        color: #019532;
      }
      &.red {
        color: #ff473c;
      }
    }
    .coupon-item {
      width: 310px;
      height: 52px;
      margin-top: 10px;
      .coupon-radio {
        input {
          width: 20px;
          height: 20px;
          margin: 16px 4px 0 0;
        }
      }
      .img {
        position: relative;
        width: 286px;
        height: 52px;
        background: url('~img/cart/coupon_bg.png') no-repeat;
        .price {
          position: absolute;
          font-size: 18px;
          left: 0px;
          top: 10px;
          text-align: center;
          width: 70px;
        }
        .des {
          font-size: 12px;
          margin-left: 80px;
          .height(30);
        }
        .time {
          font-size: 12px;
          margin-left: 80px;
          .height(15);
          color: @gray;
          .line1();
          width: 185px;
        }
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
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
      .left-top {
        display: block;
        padding: 0 20px;
        font-size: 16px;
        .height(60);
        background-color: #F3F3F3;
        position: relative;
        color: @orange;
        &.black {
          color: #222;
        }
        span {
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
    margin-left: 20px;
    border: none;
    .right-box {
      width: 350px;
      border-radius: 8px;
      border: 1px solid @bgray;
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
    }
    .right-top {
      padding: 0 20px;
      font-size: 16px;
      .height(59);
      // background-color: #F3F3F3;
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
            .wh(230, 32);
            .line1();

            .disi {
              display: inline-block;
              top: 5px;
              margin-left: 5px;;
            }
            .icon {
              vertical-align: top;
              margin-top: 2px;
              display: inline-block;
            }
          }
          .price {
            float: right;
          }
          span {
            color: @gray;
          }
          .clearfix();
        }
        .li-h {
          height: auto;
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
