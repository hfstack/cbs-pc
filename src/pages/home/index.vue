<template>
  <div class="home-index">
    <Banner :list="banners"></Banner>
    <recommend title="Daily selection":list="daily"></recommend>
    <ShowWindows  v-for="item in storey" :data="item"></ShowWindows>
    <recommend title="Recommend" :list="recommends"></recommend>
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
      storey: []
    }
  },
  components: {
    Banner,
    ShowWindows,
    recommend
  },
  mounted() {
    this.getHomeData();
  },
  methods: {
    getHomeData () {
      this.request('PCHome', {}).then((res) => {
        if (res.status === 200 && res.content) {
          this.navList = res.content.icons;
          this.banners = res.content.banners;
          this.recommends = res.content.goods;
          this.daily = res.content.daily;
          this.storey = res.content.storey;
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
  width: 100%;
  background: #fff;
}
</style>


