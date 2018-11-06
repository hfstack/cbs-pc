<template>
  <div id="c-header">
    <topbar></topbar>
    <div class="header-content">
      <logo class="fl"></logo>
      <div class="search" v-show="!isCart">
        <i class="iconfont fl s-icon-a">&#xe620;</i>
        <input type="text" placeholder="Search" class="search-input" v-model="search" @blur="searchBlur" @click="searchFocus" @focus="searchFocus">
        <div class="search-a"  @click="searchClick()"><i class="iconfont">&#xe620;</i></div>
        <ul class="search-list" v-show="historyShow && history.length"  @mousemove="historyShow = true"  @mouseout="historyShow = false">
          <li class="recent-search">Recent Search</li>
          <li class="search-item" @click="searchClick(item)" v-for="(item, index) in history">{{item}}
            <span class="close" @click.stop="clearHistory(index)"><i class="iconfont">&#xe63f;</i> Clear</span>
            </li>
        </ul>
      </div>
      <div class="cart" @mousemove="mousemoveCart" @mouseout="mouseoutCart" v-show="!isCart">
        <i class="iconfont fl">&#xe624;</i>
        <span class="fb">CART</span>
        <div class="pos-rel">
          <cartmodal :show="isShowCart"></cartmodal>
        </div>
      </div>
      <div class="is-cart" v-show="isCart">
        <div class="cart-icon fl mr">
          <i class="iconfont fl">&#xe67b;</i>
          <p>Highest Quality Guarantee</p>
        </div>
        <div class="cart-icon fl">
          <i class="iconfont">&#xe601;</i>
          <p>100% Secured Payments</p>
        </div>
      </div>
    </div>
    <navgation v-show="!isCart"></navgation>
  </div>
</template>
<script>
import topbar from './Topbar';
import logo from './Logo';
import navgation from './Nav';
import cartmodal from './CartModal';
export default {
   props: {
    isCart: {
      type: Boolean,
      default: false
    },
    cartshow: {
      type: Boolean,
      default: false
    }
  },
  components: {
    topbar,
    logo,
    navgation,
    cartmodal
  },
  data () {
    return {
      isShowCart: false,
      search: '',
      history: [],
      historyShow: false
    }
  },
  watch: {
    cartshow: function(val) {
      this.isShowCart = val
    }
  },
  mounted() {
    let history = localStorage.getItem('searchHistory')
    if(history) {
      this.history = JSON.parse(history);
    }
  },
  methods: {
    searchBlur() {
      setTimeout(() => {
        this.historyShow = false
      }, 200)
    },
    mousemoveCart () {
      this.isShowCart = true;
    },
    mouseoutCart () {
      this.isShowCart = false;
    },
    searchClick (keywords) {
      if(keywords) {
        this.search = keywords;
      }
      if(!this.search) {
        return false;
      }
      this.history.unshift(this.search);
      this.history = Array.from(new Set(this.history));
      this.history.length > 6 && this.history.splice(6);
      localStorage.setItem('searchHistory', JSON.stringify(this.history))
      this.historyShow = false;
      this.$router.push({
        path: '/category/search',
        query: {
          title: this.search
        }
      })
    },
    searchFocus () {
     this.historyShow = true;
    },
    clearHistory (index) {
      this.history.splice(index, 1);
      localStorage.setItem('searchHistory', JSON.stringify(this.history));
    }
  }
};
</script>
<style lang="less">
@import '~less/tool';
#c-header{
  width: 100%;
  background: #fff;
  border-bottom: 1px solid @bgray;
  .header-content {
    width: 1240px;
    height: 120px;
    padding: 22px 0;
    margin: 0 auto;
    position: relative;
    .search{
      position: relative;
      width: 580px;
      height: 45px;
      line-height: 45px;
      font-size: 16px;
      border:2px solid @orange;
      border-radius:23px;
      margin-left: 392px;
      margin-top: 10px;
      .search-a{
        cursor: pointer;
        width: 70px;
        height: 45px;
        position: absolute;
        right: 0;
        top: -2px;
        // background:linear-gradient(90deg,rgba(249,108,23,1),rgba(254,165,111,1));
        background-color: @orange;
        border-radius:23px;
        color: #fff;
        text-align: center;
        i {
          font-size: 22px;
          font-weight: bold;
        }
      }
      .s-icon-a{
        font-size: 16px;
        line-height: 42px;
        margin: 0 12px;
        color: #B5B5B5;
      }
      .search-input{
        width:460px;
        height: 40px;
        background: transparent;
        float: left;
      }
      .search-list{
        position: absolute;
        top: 44px;
        left: 15px;
        width: 550px;
        border:1px solid rgba(225,225,225,1);
        padding: 20px;
        z-index: 222;
        background: #fff;
        li{
          padding-left: 10px;
          padding-top: 20px;
          line-height: 14px;
          color: #222222;
          position: relative;
          font-weight: bold;
          font-size: 12px;
          cursor: pointer;
          .close{
            position: absolute;
            right: 0;
            bottom: 0;
            color: #939399;
            cursor: pointer;
            font-size: 12px;
          }
          i{
            font-size: 12px;
          }
        }
        .recent-search{
          font-size:14px;
          font-weight: bold;
          margin-top: 0;
        }
      }
    }
    .cart{
      position: absolute;
      top: 32px;
      right: 20px;
      .wh(128, 45);
      line-height: 43px;
      border: 2px solid @orange;
      border-radius: 25px;
      .fb {
        font-weight: bold;
      }
      i {
        font-size: 23px;
        color: @orange;
        font-weight: bold;
        margin-left: 17px;
        margin-right: 6px;
      }
      .pos-rel {
        position: relative;
        right: 77px;
        top: -44px;
        width: 200px;
        height: 80px;
        cursor: pointer;
      }
    }
    .is-cart {
      position: absolute;
      top: 35px;
      right: 0;
      width: 380px;
      .clearfix();
      .cart-icon {
        width: 165px;
        position: relative;
        i {
          position: absolute;
          left: 0;
          top: 0;
          display: inline-block;
          .whl(50, 50);
          background-color:rgba(215,215,215,1);
          border-radius:50%;
          color: #fff;
          font-size: 30px;
          vertical-align: middle;
          text-align: center;
        }
        p {
          margin-top: 5px;
          margin-left: 60px;
          width: 98px;
          line-height: 20px;
          color: #444;
        }
      }
      .mr {
        margin-right: 50px;
      }
    }
  }
}
</style>
