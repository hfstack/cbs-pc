<template>
  <div class="search-main">
    <div class="global-topbar">
      <div class="global-center search-bar">
        <a href="javascript:;" @click="$router.go(-1)">
          <i class="iconfont fl back-url">&#xe62f;</i>
        </a>
        <form action="" class="input fl">
          <i class="iconfont">&#xe66e;</i>
          <input ref="inputSearchRef" class="w660 t3s J_searchInput" v-model="serachTitle" type="text" name="search" placeholder="What are you looking for?" @focus="inputFocus" @blur="inputBlur">
        </form>
        <div class="btn-search" @click="clickSearchResult">Search</div>
      </div>
    </div>
    <!-- 热门关键词 -->
    <div class="search-history" v-show="dataSearch.length === 0">
      <div v-show="historyArr.length" class="label gray2">History</div>
      <ul v-show="historyArr.length">
        <li v-for="item in historyArr" @click="getProductsList({title: item, page: 1})"><a href="javascript:;">{{item}}</a></li>
      </ul>
      <div class="label gray2">Hot Search</div>
      <ul>
        <li v-for="item in hotArr" :class="{'hot': item.hot}" @click="getProductsList({cate: item.cate, page: 1})">
          <a href="javascript:;">{{item.name}}</a>
        </li>
      </ul>
    </div>
    <!-- 搜索结果 -->
    <div class="search-sort-pos" v-show="dataSearch.length">
      <div class="global-center search-sort">
        <div class="sort" @click="clickConditions('sort')" :class="{'cur': conditionsName === 'sort', 'show-sort-con': isShowSortCon}">
          <i class="iconfont i1">&#xe615;</i>
          <span>Sort</span>
          <i class="iconfont i2 t3s">&#xe60d;</i>
          <!-- sort内容 -->
          <ul class="sort-con a-fadeinTX">
            <li v-for="(item, index) in sortArr" :class="{'cur': clickSortIndex === index}" @click="clickSort(index, item)">
              <router-link :to="{path: '/categories/search?name' + item.name}">
                <p>{{item.name}}</p>
                <i class="iconfont">&#xe625;</i>
              </router-link>
            </li>
          </ul>
        </div>
        <div class="sort" @click="clickConditions('filter')" :class="{'cur': conditionsName === 'filter'}">
          <i class="iconfont i3">&#xe64e;</i>
          <span>Filter</span>
          <i class="iconfont i2 t3s">&#xe60d;</i>
        </div>
      </div>
    </div>

    <div class="filter-con a-fadeinR" v-show="isShowFilterCon">
      <div class="filter-title">
        <i class="iconfont" @click="closeFilter">&#xe63f;</i>
        <p>Filter</p>
      </div>
      <ul class="filter-detail">
        <li>
          <div class="label mt">Price</div>
          <input type="text" placeholder="Min" v-model="filterParams.minPrice">
          <div class="line"></div>
          <input type="text" class="input-max" placeholder="Max" v-model="filterParams.maxPrice">
        </li>
        <!-- <li>
          <div class="lable">
            <p>Size</p>
            <i class="iconfont">&#xe611;</i>
            <div class="filter-value">
              <div class="fl">
                <div class="value">S<i class="iconfont">&#xe625;</i></div>
              </div>
              <div class="fl">
                <div class="value">M<i class="iconfont">&#xe625;</i></div>
              </div>
              <div class="fl">
                <div class="value">L<i class="iconfont">&#xe625;</i></div>
              </div>
              <div class="fl">
                <div class="value">XL<i class="iconfont">&#xe625;</i></div>
              </div>
            </div>
          </div>
        </li>
        <li></li> -->
      </ul>
      <div class="filter-btn">
        <div class="btn-reset fl" @click="filterReset">RESET</div>
        <div class="btn-apply fl" @click="filterApply">APPLY</div>
      </div>
    </div>
    <div class="search-mask" v-show="isShowSearchMask"></div>
    <div class="bg-mask" :class="{'show': isShowFilterCon}"></div>

    <div class="search-con" v-show="dataSearch.length">
      <ul>
        <li v-for="item in dataSearch">
          <router-link :to="{path: '/detail?id=' + item.id + '&from=' + encodeURIComponent('categories/search?name=' + $route.params.name)}">
            <img v-lazy="item.img && item.img.ossimg()">
            <p class="p1">{{item.name}}</p>
            <p class="p2">${{item.price}}</p>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="loading" v-show="dataSearch.length">{{loadingContent}}</div>

    <FloatMenu></FloatMenu>

    <div class="search-empty" v-show="!dataSearch.length">
      <img src="~img/categories/no_match.png">
      <p class="gray2">No Match Results</p>
    </div>
  </div>
