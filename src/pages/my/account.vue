<template>
  <div class="my-account">
    <div class="account-header clearfix">
      <div class="account-profile fl">
        <img :src="info.img"  class="avator fl" alt="">
        <div class="fl">
          <p class="name">{{info.username}}</p>
          <p class="edit" @click="editPorfile"><i class="iconfont">&#xe621;</i>Edit</p>
        </div>
      </div>
      <div class="account-balance fl">
         <div class="total fl" @click="getBalance('balance')">
           <div class="icon"><i class="iconfont">&#xe655;</i></div>
           <p class="balance">balance</p>
           <p class="price">${{info.money}}</p>
         </div>
         <div class="balance-list fl">
           <div class="balance-list-item clearfix">
             <i class="iconfont fl">&#xe695;</i>
             <div class="fl detail" @click="getBalance('incomes')">
               <p class="balance-list-title">Accumulated Income</p>
               <p class="balance-list-price">${{info.income}}</p>
             </div>
           </div>
           <div class="balance-list-item clearfix">
             <i class="iconfont fl">&#xe694;</i>
             <div class="fl detail" @click="getBalance('wait')">
               <p class="balance-list-title">Wait for an account</p>
               <p class="balance-list-price">${{info.wait_account}}</p>
             </div>
           </div>
           <div class="balance-list-item clearfix">
             <i class="iconfont fl">&#xe697;</i>
             <div class="fl detail" @click="getBalance('fans')">
               <p class="balance-list-title">My fans</p>
               <p class="balance-list-price">{{info.fans}}</p>
             </div>
           </div>
         </div>
      </div>
    </div>
    <div class="account-content clearfix">
      <div class="account-content-item" @click="navchange('myPoints')">
        <p class="account-content-title">My Points</p>
        <div class="account-content-detail points">Availabale: <span style="color: #FF473C">{{info.integral}}</span> Points</div>
      </div>
      <div class="account-content-item" @click="navchange('myCoupons')">
        <p class="account-content-title">My Coupons</p>
        <div class="account-content-detail">Coupons : <span style="color: #FF473C">{{info.card}}</span></div>
      </div>
      <div class="account-content-item" @click="navchange('myOrders')">
        <p class="account-content-title">My Orders</p>
        <div class="account-content-detail" style="text-align: center"><div class="fl">Unpaid: <span style="color: #FF473C">{{info.order_unpay}}</span></div> Shipping: <span style="color: #FF473C">{{info.order_ship}}</span> <div class="fr">All: <span style="color: #FF473C">{{info.order_all}}</span></div></div>
      </div>
      <div class="account-content-item" @click="navchange('historyView')">
        <p class="account-content-title">History View</p>
        <div class="account-content-detail">Availabale: <span style="color: #FF473C">0</span> Points</div>
      </div>
      <div class="account-content-item" @click="navchange('addressBook')">
        <p class="account-content-title">Address Book</p>
        <div class="account-content-detail">Manage your shipping information.</div>
      </div>
     
    </div>
  </div>

</template>
<script>
export default {
  data() {
    return {
      info: {}
    }
  },
  mounted() {
    this.getPersonalIndex()
  },
  methods: {
    editPorfile() {
      this.$router.push({
        name: 'profile'
      })
    },
    navchange(name) {
      this.$router.push({
        name: name
      })
    },
    getBalance(type) {
      this.$router.push({
        name: 'myBalance',
        type: type
      })
    },
    getPersonalIndex() {
       this.request('PCPersonalIndex').then((res) => {
        if (res.status === 200) {
          this.info = res.content || {};
        } else {
          this.$Messagebox({
            title: res.msg || '',
            type: 'error'
          });
        }
      }, err => {
        this.$Messagebox({
          title: err.data.msg || '',
          type: 'error'
        });
      });
    }
  }
}
</script>
<style lang="less">
@import '~less/tool.less';

.my-account {
  .account-header{
    padding: 10px 0;
    border-bottom: 1px solid #E1E1E1;
    .account-profile{
      display: inline-block;
      width: 430px;
      height: 220px;
      padding-left: 46px;
      padding-top: 60px;
      margin-right: 20px;
      .avator{
        width: 100px;
        height: 100px;
        background: #F6F6F6;
        border-radius: 50%;
      }
      .name{
        font-size: 18px;
        color: #222222;
        margin: 24px 0 20px 28px;
        font-weight: bold;
      }
      .edit{
        margin-left: 28px;
        color: #939399;
        font-size: 16px;
        cursor: pointer;
        i{
          font-size: 20px;
          margin-right: 5px;
        }
      }
    }
    .account-balance {
      display: inline-block;
      width: 430px;
      height: 220px;
      background: #F7F9FA;
      padding: 14px 0;
      .total{
        width: 150px;
        height: 100%;
        border-right: 1px solid #E1E1E1;
        text-align: center;
        cursor: pointer;
        .icon{
          width: 52px;
          height: 52px;
          background:@orange;
          border-radius: 50%;
          margin: 0 auto;
          margin-top: 50px;
          i{
            font-size: 30px;
            line-height: 52px;
            color: #fff;
          }
        }
        .balance{
          font-size: 14px;
          color: #141414;
          margin: 10px auto;
        }
        .price{
          color: #E9484F;
          font-size: 20px;
        }
        
      }
      .balance-list{
        padding-left: 20px;
        padding-top: 20px;
        .balance-list-item{
          text-align: left;
          margin-bottom: 15px;
          cursor: pointer;
          i {
            font-size: 24px;
            color: @orange;
            line-height: 46px;
          }
          .balance-list-title{
            color: @gray;
            font-size: 14px;
            margin-bottom: 6px;
          }
          .balance-list-price {
            font-size: 16px;
            color: @orange;
          }
        }
        .detail {
          margin-left: 15px;
        }
      }
    }
  }
  .account-content{
    padding-top: 20px;
    .account-content-item{
      width: 445px;
      float: left;
      margin-right: 20px;
      &:nth-child(even) {
        margin-right: 0;
      }
      .points{
        text-decoration: underline;
        color: #131313
      }
    }
    .account-content-title{
      width: 445px;
      height: 45px;
      line-height: 45px;
      text-align: center;
      color: #000000;
      font-weight: bold;
      background: #F3F3F3;
      font-size: 16px;
    }
    .account-content-detail{
      height: 64px;
      padding: 20px;
      color: #131313;
      font-size: 20px;
      text-align: left;
      cursor: pointer;
    }
  }
}
</style>


