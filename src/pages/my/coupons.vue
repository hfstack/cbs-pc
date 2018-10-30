<template>
  <div>
    <div class="my-coupon">
      <div class="c-search">
        <input type="text" v-model="redeemCode" class="s-input" placeholder="Enter promo code here"/>
        <div class="search-btn" @click="couponApply">Applay</div>
      </div>
      <div class="coupon-list" v-if="couponList && couponList.length > 0">
        <!-- 优惠券状态 1-可用 2-未开始 3-已过期未使用 4-已使用 -->
        <div class="coupon-item" :class="item.datestatus === 1 ? 'able': 'disable'" v-for="item in couponList" :key="item.id">
          <p class="title">${{item.use_price}} OFF</p>
          <p class="desc">{{item.text}}</p>
          <p class="use-time">{{item.startdate}} - {{item.enddate}}</p>
          <div class="use-flag-img" :class="{'expired': item.datestatus === 3, 'used': item.datestatus === 4}"></div>
        </div>
      </div>
      <!-- <pageempty :margin-top="185" v-if="couponList && couponList.length === 0" icon="&#xe691;" desc="You don‘t have any available coupons now!"></pageempty> -->
    </div>
  </div> 
</template>
<script>
export default {
  data() {
    return {
      searchContent: '',
      couponList: [],
      redeemCode: ''
    }
  },
  mounted() {
    this.getCouponList();
  },
  methods: {
    getCouponList() {
      this.request('CouponList', {
        redeemCode: this.redeemCode
      }).then((res) => {
        if(res.status === 200 && res.content) {
          this.couponList = res.content || [];
        } else {
          this.$Messagebox({
            type: 'error',
            title: res.msg
          })
        }
      }, err => {
        this.$Messagebox({
          type: 'error',
          title: err
        })
      });
    },
    // 优惠券兑换
    couponApply() {
      this.request('CouponsApply', {
        redeemCode: this.redeemCode
      }).then((res) => {
        if(res.status === 200 && res.content) {
          this.getCouponList();
          this.$Messagebox({
            type: 'success',
            title: 'Exchange success'
          })
        } else {
          this.$Messagebox({
            type: 'error',
            title: res.msg
          }) 
        }
      }, err => {
        this.$Messagebox({
          type: 'error',
          title: err
        })
      });
    }
  }
};
</script>
<style lang="less">
.my-coupon{
  .c-search{
    width: 440px;
    margin: 30px auto;
    position: relative;
    height: 50px;
    line-height: 50px;
  }
  .s-input{
    width: 100%;
    height: 100%;
    padding: 0 14px;
    
  }
  .search-btn{
    cursor: pointer;
    position: absolute;
    right: 0px;
    top: 0;
    width:90px;
    height: 50px;
    line-height: 50px;
    font-size: 18px;
    text-align: center;
    background:rgba(216,216,219,1);
    border:1px solid rgba(240,240,243,1);
    background-color: #D8D8DB;
    color: #fff;
  }
  .coupon-list{
    padding: 0 34px;
  }
  .coupon-item{
    display: inline-block;
    width: 400px;
    height: 150px;
    margin: 0 10px;
    position: relative;
    padding: 20px 34px;
    text-align: left;
    .title{
      line-height:36px;
      font-size: 36px;
      font-family:PingFangSC-Regular;
      font-weight:bold;
      font-style:italic;
      color:rgba(255,71,60,1);
      text-align: left;
    }
    .desc{
      color: #000000;
      font-size: 18px;
      margin-top: 12px;
      font-weight: 400
    }
    .use-time{
      color:#939399;
      font-size: 14px;
      margin-top: 30px;
    }
    &.disable{
      .title, .desc, .use-time{
        color: #939399 !important;
      }
    }
    .use-flag-img{
      position: absolute;
      right: 0;
      width: 147px;
      height: 129px;
      bottom: -10px;
    }
    .used{
      background: url('../../assets/images/my/coupon_used.png') no-repeat center center;
      background-size: cover;
    }
    .expired{
      background: url('../../assets/images/my/coupon_expired.png') no-repeat center center;
      background-size: cover;
    }
  }
}
</style>