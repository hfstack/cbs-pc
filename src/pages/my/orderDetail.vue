<template>
  <div>
    <div class="order-detail">
      <div class="order-title">
        status: <span style="color: #F96C17">{{orderDesc}}</span>
      </div>
      
      <div  class="my-order-list">
        <div class="top clearfix">
          <p class="order-id fl">Order: {{orderid}}</p>
          <p class="order-time fr">Date: {{ordertime}}</p>
        </div>
        <div class="detail clearfix" v-for="item in ordergoods">
          <div class="img fl">
            <img :src="item.img">
          </div>
          <div class="info fl">
            <div class="title">{{item.name}}</div>
            <div class="sku" v-for="(ele, index) in item.sku_value">{{ele}}</div>
          </div>
          <div class="fl qty">
            Qty: {{item.num}}
          </div>
          <div class="fr price">
            ${{item.price}}
          </div>
        </div>
      </div>
      <div style="padding: 10px 0;">
        <p class="o-price"><span class="fr money">${{parseFloat(finalAmount - shipping).toFixed(2)}}</span><span class="fr">Subtotal:</span></p>
        <p class="o-price"><span class="fr money">${{shipping}}</span><span class="fr">Shipping:</span></p>
        <p class="o-price total"><span class="fr money">${{finalAmount}}</span><span class="fr">All Total: </span></p>
      </div>
      <div class="address">
        <div class="address-line"></div>
        <!-- <i class="iconfont address-icon">&#xe651;</i> -->
        <p class="user"><span class="name">{{name}}</span><span>{{telephone.toString().slice(0, 3)}}*****{{telephone.toString().slice(7, 10)}}</span></p>
        <p class="adddress-detail">Ship to：{{address}}</p>
      </div>
      <div class="operate clearfix">
        <!-- 订单状态(订单状态 1-待付款 3-待发货 4-待收货 5-交易完成 6-交易取消 ) -->
        <!-- TODO 代付款  按钮是红色   其他时候都是正常颜色 -->
        <div class="operate-item operate-two" v-if="orderHandle.pay">Pay now {{this.finalTime}}</div>
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
      finalTime: 0,
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
      paytime: 0,
      confirmModal: {}
    }
  },
  mounted() {
    this.orderid = this.$route.query.orderId;
    // this.orderstatus = this.$route.query && this.$route.query.order_status || '';
    this.getOrderDetail();
  },
  computed: {},
  methods: {
     // 剩余时间倒计时
    getCountDown() {
      let paytime = new Date().getTime() + this.paytime * 1000;
      const self = this;
      let timer = setInterval(function() {
        let now = new Date().getTime();
        let t = paytime - now;
        let min = Math.floor((t / 60000) % 60);
        let sec = Math.floor((t / 1000) % 60);
        if (t > 0) {
          min = min < 10 ? '0' + min : min;
          sec = sec < 10 ? '0' + sec : sec;
        } else {
          clearInterval(timer);
        }
        self.finalTime = min + ':' + sec;
      }, 1000);
    },
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
          this.paytime = res.content.paytime;
          this.getOrderDesc();
          if(this.orderstatus === 1) {
            this.getCountDown();
          }
        }
      }, err => {
        this.$Messagebox({
          title: err.data.msg,
          type: 'error'
        });
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
        } else {
          this.$$Messagebox({
            title: res.msg,
            type: 'error'
          })
        }
      }, err => {
        this.$$Messagebox({
          title: err.data.msg,
          type: 'error'
        })
      })
    },
     // 确认收货
    handleDelete() {
      this.confirmModal = {
        show: true,
        type: 'confirm',
        content: 'Are you sure to delete the order？',
        action: this.handleDeleteCb
      }
    },
    // 删除订单
    handleDeleteCb() {
      this.request('OrdersDelete', {
        order_id: this.orderid
      }).then((res) => {
        if(res.status === 200) {
          this.confirmModal.show = false;
          this.$router.push({
            name: 'myOrders'
          })
        } else {
          this.$$Messagebox({
            title: res.msg,
            type: 'error'
          })
        }
      }, err => {
        this.$$Messagebox({
          title: err.data.msg,
          type: 'error'
        })
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
@import '~less/tool.less';

.order-detail{
  background-color: #fff;
  padding-bottom: 40px;
  .order-title{
    color: #010101;
    height: 58px;
    line-height: 58px;
    font-size: 18px;
    text-align: left;
  }
  .o-price{
    width: 100%;
    height: 38px;
    color: #939399;
    font-size: 14px;
    line-height: 38px;
    padding: 0 20px;
    span{
      display: block;
    }
    .money{
      width: 80px;
      text-align: left;
      margin-left: 80px;
      color: #F35262;
    }
  }
  .total{
  }
  .address{
    position: relative;
    height: 100px;
    box-shadow:0px 1px 0px 0px rgba(221,220,220,1);
    margin-top: 14px;
    padding: 20px 30px;
    border: 1px solid rgba(228,228,228,1);
    text-align: left;
    color: #030303;
    .address-line{
      position: absolute;
      left: 0px;
      top: 0;
      width: 8px;
      height: 100%;
      background: url('../../assets/images/my/xinfeng.png') repeat center center;
    }
    .user{
      color: #131313;
      font-size: 16px;
      span{
        display: inline-block
      }
      .name{
        margin-right: 30px; 
      }
    }
    .adddress-detail{
      margin-top: 20px;
    }
  }
  .my-order-list {
    background-color: #fff;
    .top {
      position: relative;
      width: 100%;
      height: 35px;
      line-height: 35px;
      padding: 0px 20px;
      color: #000000;
      font-size: 14px;
      background-color: #E4E4E4;
    }
    .detail {
      display: block;
      padding: 0 20px;
      width: 100%;
      height: 180px;
      border-bottom: 1px solid #E4E4E4;
      img{
        margin-top: 30px;
        width: 120px;
        height: 120px;
      }
      .info {
        position: relative;
        margin-left: 20px;
        width: 273px;
        margin-top: 48px;
        .title {
          text-align: left;
        }
        .sku {
          margin-top: 30px;
          float: left;
          margin-right: 30px;
        }
        
      }
      .qty{
        line-height: 180px;
        margin-left: 150px;
      }
      .price{
        line-height: 180px;
        margin-right: 30px;
        color: #F35262
      }
    }
  }
  .operate {
    position: relative;
    width: 100%;
    margin-top: 30px;
    .operate-item{
      width: 200px;
      height: 50px;
      line-height: 50px;
      color: @orange;
      border: 1px solid @orange;
      margin-left: 20px;
      cursor: pointer;
    }
    & > div {
      float: right;
      border-radius: 8px;
      text-align: center;
    }
    .operate-two {
      background: @orange;
      color: #fff
    }
  }  
}
</style>

