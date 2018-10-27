<template>
  <div class="successful-main">
    <topbar title="Successful Payment" backUrl="my/orderList"></topbar>
    <div class="successful-con">
      <div class="title">
        <i class="iconfont">&#xe602;</i>
        Successful Payment
      </div>
      <p class="f32">Order amount: {{data.price}}</p>
      <p>Thank you for your order, we will deliver the goods soon</p>
    </div>
    <router-link :to="{path: '/my/orderDetail?orderid=' + data.order_id}" class="btn-order">VIEW THE ORDER</router-link>
    <router-link :to="{path: '/home'}" class="btn-shopping">GO SHOPPING</router-link>
  </div>
</template>

<script>
export default {
  data () {
    return {
      data: {}
    }
  },
  computed: {},
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
.successful-main {
  padding-top: 92/@rem;
  font-size: 28/@rem;
  .successful-con {
    background-color: #fff;
    border-top: 1px solid @gray3;
    padding: 20/@rem;
    text-align: center;
    padding-bottom: 50/@rem;
    font-weight: bold;
    .title {
      margin-top: 60/@rem;
      margin-bottom: 25/@rem;
      height: 100/@rem;
      font-size: 30/@rem;
      i {
        color: #46C33B;
        font-size: 80/@rem;
        vertical-align: middle;
        margin-right: 10/@rem;
      }
    }
    p {
      .height(45);
    }
    .f32 {
      font-size: 32/@rem;
    }
  }

  .btn-order {
    display: block;
    .whl(710, 88);
    margin: 0 auto;
    background-color: @red;
    border-radius: 8/@rem;
    color: #fff;
    text-align: center;
    margin-top: 43/@rem;
  }
  .btn-shopping {
    display: block;
    .whl(710, 88);
    margin: 0 auto;
    background-color: #fff;
    border-radius: 8/@rem;
    border: 1px solid @red;
    color: @red;
    text-align: center;
    margin-top: 20/@rem;
  }
}
</style>
