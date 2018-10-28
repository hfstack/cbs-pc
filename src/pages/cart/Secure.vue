<template>
  <div class="secure-main-layout">
    <headers></headers>
    <div class="secure-main">
      <orderstatus :activetwo="true"></orderstatus>
      <div class="global-layout">
        <div class="fl left-layout">
          <div class="left-box">
            <div class="left-top">Shipping Address</div>
            <div class="left-content">
              <!-- <div class="table">
                <div class="label">* First Name</div>
                <input type="text">
              </div> -->
              <!-- 没有地址信息 或者 第一次进入 -->
              <div class="shipping-table">
                <div class="two clearfix">
                  <div class="table-item mr fl">
                    <div class="label">* First Name</div>
                    <div class="input">
                      <input type="text">
                    </div>
                  </div>
                  <div class="table-item fl">
                    <div class="label">* First Name</div>
                    <div class="input">
                      <input type="text">
                    </div>
                  </div>
                  <div class="table-item mr fl">
                    <div class="label">* First Name</div>
                    <div class="input">
                      <input type="text">
                    </div>
                  </div>
                  <div class="table-item fl">
                    <div class="label">* First Name</div>
                    <div class="input">
                      <input type="text">
                    </div>
                  </div>
                  <div class="table-item mr fl">
                    <div class="label">* First Name</div>
                    <div class="input">
                      <input type="text">
                    </div>
                  </div>
                  <div class="table-item fl">
                    <div class="label">* First Name</div>
                    <div class="input">
                      <input type="text">
                    </div>
                  </div>
                </div>
                <div class="table-item">
                  <div class="lable">* Address Line1</div>
                  <div class="input">
                    <input type="text">
                  </div>
                </div>
                <div class="table-item">
                  <div class="lable">* Address Line1</div>
                  <div class="input">
                    <input type="text">
                  </div>
                </div>
                <div class="table-item">
                  <div class="lable">* Telephone</div>
                  <div class="input">
                    <input type="text">
                  </div>
                </div>
                <div class="rember">
                  <input type="checkbox">Set as Default Shipping Address
                </div>
                <div class="shipping-submit">SAVE</div>
              </div>
            </div>
          </div>
        </div>
        <div class="fr right-layout">
          <div class="right-top">Order Summary</div>
          <div class="right-content">
            <ul>
              <li>
                <div class="label">Subtotal</div>
                <div class="price">$654.98</div>
              </li>
              <li>
                <div class="label">Estimated Shipping</div>
                <div class="price">$0.00</div>
              </li>
              <li>
                <div class="label">
                  Balance <span>(Available: ${{data.balance}})</span>
                  <dswitch :status.sync="isBalance" :on-change="changeBalance" class="disi"></dswitch>
                </div>
                <div class="price red">-${{isBalance ? data.balance : '0.00'}}</div>
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
</template>

<script>
import orderstatus from 'components/layout/OrderStatus';
export default {
  name: 'secure',
  components: {
    orderstatus
  },
  data () {
    return {
      isBalance: false, // 余额
      totalPrice: 0, // 总价
      data: [],
      cards: [], // 银行卡列表
      addressId: '', // 地址ID
      cardNumber: '', // 卡号
      payType: 0, // 支付方式  2-paypal 3-stripe
      confirmModal: {}
    };
  },
  computed: {},
  created () {
    this.getOrdersData();
    this.getCardsData();
  },
  mounted () {},
  watch: {},
  methods: {
    // 获取订单信息
    getOrdersData () {
      this.request('OrdersPayment', {
        order_id: this.$route.query.orderId
      }).then((res) => {
        if (res.status === 200 && res.content) {
          this.data = res.content;
          this.totalPrice = this.returnFloat(+this.data.price - +this.data.money);
          // addressId
          let userAddress = this.data.user_address;
          let len = userAddress.length;
          for (let i = 0; i < len; i++) {
            if (userAddress[i].is_default === 1) {
              this.addressId = userAddress[i].id;
            }
          }
        } else {
          this.errJump ();
        }
      }, err => {
        this.$Toast(err);
        this.errJump ();
      });
    },
    // 获取银行卡信息
    getCardsData () {
      this.request('CardsList', {
        order_id: this.$route.query.orderId
      }).then((res) => {
        if (res.status === 200 && res.content) {
          this.cards = res.content.cards || [];
        }
      }, err => {
        this.$Toast(err);
      });
    },
    // 错误ID跳转
    errJump () {
      let self = this;
      self.$Toast({
        message: 'Error Order Id',
        duration: 1000
      });
      setTimeout(function() {
        self.$router.push({path: '/secure'});
      }, 1000);
    },
    // 添加新卡
    addNewCard () {
      if (this.addressId === '') {
        this.$Toast('Please add a shipping address');
      } else {
        this.$router.push({path: '/secure/addCard', query: {
          orderId: this.$route.query.orderId,
          addressId: +this.addressId,
          balance: this.isBalance,
          payType: this.payType
        }});
      }
    },
    // 订单支付
    orderPay () {
      if (this.addressId === '') {
        this.$Toast('Please add a shipping address');
        return;
      }
      if (!this.payType) {
        this.$Toast('Please select payment method');
        return;
      }
      // 若有卡或者使用Paypal支付，并选择了Credit／Debit card
      this.request('OrdersPay', {
        order_id: +this.$route.query.orderId, // 订单号
        address_id:	+this.addressId, // 地址id
        balance: this.isBalance, // 是否使用余额
        pay_type: this.payType, //	是	Number	支付方式 2-paypal 3-stripe
        source: this.cardNumber
      }).then((res) => {
        let self = this;
        if (res.status === 200) {
          if (self.payType === 2 && res.content) {
            self.$Toast({
              message: 'Payment Processing',
              duration: 3000
            });
            // 如果是PayPal去支付页面
            setTimeout(function() {
              window.location.href = res.content.payUrl;
            }, 1000);
          }
          if (self.payType === 3) {
            self.$Toast({
              message: 'Payment Processing',
              duration: 1200
            });
          }
        } else {
          self.$Toast({
            message: res.msg || 'Payment Failure',
            duration: 1200
          });
        }
      }, err => {
        this.$Toast(err);
      });
    },
    // 改变points
    changeBalance (status) {
      if (status) {
        this.isBalance = true;
      } else {
        this.isBalance = false;
      }
    },
    // 删除card
    clickCardDel (cardId, cardNumber) {
      let self = this;
      self.confirmModal = {
        show: true,
        title: 'Confirmed to delete?',
        onText: 'Yes',
        content: `Delete the card!`,
        action: function () {
          self.request('CardsDelete', {
            card_id: cardId
          }).then((res) => {
            if (res.status === 200 && res.content) {
              self.confirmModal.show = false;
              self.$Toast({
                message: 'Success',
                duration: 800
              });
              self.cards = res.content.cards;
              // 如果是选中的card 被删除
              if (self.cardNumber === +cardNumber) {
                self.cardNumber = '';
              }
            }
          }, err => {
            self.$Toast(err);
          });
        }
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
@import "~less/tool.less";
.secure-main {
  background-color: #fff;
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
          }
          .disi {
            display: inline-block;
            top: 5px;
            margin-left: 5px;;
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
// 地址
.shipping-table {

  .table-item {
    width: 830px;
    &.fl {
      width: 405px;
    }
    .mr {
      margin-right: 20px;
    }
    .label {
      .height(25);
    }
    input {
      .height(44);
      border: 1px solid #e4e4e4;
      padding: 0 10px;
    }
  }
}
</style>
