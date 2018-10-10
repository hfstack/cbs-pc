<template>
  <div class="my-card-main">
    <router-link :to="{path: '/my/finance'}" class="card-detail clearfix">
      <div class="img fl">
        <i class="iconfont">&#xe655;</i>
      </div>
      <div class="info fl clearfix">
        <div class="label fl">Balance: </div>
        <div class="price fl">${{data.money}}</div>
      </div>
    </router-link>
    <ul class="card-info clearfix">
      <li>
        <router-link :to="{path: '/my/income?type=1'}">
          <i class="iconfont">&#xe695;</i>
          <div class="value">{{data.income}}</div>
          <p>Accumulated Income</p>
        </router-link>
      </li>
      <li>
         <router-link :to="{path: '/my/income?type=2'}">
          <i class="iconfont">&#xe694;</i>
          <div class="value">{{data.wait_account}}</div>
          <p>Wait for an account</p>
        </router-link>
      </li>
      <li>
         <router-link :to="{path: '/my/fans'}">
          <i class="iconfont">&#xe697;</i>
          <div class="value">{{data.funs}}</div>
          <p>My fans</p>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data () {
    return {
    }
  },
  created () {
    // this.$store.dispatch('setTopbarTitle', '店铺上新');
  }
};
</script>

<style lang="less">
.my-card-main {
  margin: 0 auto;
  width: 910px;
  background-color: #fff;
  .card-detail {
    position: relative;
    display: block;
    width: 710px;
    height: 175px;
    .img {
      margin-left: 30px;
      margin-top: 50px;
      width: 85px;
      height: 85px;
      text-align: center;
      border-radius: 50%;
      background-color: #ff473c;
      i {
        display: inline-block;
        color: #fff;
        font-size: 50px;
        margin-top: 14px;
      }
    }
    .info {
      margin-top: 55px;
      height: 85px;

      .label {
        margin-left: 20px;
        line-height: 85px;
        font-weight: bold;
        vertical-align: bottom;
      }
      .price {
        margin-top: 9px;
        margin-left: 15px;
        color: #FF473C;
        font-size: 40px;
      }
    }
    // .btn, .iright {
    //   position: absolute;
    //   color: @gray2;
    // }
    .btn {
      height: 30px;
      top: 75px;
      right: 80px;
    }
    .iright {
      height: 40px;
      top: 70px;
      right: 30px;
    }
  }
  .card-line {
    width: 680px;
    height: 10px;
    margin: 0 15px;
    border-bottom: 1px solid rgba(225, 225, 225, 0.6);
  }
  .card-info {
    display: block;
    width: 100%;
    height: 185px;
    li {
      float: left;
      width: 33.3%;
      a {
        display: block;
        text-align: center;
        margin-top: 25px;
      }
      i {
        display: inline-block;
        color: #ff696d;
        font-size: 42px;
      }
      .value {
        color: #ff696d;
        font-size: 30px;
      }
      p {
        color: #939399;
        text-align: center;
        line-height: 30px;
      }
    }
  }
}
</style>
