<template>
  <div class="failure-main">
    <topbar title="Failure Payment" backUrl="my/orderList"></topbar>
    <div class="failure-con">
      <div class="title">
        <i class="iconfont">&#xe63f;</i>
        Failure to pay
      </div>
      <p class="f32">Order amount: {{data.price}}</p>
      <p>Payment failed, please pay again.</p>
    </div>
    <router-link :to="{path: '/my/orderDetail?orderid=' + data.order_id}" class="btn-order">VIEW THE ORDER</router-link>
  </div>
</template>

<script>
export default {
  data () {
    return {
      data: []
    }
  },
  computed: {},
  created () {
    //  /cart/failure?payType=2&paymentId=12344&payerId=232233
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
.failure-main {
  padding-top: 92/@rem;
  font-size: 28/@rem;
  .failure-con {
    background-color: #fff;
    border-top: 1px solid @gray3;
    padding: 20/@rem;
    text-align: center;
    padding-bottom: 50/@rem;
    font-weight: bold;
    .title {
      margin-top: 60/@rem;
      margin-bottom: 5/@rem;
      height: 100/@rem;
      font-size: 30/@rem;
      i {
        color: @red;
        font-size: 60/@rem;
        vertical-align: middle;
        margin-right: 10/@rem;
        border: 2px solid @red;
        border-radius: 50%;
        padding: 10/@rem;
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
    font-size: 28/@rem;
  }
}
</style>
