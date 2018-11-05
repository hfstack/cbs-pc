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
        this.$Messagebox({
          title: err,
          type: 'error'
        });
      });
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


