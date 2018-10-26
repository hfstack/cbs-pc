<template>
  <div class="categories-main">
    <div class="global-topbar" id="category-topbar">
      <router-link :to="{path: '/categories/search?cateId='}" class="global-center search-bar">
        <div class="input fl">
          <i class="iconfont">&#xe66e;</i>
          <input type="text" placeholder="What are you looking for?">
        </div>
        <div class="btn-search">Search</div>
      </router-link>
    </div>
    <div class="categories-con">
      <div class="left" :style="{'min-height': winHeight}">
        <ul>
          <li class="cate-item" v-for="(item, index) in category" :class="{'cur': categoriesCur === index}" @click="clickCategories(index, item)">
            <i class="iconfont" v-html="item.icon"></i>
            <p>{{item.name}}</p>
          </li>
        </ul>
      </div>
      <div class="detail">
        <!-- <div class="title">
          <div class="label">{{cate.name}}</div>
          <div class="pos">All<i class="iconfont">&#xe62e;</i></div>
        </div> -->
        <ul>
          <li v-for="ele in secondCate">
            <router-link :to="{path: '/categories/search', query: { cate:  + ele.id }}">
              <img v-lazy="ele.img && ele.img.ossimg()">
              <p>{{ele.name}}</p>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
    <bottombar></bottombar>
  </div>
</template>

<script>
export default {
  components: {},
  data () {
    return {
      categoriesCur: 0,
      category: [],
      secondCate: [],
      winHeight: 0,
      categoriesArr: []
    };
  },
  computed: {},
  mounted () {
    const barHeight = document.getElementById('category-topbar');
    this.winHeight = (document.documentElement.clientHeight - barHeight.offsetHeight) + 'px'
    this.getCategory();
  },
  watch: {},
  methods: {
    // 获取分类
    getCategory() {
      this.request('Category', {}).then((res) => {
        if (res.status === 200) {
          this.category = res.content.cates || [];
          this.categoriesCur = 0;
          this.secondCate = this.category[0] ? this.category[0].sub : [];
        } else {
          this.$Toast(res.msg)
        }
      })
    },
    clickCategories (index, item) {
      this.categoriesCur = index;
      this.secondCate = item.sub;
    }
  },
  beforeDestroy () {}
};
</script>

<style lang="less">
@import '~less/tool.less';
.categories-main {
  padding: 90/@rem 0;
  height: 100%;
  background-color: #fff;
  .search-bar {
    display: block;
    background-color: #fff;
    padding: 0 20/@rem;
    .height(90);
    .clearfix();

    border-bottom: 1px solid @gray3;
    .input {
      position: relative;
      input {
        font-size: 28/@rem;
        width: 600/@rem;
        height: 60/@rem;
        background-color: #EEF0EF;
        border-radius: 30/@rem;
        padding: 0 30/@rem 0 55/@rem;
      }
      i {
        position: absolute;
        top: 0;
        left: 18/@rem;
        font-size: 28/@rem;
        color: @gray2;
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
  .categories-con {
    height: 100%;
    .clearfix();
    .left {
      float: left;
      height: 100%;
      overflow-y: scroll;
      width: 190/@rem;
      background-color: #F2F2F2;
      ul {
        display: block;
        .cate-item {
          padding: 25/@rem;
          font-size: 20/@rem;
          // line-height: 35/@rem;
          border-left: 6/@rem solid #F2F2F2;
          text-align: center;
          i{
            display: block;
            margin-bottom: 13/@rem;
          }

          &.cur {
            background-color: #fff;
            border-left: 6/@rem solid @red;
            color: #FF473C
          }
        }
      }
    }

    .detail {
      width: 560/@rem;
      height: 100%;
      overflow-y: scroll;
      margin-left: 190/@rem;
      padding: 30/@rem 0;
      .title {
        position: relative;
        .height(50);
        margin-bottom: 25/@rem;
        padding-left: 28/@rem;
        font-size: 24/@rem;
        .pos {
          position: absolute;
          right: 20/@rem;
          top: 0;
          color: @gray2;
          i {
            vertical-align: middle;
          }
        }
      }
      ul {
        display: block;
        font-size: 24/@rem;
        .clearfix();
        li {
          float: left;
          width: 180/@rem;
          height: 180/@rem;
          text-align: center;
          margin-left: 6/@rem;
          margin-bottom: 30/@rem;
          img {
            display: block;
            width: auto;
            height: 140/@rem;
            margin-left: 20/@rem;
            background: auto 100%;
          }
          p {
            margin-top: 10/@rem;
            .height(35);
          }
        }
      }
    }
  }
}
</style>
