<template>
  <div class="g-banner" v-if="list && list.length">
    <swipe class="index_banner my-swipe" :auto="3000" v-if="list.length > 1" :loop="true">
      <swipe-item v-for="(item, index) in list" :key="index" class="slide" :class="'slide' + index">
        <a :href="item.url || 'javascript:;'">
          <img :src="item.img && item.img.ossimg()">
        </a>
      </swipe-item>
    </swipe>
    <a :href="list[0].url || 'javascript:;'" v-if="list.length === 1">
      <img :src="list[0].img && list[0].img.ossimg()">
    </a>
  </div>
</template>
<script>
  import { Swipe, SwipeItem } from 'components/swipe';
  export default {
    components: {
      Swipe,
      SwipeItem
    },
    props: {
      list: {
        type: Array,
        default: []
      }
    },
    data () {
      return {};
    },
    mounted () {
    },
    methods: {
    }
  };
</script>
<style lang="less">
@import '~less/tool.less';
.g-banner {
  width: 100%;
  height: 435px;
  .mint-swipe{
    height: 435px;
  }
  img{
    width: 100%;
    height: 100%;
    display: block;
  }
  .mint-swipe-indicators {
    width: 100px;
    margin: 0 auto;
    position: absolute;
    bottom: 0.45rem;
    text-align: center;
    left: 50%;
    margin-left: -50px;
  }
  .mint-swipe-indicator {
    width: 20px;
    height: 20px;
    display: inline-block;
    border-radius: 100%;
    background: #bfbfbf;
    margin: 0 10px;
  }
  .mint-swipe-indicator.is-active {
    background: #000000
  }
}
</style>