<template>
  <div class="failure-main-layout">
    <headers></headers>
    <div class="failure-main">
      <orderstatus :activetwo="true" :activethree="true"></orderstatus>
      <div class="failure-con">
        <div class="title">
          <i class="iconfont">&#xe62c;</i>
          Failure to pay
        </div>
        <p>Order amount: {{data.price}}</p>
        <p>Payment failed, please pay again.</p>
      </div>
      <router-link :to="{path: '/my/orderDetail?orderid=' + data.order_id}" class="btn-order">VIEW THE ORDER</router-link>
    </div>
  </div>
</template>

<script>
import orderstatus from 'components/layout/OrderStatus';
export default {
  data () {
    return {
      data: []
    }
  },
  components: {
    orderstatus
  },
  created () {
    let payParams = {};
    let url = '';
    // 银行卡支付
    payParams = {
      order_id: this.$route.query.orderId || '' // paypal返回payment_id
    };
    url = 'PaymentStatus';
    this.request(url, payParams).then((res) => {
      if (res.status === 200 && res.content) {
        this.data = res.content;
      }
    }, err => {});
  },
  mounted () {},
  methods: {},
  beforeDestroy () {}
};
</script>

<style lang="less">
@import '~less/tool.less';
.failure-main-layout {
  width: 100%;
  margin: 0 auto;
  background: #fff;
}
.failure-main {
  width: 1240px;
  margin: 0 auto;
  text-align: center;
  padding-bottom: 500px;
  .failure-con {
    background-color: #fff;
    text-align: center;
    padding-bottom: 50px;

    .title {
      margin-top: 30px;
      margin-bottom: 25px;
      font-size: 24px;
      color: #019532;
      font-weight: bold;
      i {
        vertical-align: middle;
        margin-right: 15px;
        color:  #019532;
        font-size: 50px;
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
