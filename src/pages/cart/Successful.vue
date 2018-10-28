<template>
  <div class="successful-main-layout">
    <headers></headers>
    <div class="successful-main">
      <orderstatus :activetwo="true" :activethree="true"></orderstatus>
      <div class="successful-con">
        <div class="title">
          <div class="icon">
            <i class="iconfont">&#xe625;</i>
          </div>
          Successful Payment
        </div>
        <p>Thank you for shopping with WaiWaiMall, we will deliver the goods soon ! Your order number is {{$route.query.orderId}}</p>
      </div>
      <router-link :to="{path: '/home'}" class="btn-shopping">GO SHOPPING</router-link>
      <router-link :to="{path: '/my/orderDetail?orderid=' + data.order_id}" class="btn-order">VIEW THE ORDER</router-link>
    </div>
  </div>
</template>

<script>
import orderstatus from 'components/layout/OrderStatus';
export default {
  data () {
    return {
      data: {}
    }
  },
  components: {
    orderstatus
  },
  created () {
    //  /cart/successful?payType=2&paymentId=12344&payerId=232233
    let payParams = {};
    let url = '';
    if (this.$route.query.payType === '2') {
      // paypal支付
      payParams = {
        payment_id: this.$route.query.paymentId || '', // paypal返回payment_id
        payer_id: this.$route.query.payerId || '' // paypal返回payer_id
      };
      url = 'PaymentPalExec';
    } else {
      // 银行卡支付
      payParams = {
        payment_id: this.$route.query.paymentId || '', // paypal返回payment_id
        payer_id: this.$route.query.payerId || '' // paypal返回payer_id
      };
      url = 'paymentStatus';
    }
    this.request(url, payParams).then((res) => {
      if (res.status === 200 && res.content) {
        this.data = res.content;
      }
    }, err => {
      this.$Toast(err);
    });
  },
  mounted () {},
  methods: {},
  beforeDestroy () {}
};
</script>

<style lang="less">
@import '~less/tool.less';
.successful-main-layout {
  width: 100%;
  margin: 0 auto;
  background: #fff;
}
.successful-main {
  width: 1240px;
  margin: 0 auto;
  text-align: center;
  padding-bottom: 500px;
  .successful-con {
    background-color: #fff;
    text-align: center;
    padding-bottom: 50px;

    .title {
      margin-top: 30px;
      margin-bottom: 25px;
      font-size: 24px;
      color: #019532;
      font-weight: bold;
      .icon {
        display: inline-block;
        .whl(50, 50);
        text-align: center;
        background-color: #019532;
        border-radius: 50%;
        vertical-align: middle;
        margin-right: 15px;
        i {
          color: #fff;
          font-size: 40px;
        }
      }
    }
    p {
      width: 590px;
      margin: 0 auto;
      font-size: 18px;
      .height(28);
      color: @gray;
    }
  }

  .btn-order {
    display: inline-block;
    margin-top: 50px;
    .whl(330, 50);
    background-color: @orange;
    border-radius: 8px;
    color: #fff;
    text-align: center;
    font-size: 18px;
  }
  .btn-shopping {
    display: inline-block;
    margin-top: 50px;
    .whl(330, 50);
    margin-right: 60px;
    background-color: #fff;
    border-radius: 8px;
    border: 1px solid @orange;
    color: @orange;
    text-align: center;
    font-size: 18px;
  }
}
</style>
