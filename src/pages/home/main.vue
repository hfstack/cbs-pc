<template>
  <div class="home-index">
    <Banner :list="banners"></Banner>
    <recommend title="DAILY SELECTIONS":list="daily"></recommend>
    <ShowWindows  v-for="(item, index) in storey" :key="index" :data="item"></ShowWindows>
    <recommend title="RECOMMEND" :list="recommends"></recommend>
  </div>
</template>
<script>
import Banner from './Banner';
import ShowWindows from './ShowWindows';
import recommend from './Recommend';
export default {
  data() {
    return {
      banners: [],
      recommends: [],
      navList: [],
      daily: [],
      storey: [],
      params: {
        page: 1
      },
      loadingContent: '',
      isFinishedLoading: true,
      loadingEmpty: false,
    }
  },
  components: {
    Banner,
    ShowWindows,
    recommend
  },
  mounted() {
    this.getHomeData();
    this.loadMore();
  },
  methods: {
    getHomeData () {
      this.loadingContent = 'Loading...';
      this.isFinishedLoading = false;
      this.loadingEmpty = false;
      this.request('PCHome', this.params).then((res) => {
        if (res.status === 200 && res.content) {
          this.navList = res.content.icons;
          this.banners = res.content.banners;
          this.recommends = res.content.goods;
          this.daily = res.content.daily;
          this.storey = res.content.storey;
        }
        if(this.params.page === 1) {
          this.navList = res.content.icons;
          this.banners = res.content.banners;
          this.daily = res.content.daily;
          this.storey = res.content.storey;
        }
        this.recommends =  this.recommends.concat(res.content.goods);
        if (this.params.page < res.content.total_page) {
          this.loadingEmpty = false;
        } else {
          this.loadingContent = 'No More';
          this.loadingEmpty = true;
        }
        this.isFinishedLoading = true;
      }, err => {
        this.$Messagebox({
          title: err,
          type: 'error'
        });
      });
    },
     // 加载更多
    loadMore () {
      let self = this;
      window.onscroll = function () {
        var a = document.documentElement.scrollTop || document.body.scrollTop; // 滚动条y轴上的距离
        var b = document.documentElement.clientHeight || document.body.clientHeight; // 可视区域的高度
        var c = document.documentElement.scrollHeight || document.body.scrollHeight; // 可视化的高度与溢出的距离（总高度）
        if (a + b >= c - 120 && self.isFinishedLoading && !self.loadingEmpty) {
          self.params.page = self.params.page + 1
          self.getHomeData();
        }
      }
    }
  }
}
</script>
<style lang="less">
@import '~less/tool.less';
.home-index{
  width: 100%;
  background: #fff;
}
</style>


