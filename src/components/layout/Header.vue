<template>
  <div id="c-header">
    <topbar></topbar>
    <div class="header-content">
      <logo class="fl"></logo>
      <div class="search">
        <i class="iconfont fl s-icon-a">&#xe620;</i>
        <input type="text" placeholder="Search" class="search-input">
        <div class="search-a"><i class="iconfont">&#xe620;</i></div>
      </div>
      <div class="cart"><i class="iconfont fl">&#xe624;</i>CART</div>
    </div>
    <navgation></navgation>
  </div>
</template>
<script>
import topbar from './Topbar';
import logo from './Logo';
import navgation from './Nav';
export default {
  components: {
    topbar,
    logo,
    navgation
  }
};
</script>
<style lang="less">
#c-header{
  width: 100%;
  background: #fff;
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
      border:2px solid rgba(221,59,55,1);
      border-radius:23px;
      margin-left: 392px;
      margin-top: 10px;
      .search-a{
        width: 70px;
        height: 45px;
        position: absolute;
        right: 0;
        top: -2px;
        background:linear-gradient(90deg,rgba(219,58,54,1),rgba(250,89,110,1));
        border:2px solid rgba(221,59,55,1);
        border-radius:23px;
        color: #fff;
      }
      .s-icon-a{
        font-size: 16px;
        line-height: 45px;
        margin: 0 12px;
      }
      .search-input{
        width:460px;
        height: 40px;
        background: transparent;
        float: left;
      }
    }
    .cart{
      position: absolute;
      top: 38px;
      right: 20px;
      height: 45px;
      width: 128px;
      border:2px solid rgba(221,59,55,1);
      line-height: 45px;
      border-radius:23px;
      i{
        font-size: 27px;
        color: #F25260;
        font-weight: bold;
        margin-left: 20px;
      }
      color: #000000;
    }
  }
}
</style>
