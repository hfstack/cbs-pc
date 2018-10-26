<template>
  <div class="activity" >
    <topbar title="Halloween sale"></topbar>
    <div class="activity-header" :style="{'background-color': bgColor}">
      <p class="title">{{promotions.promotion_msg}}<a href="javascript:;" class="title" @click="getCoupon" v-if="coupons.length"> CHECK IT</a></p>
      <div class="activity-countdown">{{startEndDesc}} <countdown v-if="promotions.promotion_end" :color="bgColor" :start-time="promotions.promotion_start" :end-time="!this.isEnd ? promotions.promotion_end : ''"></countdown></div>
    </div>
    <div class="activity-content">
      <goods-list :list="goodsList" v-if="goodsList.length"></goods-list>
    </div>
    <div class="mengcheng" v-if="couponShow">
      <div class="coupon-info" >
        <p class="detail">detail</p>
        <p class="promotion-msg">{{this.promotions.promotion_msg}}</p>
        <span class="close" @click="couponClose"><i class="iconfont">&#xe63f;</i></span>
        <ul class="cooupon-ul">
          <li v-for="item in coupons" :key="item.id" class="coupon-item">
            <p class="price">{{item.price}} OFF</p>
            <p class="desc">For a purchase over {{item.use_price}}</p>
            <p class="time">{{item.startdate}} - {{item.enddate}}</p>
          </li>
        </ul>
      </div>
    </div>
    <float-menu></float-menu>
  </div>
</template>
<script>
import Countdown from 'common/Countdown';
import GoodsList from 'common/GoodsList';
import FloatMenu from 'common/FloatMenu'
export default {
  data() {
    return {
      bgColor: '#32B16C',
      goodsList: [],
      promotions: {
        promotion_start: '',
        promotion_end: '',
        promotion_msg: ''
      },
      activityType: '', //活动类型
      startEndDesc: '',
      isEnd: false,
      couponShow: false,
      coupons: [],
      activityId: 0,
    }
  },
  components: {
    Countdown,
    GoodsList,
    FloatMenu
  },
  mounted() {
    this.activityId = this.$route.query.activity_id || 0
    this.getPromotion();
  },
  conputed: {
    title: function() {
      let desc = '';
      let activityType = this.activityType
      if(activityType === 'reduce') {
        // 满减
        desc = ''
      } else if (activityType === 'return') {
        // 满返
      } else if(activityType === 'discount') {
        // 多件多折 
      } else if(activityType === 'wholesale') {
        // X元n件 
      } else if(activityType === 'limit') {
        // 限时特价 
      } else if(activityType === 'quantity') {
        // 限量秒杀 
      } else if(activityType === 'give') {
        // 买n免1 
      }
    }
  },
  methods: {
    // 获取优惠券信息
    getCoupon() {
      this.couponShow = true;
    },
    promotionsInfo() {
      const nowTime = new Date().getTime();
      const pTime = new Date(this.promotions.promotion_start).getTime(); 
      let eTime = new Date(this.promotions.promotion_end).getTime(); 
      // 开始时间大于现在时间 未开始
      if(pTime > nowTime) {
        this.startEndDesc = 'Start at';
        this.bgColor = '#32B16C';
      // 结束时间小于现在时间 已经结束
      } else if (eTime < nowTime){
        this.startEndDesc = 'End in';
        this.bgColor = '#292929';
        this.isEnd = true;
      } else {
        this.startEndDesc = 'End in';
        this.bgColor = '#FD386B';
      }
    },
    // 促销列表
    getPromotion() {
      this.request('PromotionsList', {
        page: this.page,
        promotion_id: this.activityId
      }).then((res) => {
        if(res.status === 200 && res.content) {
          this.goodsList = res.content.goods || [];
          this.activityType = res.content.activityType;
          this.promotions = res.content.promotions || '';
          this.coupons = res.content.coupons || [];
          this.promotionsInfo();
        }
      }, err => {
        this.$Toast(err);
      })
    },
    // 关闭优惠券
    couponClose() {
      this.couponShow = false;
    }
  }
}
</script>
<style lang="less">
@import "~less/tool.less";
.activity{
  margin-top: 90/@rem;
  text-align: center;
  .activity-header{
     height:120/@rem;
     color: #fff;
    .title {
      font-size: 28/@rem;
      color: #FAFAFA;
      padding-top: 16/@rem;
    }
    .activity-countdown{
      margin-top: 18/@rem;
      height: 40/@rem;
      line-height: 40/@rem;
    }
  }
  .mengcheng {
    background-color: rgba(0, 0, 0, 0.57);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 2222;
    .coupon-info{
      position: absolute;
      bottom: 0;
      width: 100%;
      background: #F6F7F6;
      height: 897/@rem;
      padding: 0 38/@rem;
      text-align: left;
      .coupon-item{
        height: 240/@rem;
        padding: 30/@rem 40/@rem;
        background: url('data:image/png;base64,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') no-repeat center center;
        background-size: cover;
        margin-bottom: 20px;
      }
      .detail{
        color: #020100;
        font-size: 30/@rem;
        font-weight: bold;
        margin-top: 23/@rem;
        margin-bottom: 42/@rem;
        text-align: center;
      }
      .promotion-msg{
        text-align: left;
        font-size: 28/@rem;
        color: #000000;
        margin-bottom: 20/@rem;
      }
      .price{
        color: #FF473C;
        font-size: 50/@rem;
        font-family:PingFangSC-Regular;
        font-weight:bold;
        font-style:italic;
      }
      .desc{
        font-size: 32/@rem;
        color: #000000;
        margin: 12/@rem 0 40/@rem;
      }
      .time{
        color: #939399;
        font-size: 24/@rem;
      }
      .close{
        position: absolute;
        right: 23/@rem;
        top: 23/@rem;
      }
      .cooupon-ul{
        height: 740/@rem;
        overflow: auto;
      }
    }
  }
 
}
</style>


