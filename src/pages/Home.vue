<template>
<div>
  <headers></headers>
  <div class="home-main" ref="indexMain">
    <homeindex></homeindex>
  </div>
</div>

</template>

<script>
import homeindex from './home/main'
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
  },
  watch: {},
  methods: {
  },
  beforeDestroy () {}
};
</script>

<style lang="less">
@import '~less/tool.less';
.goods-info {
  padding: 20px 20px 40px;
  .text {
    .line1();
    text-align: center;
    font-size: 28px;
    height: 50px;
    line-height: 50px;
  }
  .price {
    text-align: center;
    display: block;
    height: 40px;
    line-height: 40px;
    font-size: 28px;
    color: @orange;
    padding-right: 10px;
  }
}
</style>
