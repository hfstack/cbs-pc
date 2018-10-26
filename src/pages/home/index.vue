<template>
  <div class="home-index">
    <div class="top-bar">
      <i class="iconfont search-icon fl" @click="goToSearch">&#xe620;</i>
      <img src="~img/home/logo.png" class="logo" alt="">
      <i class="share iconfont fr">&#xe628;</i>
    </div>
    <Banner :list="banners"></Banner>
    <Navs :list="navList"  v-if="navList && navList.length"></Navs>
    <div class="belt" v-html="diypage" v-if="diypage">
    </div>
    <div class="home-recommend">
      <p class="home-recommend-title">Recommended</p>
      <ul class="home-recommend-goods clearfix">
        <li class="recommend-goods" v-for="item in recommends">
          <router-link :to="{path: '/detail?id=' + item.id}">
            <img :src="item.img && item.img.ossimg()" class="goods-img" alt="">
            <p class="goods-title">{{item.name}}</p>
            <p class="goods-price">
              <span class="price-now">${{item.price}}</span>
              <!-- <span class="price-origin">$102</span> -->
              <!-- <span class="price-rebate">$102</span> -->
            </p>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import Banner from './Banner';
import Navs from './Navs'
export default {
  data() {
    return {
      banners: [],
      recommends: [],
      navList: [],
      diypage: ''
    }
  },
  components: {
    Banner,
    Navs
  },
  mounted() {
    this.getHomeData();
  },
  methods: {
    getHomeData () {
      this.request('Home', {}).then((res) => {
        if (res.status === 200 && res.content) {
          this.navList = res.content.icons;
          this.banners = res.content.banners;
          this.recommends = res.content.goods;
          this.diypage = res.content.diypage;
        }
      }, err => {
        this.$Toast(err);
      });
    },
    // 去搜索
    goToSearch () {
      this.$router.push({
        name: 'search'
      })
    }
  }
}
</script>
<style lang="less">
@import '~less/tool.less';
.home-index{
  margin-bottom: 100/@rem;
  .top-bar{
    height: 88/@rem;
    padding: 0 20/@rem;
    background-color: #fff;
    line-height: 88/@rem;
    text-align: center;
    background-color: #fff;
    .search-icon{
      font-size: 40/@rem;
    }
    .logo{
      width: 268/@rem;
      height: 50/@rem;
      margin-top: 19/@rem;
    }
  }
  .belt{
    margin-top: 20/@rem;
  }
  .home-recommend{
    margin-top: 20/@rem;
    background-color: #fff;
    .home-recommend-title{
      height: 146/@rem;
      font-size: 36/@rem;
      color: #000000;
      line-height: 146/@rem;
      text-align: center;
    }
    .recommend-goods{
      height: 515/@rem;
      float: left;
      margin-right: 20/@rem;
      &:nth-child(even) {
        margin-right: 0;
      }
      .goods-img{
        width: 365/@rem;
        height: 365/@rem;
        display: block;
      }
      .goods-title{
        margin: 0 auto;
        width: 310/@rem;
        font-weight: bold;
        font-size: 24/@rem;
        color: #000;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        margin-top: 30/@rem;
      }
      .goods-price {
        text-align: center;
        margin-top: 20/@rem;
      }
      .price-now{
        color: #FF473C;
        font-size: 28/@rem;
        margin-right: 5/@rem;
      }
      .price-origin{
        color: #DDDCDC;
        font-size: 20/@rem;
        vertical-align: text-bottom;
        text-decoration: line-through;
      }
      .price-rebate{
        background-color: #FF473C;
        height: 32/@rem;
        line-height: 40/@rem;
        color: #fff;
        padding: 0 10/@rem;
        margin-left: 20/@rem;
      }
    }
  }
}
</style>


