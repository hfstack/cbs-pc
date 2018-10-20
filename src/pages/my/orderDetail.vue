<template>
  <div>
    <topbar title="Order Details"></topbar>
    <div class="order-detail">
      <div class="page-title">
        {{orderDesc}}
      </div>
      <div class="address">
        <i class="iconfont address-icon">&#xe651;</i>
        <p class="user"><span class="name">{{name}}</span><span>{{telephone.toString().slice(0, 3)}}*****{{telephone.toString().slice(7, 10)}}</span></p>
        <p class="adddress-detail">Ship to：{{address}}</p>
      </div>
      <div  class="my-order-list">
        <div class="top">
          <p class="order-id">Order: {{orderid}}</p>
          <p class="order-time">Date: {{ordertime}}</p>
        </div>
        <div class="detail" v-for="item in ordergoods">
          <div class="img fl">
            <img :src="item.img">
          </div>
          <div class="info fl">
            <div class="title">{{item.name}}</div>
            <div class="sku" v-for="(ele, index) in item.sku_value">{{ele}}</div>
            <div class="price">${{item.price}}</div>
            <div class="num">x {{item.num}}</div>
          </div>
        </div>
      </div>
      <div>
        <p class="o-price"><span class="fl">Subtotal:</span><span class="fr">${{parseFloat(finalAmount - shipping).toFixed(2)}}</span></p>
        <p class="o-price"><span class="fl">Shipping：Free</span><span class="fr">$ {{shipping}}</span></p>
        <p class="o-price total"><span class="fl">All Total：</span><span class="fr">${{finalAmount}}</span></p>
      </div>
      <div class="operate clearfix">
        <!-- 订单状态(订单状态 1-待付款 3-待发货 4-待收货 5-交易完成 6-交易取消 ) -->
        <!-- TODO 代付款  按钮是红色   其他时候都是正常颜色 -->
        <div class="operate-item operate-two" v-if="orderHandle.pay">Pay now{{this.finalAmount}}</div>
        <div class="operate-item operate-two" @click="handleCollect" v-if="orderHandle.collect">I get it</div>
        <div class="operate-item" @click="getLogistics" v-if="orderHandle.logistic">Logistics Info</div>
        <div class="operate-item" v-if="orderHandle.delete" @click="handleDelete">Delete</div>
      </div>
    </div>
    <confirm :show.sync="confirmModal.show" :title="confirmModal.title"  :content="confirmModal.content" :on-ok="confirmModal.action"  okText="Yes"></confirm>
  </div>
