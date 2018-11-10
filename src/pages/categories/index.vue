<template>
  <div>
    <headers></headers>
    <div class="category-search">
      <div class="category-wrapper">
      <div class="filter-list">
        <p class="current-cate"><span v-for="(item, index) in navs">{{item}}<i class="aicon" v-if="index < navs.length - 1">/</i></span></p>
        <p class="filter-title">FILTER</p>
        <div class="filter">
          <p class="title">Price Range</p>
          <div class="content">
            <span class="unit">$ </span><input class="input-price" v-model="params.minprice" type="text" placeholder="min"> <span class="line"></span> <input  v-model="params.maxprice"   class="input-price" type="text" placeholder="max">
            <span class="set" @click="getProductsList">SET</span>
          </div>
        </div>
      </div>
      <div class="result-content">
        <div class="total">
          <p class="fl title"> {{searchTitle}} ( {{total_goods}} Results )<p>
          <div class="sort fr">
            <div class="fl" style="margin-right: 10px">SORT BY</div>
            <dselect :border="true" placeholder="" :options="searchOptions" :value.sync="params.sort"></dselect>
          </div>
        </div>
        <ul class="goods-list">
          <li v-for="(item, index) in dataSearch" :style="{'margin-right': (index + 1) % 4 === 0 ? '0px' : '20px'}">
            <router-link :to="{path: '/detail?id=' + item.id + '&from=' + encodeURIComponent('categories/search?name=' + $route.params.name)}">
              <img class="img" :src="item.img && item.img.ossimg()">
              <p class="title">{{item.name}}</p>
               <p class="price">${{item.price}}<span class="prom-price">${{item.origin_price}}</span></p>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      params: {
        page: 1,
        minprice: '',
        maxprice: '',
        cate: '',
        title: '',
        sort: ''
      },
      navs: [],
      loadingContent: '',
      isFinishedLoading: true,
      loadingEmpty: false,
      dataSearch: [],
      searchTitle: '',
      total_goods: '',
      searchOptions: [
        {
          label: 'Best Match',
          id: ''
        },
        {
          label: 'Best Selling',
          id: 'sales'
        },
        {
          label: 'Newest',
          id: 'new'
        },
        {
          label: 'Price: High to Low',
          id: 'price-d'
        },
        {
          label: 'Price: Low to High',
          id: 'price-a'
        }
      ],
      filterShow: false
    }
  },
  mounted() {
    this.title = this.$route.query.title || '';
    this.params.title = this.title ? encodeURIComponent(this.title) : '';
    this.params.cate = this.$route.query.cate  || '';
    this.getProductsList();
    this.loadMore();
  },
  watch: {
    '$route.query': function(val) {
      this.params.cate = this.$route.query.cate
      this.params.title = this.$route.query.title
      this.params.page = 1;
      this.params.minprice =  '';
      this.params.maxprice =  '';
      this.getProductsList();
    }
  },
  methods: {
    // 获取商品列表信息
    getProductsList () {
      // 初始化
      this.loadingContent = 'Loading...';
      this.isFinishedLoading = false;
      this.loadingEmpty = false;
      if (this.params.page === 1) {
        this.dataSearch = [];
      }
      // 发送请求
      console.log("methods query id",this.params.cate)
      this.request('ProductsList', this.params).then((res) => {
        if (res.status === 200 && res.content) {
          this.navs = res.content.nav;
          this.searchTitle = res.content.title;
          this.total_goods = res.content.total_goods;
          this.loadingContent = '';
          // this.isShowSearchHistory = false; // 隐藏搜索历史
          // option.title && this.getHistory(option.title); // 记录搜索历史
          // 滚动加载
          if (this.params.page < res.content.total_page) {
            this.loadingEmpty = false;
          } else {
            this.loadingContent = 'No More';
            this.loadingEmpty = true;
          }
          // 数据处理
          this.dataSearch = this.dataSearch.concat(res.content.goods);
        } else {
          this.loadingEmpty = true;
          this.loadingContent = 'No More';
        }
        this.isFinishedLoading = true;
      }, err => {
        // this.dataSearch = [];
        this.$Message({
          title: 'err',
          type: 'error'
        });
        this.isFinishedLoading = true;
      });
    },
    // 加载更多
    loadMore () {
      let self = this;
      window.onscroll = function () {
        var a = document.documentElement.scrollTop || document.body.scrollTop; // 滚动条y轴上的距离
        var b = document.documentElement.clientHeight || document.body.clientHeight; // 可视区域的高度
        var c = document.documentElement.scrollHeight || document.body.scrollHeight; // 可视化的高度与溢出的距离（总高度）
        if (a + b >= c - 200 && self.isFinishedLoading && !self.loadingEmpty) {
          self.params.page = self.params.page + 1
          self.getProductsList();
        }
      }
    },
    // 筛选
    getFilter(item) {
      this.params.sort = item.sort;
      this.getProductsList();
    }
  }
}
</script>
<style lang="less">
@import '~less/tool.less';
html,body{
  padding:0;
  margin:0;
  background: #fff;
}
.category-search{
  position: relative;
  background-color: #fff;
  padding-top: 24px;
  min-height: 500px;
  .category-wrapper {
    margin:0 auto;
    width: 1240px;
    height:100%;
    position: relative;
    // border: 1px solid red;
  .filter-list{
    position: absolute;
    left: 0px;;
    width: 250px;
    display: inline-block;
    .current-cate{
      color: @gray;
      font-size: 12px;
      margin-bottom: 23px;
      .aicon{
        display: inline-block;
        margin: 0 5px;
        color: #000;
        font-size: 10px;
        font-weight: bold
      }
    }
    .filter-title{
      color: #000000;
      margin-bottom: 30px;
      font-weight: bold
    }
    .filter{
      .title{
        color: #000000;
        margin-bottom: 16px;
        font-weight: bold
      }
      .input-price{
        width: 60px;
        height: 30px;
        border:1px solid @bgray;
        padding: 0 8px;
      }
      .set{
        display: inline-block;
        width: 60px;
        height: 25px;
        font-size: 12px;
        line-height: 25px;
        border:1px solid @orange;
        color: @orange;
        text-align: center;
        border-radius:4px;
        margin-left: 20px;
        cursor: pointer;
      }
      .unit{
        font-weight: bold;
        font-size: 12px;
      }
      .line{
        display: inline-block;
        background-color: @gray;
        width: 10px;
        height: 1px;
      }
    }
  }
  .result-content{
    display: inline-block;
    margin-left: 260px;
    width: 980px;
    // border: 1px solid black;
    .total{
      .clearfix;
      .title{
        width: 40%;
        font-weight: bold;
        color: #000;
        font-size: 18px;
        margin-bottom: 30px;
      }
    }
    .sort{
      height: 40px;
      line-height: 40px;
      cursor: pointer;
      margin-top: -5px;
    }
    .goods-list{
      li{
        float: left;
        height: 320px;
        list-style: none;
      }
      img{
        width: 227px;
        height: 227px;
      }
      .price{
        color: @red;
        width: 100%;
        text-align: left
      }
      .prom-price{
        color: #939399;
        margin-left: 10px;
        text-decoration: line-through;
      }
      .title{
        height: 48px;
        width: 220px;
        padding: 10px 0;
        color: #000000;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-align: left;
        font-size: 14px;
        line-height: 18px;
      }
    }
  }
  }
}
</style>


