<template>
  <div class="secure-main-layout">
    <headers></headers>
    <div class="secure-main">
      <orderstatus :activetwo="true"></orderstatus>
      <div class="global-layout">
        <div class="fl left-layout">
          <div class="left-box">
            <div class="left-top">
              Shipping Address
              <router-link :to="{path: '/my/addressbook'}">More >></router-link>
            </div>
            <div class="left-content">
              <!-- 有地址信息-->
              <div class="shipping-address-main" v-if="data.user_address && data.user_address.length">
                <div class="shipping-address" v-for="item in data.user_address" v-if="(data.user_address && data.user_address.length === 1)  || item.is_default === 1">
                  <p>{{item.recipients}}</p>
                  <p>{{item.iphone}}</p>
                  <p>{{item.address}}</p>
                  <div class="edit" @click="clickEditAddress(item.id)">
                    <i class="iconfont">&#xe621;</i>Edit
                  </div>
                </div>
                <div class="add-button" @click="clickNewAddress">+ ADD NEW ADDRESS</div>
              </div>
              <!-- 没有地址信息 或者 第一次进入 -->
              <div class="shipping-address-main" v-else>
                <shippingaddress :callback="getAddressData" editAddressId=""></shippingaddress>
              </div>
            </div>
          </div>
          <!-- payment -->
          <div class="left-box mt20">
            <div class="left-top">Payment Method</div>
            <div class="left-content">
              <div class="credit-card-main">
                <div class="pay-type">
                  <!-- <input type="radio" name="choosecard" v-if="cards && !cards.length"> -->
                  <span>Credit Card</span>
                  <img src="~img/cart/2.png">
                </div>
                <!-- 卡 -->
                <div class="card-list" v-if="cards && cards.length">
                  <div class="cards" v-for="(item, index) in cards" :key="index">
                    <input type="radio" name="card" @click="clickCardRadio(3)">
                    <div class="card-detail fl" >
                      * Card No. : <span class="num">{{item.number}}</span>
                      <div class="edit" @click="clickCardEdit(item.id)"><i class="iconfont">&#xe621;</i>Edit</div>
                      <div class="delete" @click="clickCardDel(item.id, item.number)"><i class="iconfont">&#xe63d;</i>Delete</div>
                    </div>
                  </div>
                </div>
                <!-- 新增卡 -->
                <card v-show="!cards.length" cardId="" :saveCallback="saveCard"></card>
                <!-- 新增按钮 -->
                <div class="add-button" @click="clickNewCard">+ ADD NEW CARD</div>

                <div class="pay-type">
                  <input type="radio" name="card" @click="clickCardRadio(2)">
                  <span>PayPal</span>
                  <img src="~img/cart/3.png">
                </div>
              </div>
            </div>
          </div>
          <!-- goods -->
          <div class="left-box mt20">
            <div class="left-top">Order ({{data.goods && data.goods.length}} items)</div>
            <div class="left-content">
              <div class="goods" v-for="(item, index) in data.goods" :key="index">
                <div class="img fl">
                  <router-link :to="{path: '/detail?id=' + item.id}">
                    <img :src="item.img && item.img.ossimg()">
                  </router-link>
                </div>
                <div class="info fl">
                  <div class="title">{{item.name}}</div>
                  <div class="sku">
                    <template v-for="(prop, key, sindex) in item.props">
                      <span>{{key}} : </span><span class="mr">{{prop}}</span>
                    </template>
                  </div>
                </div>
                <div class="qty fl">Qty: {{item.num}}</div>
                <div class="total-price red fl">${{item.num * (item.price * 100) / 100}}</div>
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
                <div class="price">${{returnFloat(data.price || 0)}}</div>
              </li>
              <li>
                <div class="label">Estimated Shipping</div>
                <div class="price">{{+data.shipping > 0 ? ('$' + returnFloat(data.shipping)) : 'Free'}}</div>
              </li>
              <li>
                <div class="label">
                  Balance <span>( Available: ${{data.money}} )</span>
                  <dswitch :status.sync="isBalance" :on-change="changeBalance" class="disi"></dswitch>
                </div>
                <div class="price red">-${{isBalance ? data.money : '0.00'}}</div>
              </li>
            </ul>
            <div class="total-price">
              <div class="label">Total</div>
              <div class="price red">${{returnFloat(totalPrice)}}</div>
            </div>
            <div class="submit-button" @click="orderPay">CHECKOUT</div>
            <div class="we-accept">
              <div class="title">we accept</div>
              <div class="img"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 弹层 - 地址 -->
    <div class="modal-popup address-modal" v-show="isShowAddressModal">
      <div class="modal-content">
        <div class="title">Add New Shipping Address</div>
        <div class="close" @click="clickCloseAddress"><i class="iconfont">&#xe63f;</i></div>
        <shippingaddress :callback="getAddressData" :editAddressId="editAddressId"></shippingaddress>
      </div>
    </div>
    <!-- 弹层 - 银行卡 -->
    <div class="modal-popup card-modal" v-show="isShowCardModal">
      <div class="modal-content">
        <div class="title">Add New Card</div>
        <div class="close" @click="clickCloseCard"><i class="iconfont">&#xe63f;</i></div>
        <card :cardId="editCardId" :saveCallback="saveCard"></card>
      </div>
    </div>
    <!-- 删除银行卡确认框 -->
    <confirm :show.sync="confirmModal.show" :title="confirmModal.title" :content="confirmModal.content" :on-ok="confirmModal.action"  okText="Yes"></confirm>
  </div>