</template>

<script>
import FloatMenu from 'common/FloatMenu';
export default {
  components: {
    FloatMenu
  },
  data () {
    return {
      serachTitle: '', // 关键词
      dataSearch: [], // 搜索内容
      filterParams: {}, // 过滤条件
      historyArr: localStorage.getItem('cbs_history') && localStorage.getItem('cbs_history').split(',') || [],
      isShowSearchHistory: true, // 搜索历史
      conditionsName: 'sort', // 条件
      clickSortIndex: 0, // 排序搜索条件
      isFinishedLoading: false, // 是否完成loading
      isShowSearchMask: false, // 搜索蒙层
      isShowSortCon: false, // 显示sort内容
      isShowFilterCon: false, // 显示filter内容
      loadingContent: '', // 加载提示
      searchParams: { // 搜索的参数
        cate: '',
        title: '', // 搜索内容
        sort: '',
        page: 1
      },
      hotwords: [],
      sortArr: [
        {
          name: 'Best Match',
          sort: ''
        },
        {
          name: 'Best Selling',
          sort: 'sales'
        },
        {
          name: 'Newest',
          sort: 'new'
        },
        {
          name: 'Price: High to Low',
          sort: 'price-d'
        },
        {
          name: 'Price: Low to High',
          sort: 'price-a'
        }
      ],
      hotArr: []
    };
  },
  computed: {},
  created() {
    // let name = this.$route.query.name;
    // if (name !== 'fromcate' && name !== null && name !== '') { // 'fromcate'是从分类页面刚进来的name
    //   let cate = name.split('slcate_')[1];
    //   let obj = {
    //     title: name,
    //     page: 1
    //   };
    //   // 如果是分类页面点击类别过来的搜索条件是cate_cate_xxx
    //   if (cate) {
    //     obj = {
    //       cate,
    //       page: 1
    //     }
    //   }
    //   this.getProductsList(obj);
    // }
  },
  mounted () {
    if (this.$route.query.name === 'fromcate') {
      this.$refs.inputSearchRef.focus();
      this.isShowSearchMask = true;
    }
    const query = this.$route.query;
    let options = {
      cate: query.cate || '',
      title: query.title || ''
    };
    this.getProductsList(options);
    this.loadMore();
    this.getHotWords();
  },
  methods: {
    // 获取热门搜索词
    getHotWords () {
      this.request('SearchHotword', ).then((res) => {
        if(res.status === 200) {
          let hotArr = res.content.words || []
          if(hotArr.length) {
            hotArr.forEach((item) => {
              item.hot = false;
            })
            hotArr[0].hot = true;
          }
          this.hotArr = hotArr;
        } else {
          this.$Toast(res.msg)
        }
      })
    },
    // 获取商品列表信息
    getProductsList (option) {
      // 初始化
      this.loadingContent = 'Loading...';
      this.isFinishedLoading = false;
      this.loadingEmpty = false;
      if (option.page === 1) {
        this.dataSearch = [];
      }
      // 搜索条件
      this.searchParams = option;
      this.serachTitle = this.searchParams.title;
      // 发送请求
      this.request('ProductsList', {
        cate: option.cate || '',
        title: option.title && encodeURIComponent(option.title) || '', // 搜索内容
        sort: option.sort || '',
        minprice: option.minprice || '',
        maxprice: option.maxprice || '',
        page: option.page
      }).then((res) => {
        if (res.status === 200 && res.content) {
          this.loadingContent = '';
          this.isShowSearchHistory = false; // 隐藏搜索历史
          option.title && this.getHistory(option.title); // 记录搜索历史
          // 滚动加载
          if (option.page < res.content.total_page) {
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
        this.$Toast(err);
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
          let page = self.searchParams.page + 1;
          Object.assign(self.searchParams, {
            page: page
          });
          self.getProductsList(self.searchParams);
        }
      }
    },
    // 记录搜索历史 - 最多记录15个
    getHistory (title) {
      let cbsHistory = localStorage.getItem('cbs_history') || '';
      let arr = [];
      if (cbsHistory.length) {
        arr = cbsHistory.split(',');
      }
      // 数组去重
      let len = arr.length;
      for (let i = 0; i < len; i++) {
        if (arr[i] === title) {
          arr.splice(i, i + 1);
        }
      }
      // 数组前插入
      arr.unshift(title);
      // 最多记录15个
      arr.length > 15 && arr.splice(15, 16);
      localStorage.setItem('cbs_history', arr);
    },
    inputFocus () {
      this.isShowSearchMask = true;
      this.isShowSearchHistory = true;
    },
    inputBlur () {
      this.isShowSearchMask = false;
      this.isShowSearchHistory = false;
    },
    // 点击搜索按钮
    clickSearchResult () {
      let inputSearchRef = this.$refs.inputSearchRef;
      if (inputSearchRef.value.trim() === '') return;
      // input失去焦点
      inputSearchRef.blur();
      // 获取商品列表信息
      this.getProductsList({
        page: 1,
        title: this.serachTitle
      });
    },
    // 点击sort
    clickSort (index, item) {
      this.clickSortIndex = index;
      // 获取商品列表信息
      this.getProductsList({
        page: 1,
        sort: item.sort
      });
    },
    // 点击条件
    clickConditions (status) {
      this.conditionsName = status;
      if (status === 'sort') {
        this.isShowFilterCon = false;
        this.isShowSortCon = !this.isShowSortCon;
      }
      if (status === 'filter') {
        this.isShowSortCon = false;
        this.isShowFilterCon = !this.isShowFilterCon;
      }
    },
    closeFilter () {
      this.isShowFilterCon = false;
    },
    // 过滤条件 重置
    filterReset () {
      this.filterParams = {};
    },
    // 过滤
    filterApply () {
      this.isShowFilterCon = !this.isShowFilterCon;
      this.getProductsList({
        minprice: this.filterParams.minPrice,
        maxprice: this.filterParams.maxPrice,
        page: 1
      });

    }
  },
  beforeDestroy () {}
};
</script>

<style lang="less">
@import '~less/tool.less';
.search-main {
  padding: 180/@rem 0 90/@rem 0;
  height: 100%;
  font-size: 28/@rem;
  .search-bar {
    background-color: #fff;
    padding: 0 20/@rem;
    .height(90);
    .clearfix();
    .back-url {
      margin: 0 10/@rem 0 -5/@rem;
    }
    .input {
      position: relative;
      input {
        width: 550/@rem;
        height: 60/@rem;
        background-color: #EEF0EF;
        border-radius: 30/@rem;
        padding: 0 30/@rem 0 55/@rem;
      }
      i {
        position: absolute;
        top: 0;
        left: 18/@rem;
        color: @gray2;
        font-size: 28/@rem;
      }
    }
    .btn-search {
      position: absolute;
      top: 0;
      right: 20/@rem;
      width: 110/@rem;
      text-align: right;
      .height(88);
      font-size: 32/@rem;
    }
  }
  .search-history {
    display: block;
    position: fixed;
    z-index: 101;
    left: 0;
    top: 90/@rem;
    width: 750/@rem;
    height: auto;
    background-color: #fff;
    padding: 0 20/@rem 30/@rem 20/@rem;
    border-bottom: 1px solid @gray3;
    .label {
      .height(80);
    }
    ul {
      display: block;
      .clearfix();
      li {
        float: left;
        margin-right: 25/@rem;
        margin-bottom: 25/@rem;
        background-color: #F3F4F6;
        border-radius: 30/@rem;
        .height(56);
        a {
          padding: 0 30/@rem;
          display: block;
        }
        &.hot {
          background-color: #FEE4E7;
          a {
            color: @red;
          }
        }
      }
    }
  }
  .search-sort-pos {
    position: fixed;
    left: 0;
    top: 90/@rem;
    z-index: 99;
    width: 100%;
    height: 90/@rem;
  }
  .search-sort {
    position: relative;
    display: block;
    background-color: #FFF;
    border-bottom: 1px solid @gray3;
    .clearfix();
    .sort {
      position: relative;
      float: left;
      width: 50%;
      .height(40);
      margin: 25/@rem 0;
      text-align: center;
      color: @gray2;
      border-right: 1px solid #D3D3DB;
      &:nth-child(2) {
        border-right: 0;
      }
      &.cur {
        color: @red;
      }
      i {
        font-size: 32/@rem;
        vertical-align: middle;
      }
      .i1 {
        font-size: 28/@rem;
      }
      .i2 {
        display: inline-block;
        font-size: 36/@rem;
        margin-left: -5/@rem;
      }
      .i3 {
        font-size: 34/@rem;
      }
    }
    .sort-con {
      display: none;
      position: absolute;
      left: 0;
      top: 65/@rem;
      background-color: #fff;
      width: 750/@rem;
      height: 460/@rem;
      border-top: 1px solid @gray3;
      border-bottom: 1px solid @gray3;
      box-shadow: 0px 5px 10px 0px rgba(80, 80, 80, 0.1);
      li {
        position: relative;
        .height(90);
        color: #3d3d3d;
        text-align: center;
        a {
          display: block;
        }
        i {
          position: absolute;
          top: 0;
          right: 20/@rem;
          font-size: 36/@rem;
          display: none;
        }
        &.cur {
          a {
            color: @red;
          }
          i {
            color: @red;
            display: block;
          }
        }
      }
    }
    .show-sort-con {
      .sort-con {
        display: block;
      }
      .i2 {
        transform: rotate(180deg);
        -webkit-transform: rotate(180deg);
      }
    }
  }
  .search-con {
    display: block;
    background-color: #fff;
    .clearfix();
    li {
      .wh(365, 530);
      margin-right: 20/@rem;
      float: left;
      &:nth-child(2n) {
        margin-right: 0;
      }
      a {
        display: block;
      }
    }
    p {
      .line1();
      .height(50);
      text-align: center;
    }
    .p1 {
      margin-top: 30/@rem;
      padding: 0 10/@rem;
    }
    .p2 {
      color: @red;
    }
    img {
      display: block;
      .wh(365,365);
      background-size: 100% auto;
    }
  }
  .filter-con {
    position: fixed;
    z-index: 110;
    top: 0;
    right: 0;
    width: 650/@rem;
    height: 100%;
    background-color: #fff;
    .filter-title {
      padding-top: 38/@rem;
      border-bottom: 1px solid #d3d3db;
      p {
        font-size: 30/@rem;
        color: @red;
        .height(90);
        text-align: center;
      }
      i {
        position: absolute;
        left: 20/@rem;
        top: 60/@rem;
        font-size: 46/@rem;
      }
    }
    .filter-detail {
      display: block;
      padding: 20/@rem;
      li {
        position: relative;
        // border-bottom: 1px solid #d3d3db;
        .label {
          .height(60);
        }
        .mt {
          margin: 10/@rem 0 20/@rem 0;
        }
        input {
          .whl(260, 70);
          border: 1px solid @gray2;
          margin-bottom: 30/@rem;
          border-radius: 2px;
          padding: 0 10/@rem;
        }
        .input-max {
          margin-left: 70/@rem;
        }
        .line {
          position: absolute;
          top: 110/@rem;
          left: 270/@rem;
          height: 2px;
          width: 50/@rem;
          border-bottom: 1px solid @gray2;
        }

        i {
          position: absolute;
          top: 25/@rem;
          right: 20/@rem;
        }
        p {
          .height(90);
        }
      }
    }
    .filter-value {
      display: block;
      padding-bottom: 20/@rem;
      .clearfix();
      .fl {
        width:280/@rem;
        .height(60);
        text-align: left;
        padding-left: 60/@rem;
      }
      .value {
        position: relative;
        i {
          color: @red;
          position: absolute;
          top: 0;
          right: 80/@rem;
          vertical-align: middle;
        }
      }
    }
    .filter-btn {
      position: absolute;
      bottom: 30/@rem;
      left: 30/@rem;
      .clearfix();
      .btn-reset {
        .whl(280, 70);
        background-color: #fff;
        color: @red;
        border: 1px solid @red;
        text-align: center;
      }
      .btn-apply {
        .whl(280, 70);
        background-color: @red;
        color: #fff;
        margin-left: 30/@rem;
        text-align: center;
      }
    }
  }
  .search-empty {
    padding-top: 290/@rem;
    text-align: center;
    img {
      .wh(195, 200);
      margin-bottom: 40/@rem;
      background-size: 100% auto;
    }
    p {
      .height(50);
    }
  }
  .loading {
    text-align: center;
    .height(80);
  }
  .search-mask {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    z-index: 90;
  }
}
</style>