</template>
<script>
export default {
  data() {
    return {
      orders: [],
      orderstatus: 0,
      ordergoods: [],
      orderid: '',
      ordertime: '',
      finalAmount: 0,
      shipping: '',
      name: '',
      telephone: '',
      address: '',
      orderStatusDesc: '',
      orderDesc: '',
      orderHandle: {
        delete: false,
        pay: false,
        logistic: false,
        collect: false
      },
      confirmModal: {}
    }
  },
  mounted() {
    this.orderid = this.$route.query.orderid;
    // this.orderstatus = this.$route.query && this.$route.query.order_status || '';
    this.getOrderDetail();
  },
  computed: {},
  methods: {
    getOrderDesc() {
      let handle = {};
      if(+this.orderstatus === 1) {
        this.orderStatusDesc = 'Unpaid';
        this.orderDesc = 'Waiting for payment';
        // 待付款
        // 删除订单（delete）、支付（pay）
        handle.delete = true;
        handle.pay = true;
      } else if (+this.orderstatus === 3) {
        this.orderStatusDesc = 'Preparing';
        // 待发货 无操作
        this.orderDesc = 'Goods awaiting confirmation';
      } else if(+this.orderstatus === 4) {
        // 待收货
        this.orderStatusDesc = 'Shipped';
        this.orderDesc = 'Goods awaiting confirmation';
        // 确认收货、查看物流信息
        handle.logistic = true;
        handle.collect = true
      } else if (+this.orderstatus === 5) {
        this.orderStatusDesc = 'Delivered';
        this.orderDesc = 'Goods have been served'
      } else if (+this.orderstatus === 6) {
        this.orderStatusDesc = 'Cancelled';
        // 已取消
        this.orderDesc = 'Order cancelled';
        handle.delete = true;
      }
      this.orderHandle = handle;
    },
    // 订单详情
    getOrderDetail() {
      this.request('OrdersDetail', {
        order_id: this.orderid
      }).then((res) => {
        if(res.status === 200 && res.content) {
          this.ordergoods = res.content.ordergoods;
          this.orderstatus = res.content.orderstatus;
          this.orderid = res.content.orderid;
          this.ordertime = res.content.ordertime;
          this.finalAmount = res.content.final_amount;
          this.shipping = res.content.shipping;
          this.name = res.content.name;
          this.telephone = res.content.telephone;
          this.address = res.content.address; 
          this.getOrderDesc();
        }
      }, err => {
        this.$Toast(err.data.msg);
      })
    },
    // 确认收货
    handleCollect() {
      this.confirmModal = {
        show: true,
        title: 'Do you confirm receipt?',
        onText: 'Yes',
        content: `Confirm receipt can get ${Math.floor(this.finalAmount)} points!`,
        action: this.handleCollectCb
      }
    },
    // 确认收货 回调
    handleCollectCb() {
      this.request('OrdersSign', {
        order_id: this.orderid
      }).then((res) => {
        if(res.status === 200) {
          this.confirmModal.show = false;
          this.getOrderDetail();
          this.$Toast('success');
        }
      }, err => {
        this.$Toast(err)
      })
    },
    // 删除订单
    handleDelete() {
      this.request('OrdersDelete', {
        order_id: this.orderid
      }).then((res) => {
        if(res.status === 200) {
          this.confirmModal.show = false;
          this.getOrderDetail();
          this.$Toast(res.msg)
        }
      }, err => {
        this.$Toast(err)
      })
    },
    // 物流信息
    getLogistics() {
      this.$router.push({
        name: 'logistics',
        query: {
          order_id: this.orderid
        }
      })
    }
  }
}
</script>
<style lang="less">
.order-detail{
  margin-top: 90px;
  background-color: #fff;
  .page-title{
    color: #fff;
    height: 128px;
    line-height: 128px;
    background-color: #FC5866;
    font-size: 36px;
    text-align: left;
    padding-left: 50px;
  }
  .o-price{
    width: 100%;
    height: 48px;
    color: #939399;
    font-size: 24px;
    line-height: 48px;
    padding: 0 20px;
    span{
      display: block;
    }
  }
  .total{
    span:nth-child(1){
      color: #050505;
    }
    span:nth-child(2){
      color: #FF473C;
    }
  }
  .address{
    position: relative;
    height: 117px;
    padding-left: 70px;
    box-shadow:0px 1px 0px 0px rgba(221,220,220,1);
    padding-top: 27px;
    .address-icon{
      position: absolute;
      top: 43px;
      left: 20px;
      color: #939399;
      font-size: 33px;
    }
    .user{
      color: #131313;
      font-size: 28px;
      span{
        display: inline-block
      }
      .name{
        margin-right: 30px; 
      }
    }
    .adddress-detail{
      margin-top: 6px;
    }
  }
  .my-order-list {
    background-color: #fff;
    .top {
      position: relative;
      width: 100%;
      height: 100px;
      padding: 10px 70px;
      color: #939399;
      font-size: 24px;
      margin-bottom: 20px;
      p{
        line-height: 44px;
      }
    }
    .detail {
      display: block;
      padding: 0 20px;
      margin-bottom: 18px;
      // margin-top: 20px;
      .img, img {
        background-size: 100%;
      }
      .info {
        position: relative;
        margin-left: 20px;
        width: 540px;
        .title {
        }
        .sku {
        }
        .price {
          position: absolute;
          top: 55px;
          right: 0;
        }
        .num {
          position: absolute;
          top: 95px;
          right: 0;
        }
      }
    }
  }
  .operate {
    position: relative;
    width: 100%;
    border-top: 1px solid #f0f0f3;
    .operate-item{
      margin: 20px 10px;
    }
    & > div {
      float: right;
      border-radius: 50px;
      text-align: center;
    }
    .operate-two {
      color: #FF473C
    }
  }  
}
</style>

