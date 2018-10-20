<template>
  <div class="my-account">
    <div class="account-header clearfix">
      <div class="account-profile fl">
        <img src="../../assets/images/my/head.png"  class="avator fl" alt="">
        <div class="fl">
          <p class="name">name</p>
          <p class="edit"><i class="iconfont">&#xe621;</i>Edit</p>
        </div>
      </div>
      <div class="account-balance fl">
         <div class="total fl">
           <div class="icon"><i class="iconfont">&#xe655;</i></div>
           <p class="balance">balance</p>
           <p class="price">$100</p>
         </div>
         <div class="balance-list fl">
           <div class="balance-list-item clearfix">
             <i class="iconfont fl">&#xe695;</i>
             <div class="fl detail">
               <p class="balance-list-title">Accumulated Income</p>
               <p class="balance-list-price">$100</p>
             </div>
           </div>
           <div class="balance-list-item clearfix">
             <i class="iconfont fl">&#xe694;</i>
             <div class="fl detail">
               <p class="balance-list-title">Wait for an account</p>
               <p class="balance-list-price">$100</p>
             </div>
           </div>
           <div class="balance-list-item clearfix">
             <i class="iconfont fl">&#xe697;</i>
             <div class="fl detail">
               <p class="balance-list-title">My fans</p>
               <p class="balance-list-price">100</p>
             </div>
           </div>
         </div>
      </div>
    </div>
    <div class="account-content clearfix">
      <div class="account-content-item">
        <p class="account-content-title">My Points</p>
        <div class="account-content-detail">Availabale: <span style="color: #FF473C">200</span> Points</div>
      </div>
      <div class="account-content-item">
        <p class="account-content-title">My Coupons</p>
        <div class="account-content-detail">Coupons : <span style="color: #FF473C">200</span></div>
      </div>
      <div class="account-content-item">
        <p class="account-content-title">My Orders</p>
        <div class="account-content-detail" style="text-align: center"><div class="fl">Unpaid: <span style="color: #FF473C">200</span></div> Shipping: <span style="color: #FF473C">12</span> <div class="fr">Unpaid: <span style="color: #FF473C">200</span></div></div>
      </div>
      <div class="account-content-item">
        <p class="account-content-title">History View</p>
        <div class="account-content-detail">Availabale: <span style="color: #FF473C">200</span> Points</div>
      </div>
      <div class="account-content-item">
        <p class="account-content-title">History View</p>
        <div class="account-content-detail">Manage your shipping information.</div>
      </div>
     
    </div>
  </div>

</template>
<script>
export default {
  
}
</script>
<style lang="less">
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
        .icon{
          width: 52px;
          height: 52px;
          background: #FF473C;
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
          i {
            font-size: 24px;
            color: #E9484F;
            line-height: 46px;
          }
          .balance-list-title{
            color: #939399;
            font-size: 14px;
            margin-bottom: 6px;
          }
          .balance-list-price {
            font-size: 16px;
            color: #FF473C;
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
      line-height: 64px;
      color: #131313;
      font-size: 20px;
      text-align: left;
      padding: 0 20px;
    }
  }
}
</style>