</template>

<script>
import orderstatus from 'components/layout/OrderStatus';
import dswitch from 'components/basic/Switch';
import shippingaddress from './ShippingAddress';
import card from './Card';
export default {
  name: 'secure',
  components: {
    orderstatus,
    dswitch,
    shippingaddress,
    card
  },
  data () {
    return {
      isBalance: false, // 开启余额
      subtotalPrice: 0, // 商品价格
      totalPrice: 0, // 总价
      data: [], // 订单信息
      cards: [], // 银行卡列表
      addressId: '', // 地址ID
      cardNumber: '', // 卡号
      payType: 0, // 支付方式  2-paypal 3-stripe
      editAddressId: '', // 编辑地址ID
      isShowAddressModal: false, // 显示地址弹层
      isShowCardModal: false, // 显示银行卡弹层
      cardModalData: {}, // 银行卡编辑内容
      editCardId: '', // 编辑银行卡号
      confirmModal: {} // 银行卡删除确认框
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
          // 计算总价
          this.computePice();
          // addressId
          let userAddress = this.data.user_address;
          let len = userAddress.length;
          for (let i = 0; i < len; i++) {
            if (userAddress[i].is_default === 1) {
              this.addressId = userAddress[i].id;
            }
          }
          // 特殊处理
          if (len === 1) {
            this.addressId = userAddress[0].id;
          }
        } else {
          this.errJump ();
        }
      }, err => {
        this.$Messagebox({
          title: err || 'system error',
          type: 'error'
        });
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
        this.$Messagebox({
          title: err || 'system error',
          type: 'error'
        });
      });
    },
    // 获取地址数据
    getAddressData (addressData) {
      let userAddress = addressData.content || [];
      let len = userAddress.length;
      // 重新渲染数据
      this.data.user_address = userAddress;
      // 特殊处理
      if (len === 1) {
        this.addressId = userAddress[0].id;
        return;
      }
      for (let i = 0; i < len; i++) {
        if (userAddress[i].is_default === 1) {
          this.addressId = userAddress[i].id;
        }
      }
    },
    // 计算价格
    computePice () {
      this.totalPrice = 0;
      // 邮费
      this.totalPrice = (+this.data.price * 100 + +this.data.shipping * 100) / 100;
      // 余额
      if (this.isBalance) {
        this.totalPrice = (this.totalPrice * 100 - +this.data.money * 100) / 100;
      }
    },
    // 订单支付
    orderPay () {
      let self = this;
      let locked = false;
      if (locked) {
        return;
      }
      locked = true;
      // 如果没有地址信息
      if (self.addressId === '') {
        this.$Messagebox({
          title: 'Please fill in a shipping address',
          type: 'error'
        });
        return;
      }
      if (!self.payType) {
        this.$Messagebox({
          title: 'Please select a payment method',
          type: 'error'
        });
        return;
      }
      // 若有卡或者使用Paypal支付，并选择了Credit／Debit card
      self.request('OrdersPay', {
        order_id: self.$route.query.orderId, // 订单号
        address_id:	+self.addressId, // 地址id
        balance: self.isBalance, // 是否使用余额
        pay_type: self.payType, //	是	Number	支付方式 2-paypal 3-stripe
        source: self.cardNumber
      }).then((res) => {
        if (res.status === 200) {
          if (self.payType === 2 && res.content) {
            // 如果是PayPal去支付页面
            window.location.href = res.content.payUrl;
          }
          // if (self.payType === 3) {
          //   self.$router.push({path: '/cart/successful?orderId=' + self.$route.query.orderId});
          // }
          self.$Messagebox({
            title: 'Payment Processing',
            type: 'success'
          });
        } else {
          self.$Messagebox({
            title: 'Payment Failure',
            type: 'error'
          });
        }
        locked = false;
      }, err => {
        locked = false;
        self.$Messagebox({
          title: err || 'system error',
          type: 'error'
        });
      });
    },
    // 改变balance
    changeBalance (status) {
      if (status) {
        this.isBalance = true;
      } else {
        this.isBalance = false;
      }
      this.computePice();
    },
    // 编辑地址
    clickEditAddress (id) {
      this.isShowAddressModal = true;
      this.editAddressId = id + ''; // 转成string
    },
    // 保存卡片
    saveCard () {
      this.isShowCardModal = false;
      this.getCardsData();
    },
    // 编辑card
    clickCardEdit (cardId) {
      this.isShowCardModal = true;
      // 获取银行卡信息
      this.editCardId = cardId + ''; // 转化为string
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
              self.cards = res.content.cards;
              // 如果是选中的card 被删除
              if (self.cardNumber === +cardNumber) {
                self.cardNumber = '';
              }
            }
          }, err => {
            self.$Messagebox({
              title: err || 'system error',
              type: 'error'
            });
          });
        }
      }
    },
    // 点击卡的radio
    clickCardRadio (num) {
      this.payType = num;  // 支付方式  2-paypal 3-stripe
    },
    // 新增地址
    clickNewAddress () {
      this.isShowAddressModal = true;
    },
    // 关闭
    clickCloseAddress () {
      this.isShowAddressModal = false;
    },
    // 新增银行卡
    clickNewCard () {
      this.isShowCardModal = true;
      this.editCardId = ''; // 编辑的银行卡号为空
    },
    // 关闭
    clickCloseCard () {
      this.isShowCardModal = false;
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
  padding-bottom: 200px;
  .mt20 {
    margin-top: 20px;
  }

  // 新增卡按钮
  .add-button {
    .whl(200, 40);
    cursor: pointer;
    border: 1px solid @orange;
    border-radius: 4px;
    background-color: #fff;
    color: @orange;
    text-align: center;
    margin-left: 325px;
    margin-top: 20px;
  }

  // 有地址信息
  .shipping-address-main {
    margin-bottom: 30px;
  }
  .shipping-address {
    position: relative;
    .wh(800, 150);
    font-size: 16px;
    background-color: #F7F9FA;
    padding: 10px 20px;
    margin: 30px 12px;
    p {
      width: 700px;
      .line1();
      .height(40);
    }
    &::before {
      position: absolute;
      top: 0;
      left: 0;
      background: url('~img/cart/left_bg.png') no-repeat;
      width: 8px;
      height: 150px;
      display: block;
      content: '';
    }
    .edit {
      position: absolute;
      top: 20px;
      right: 20px;
      color: @gray;
      cursor: pointer;
      font-size: 14px;
      i {
        margin-right: 5px;
      }
    }
  }

  // 卡
  .credit-card-main {
    padding: 15px 0;
    .card-new {
      margin-left: 0;
    }
    .pay-type {
      font-weight: bold;
      .height(60);
      input {
        margin-right: 10px;
      }
      span {
        margin-right: 14px;
      }
      img {
        vertical-align: middle;
      }
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
      .status {}
    }
    .info {
      width: 280px;
      margin-left: 20px;
      margin-top: 10px;
      .title {
        line-height: 25px;
        word-break: break-all;
        min-height: 44px;
        .line2();
      }
      .sku {
        margin-top: 25px;
        color: @gray;
        .mr {
          margin-right: 38px;
        }
      }
    }
    .qty {
      width: 80px;
      margin: 50px 0 0 120px;
    }
    .total-price {
      margin: 46px 0 0 120px;
      font-size: 22px;
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
        position: relative;
        padding: 0 20px;
        font-size: 16px;
        font-weight: bold;
        .height(60);
        background-color: #F3F3F3;
        a {
          position: absolute;
          right: 20px;
          top: 0px;
          color: @gray;
          font-weight: normal;
          font-size: 14px;
        }
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
        cursor: pointer;
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

// 银行卡列表
.card-list {
  .cards {
    position: relative;
    .clearfix();
    input {
      position: absolute;
      top: 15px;
      left: 0;
    }
    .card-detail {
      .whl(790, 50);
      padding-left: 20px;
      margin-left: 30px;
      margin-bottom: 10px;
      background-color: #F7F9FA;
      position: relative;

      .num {
        color: @gray;
      }
      .edit, .delete {
        cursor: pointer;
        position: absolute;
        top: 10px;
        right: 20px;
        color: @gray;
        i {
          margin-right: 6px;
          vertical-align: middle;
        }
        .height(30);
      }
      .edit {
        right: 100px;
      }
    }
  }
}
// 弹层
.modal-popup {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  background: rgba(0, 0, 0, 0.5);
  .modal-content {
    position: relative;
    margin: 0 auto;
    width: 890px;
    padding: 30px;
    background-color: #fff;
    border-radius: 8px;
    top: 100px;
    .close {
      position: absolute;
      cursor: pointer;
      right: 20px;
      top: 20px;
      i {
        color: @gray;
      }
    }
    .title {
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 20px;
    }
  }
  .card-new {
    background: none;
  }
}
</style>
