<template>
  <div class="home-main" ref="indexMain">
    <homeindex></homeindex>
    <bottombar></bottombar>
  </div>
</template>

<script>
import homeindex from './home/Index'
export default {
  name: 'home',
  components: {
    homeindex
  },
  data () {
    return {
      store_goods: [] // 商品数据
    };
  },
  computed: {},
  mounted () {
    this.getHomeData();
  },
  watch: {},
  methods: {
    getHomeData () {
      this.request('Home', {}).then((res) => {
        if (res.status === 200 && res.content) {
          this.store_goods = res.content.store_goods; // 商品数据
        }
      }, err => {
        this.$Toast(err);
      });
    }
  },
  beforeDestroy () {}
};
</script>

<style lang="less">
@import '~less/tool.less';
.goods-info {
  padding: 20/@rem 20/@rem 40/@rem;
  .text {
    .line1();
    text-align: center;
    font-size: 28/@rem;
    height: 50/@rem;
    line-height: 50/@rem;
  }
  .price {
    text-align: center;
    display: block;
    height: 40/@rem;
    line-height: 40/@rem;
    font-size: 28/@rem;
    color: @red;
    padding-right: 10/@rem;
  }
}
</style>
