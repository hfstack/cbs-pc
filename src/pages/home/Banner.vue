<template>
  <div class="g-banner" v-if="list && list.length">
    <swipe class="index_banner my-swipe" :auto="3000" v-if="list.length" :loop="true">
      <swipe-item v-for="(item, index) in list" :key="index" class="slide" :class="'slide' + index">
        <a :href="item.url || 'javascript:;'">
          <img :src="item.img && item.img.ossimg()">
        </a>
      </swipe-item>
    </swipe>
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
  width: 750/@rem;
  height: 400/@rem;
  img{
    width: 100%;
    height: 100%;
    display: block;
  }
  .mint-swipe-indicators {
    width: 750/@rem;
    margin: 0 auto;
    position: absolute;
    bottom: 0.45rem;
    text-align: center;
    left: 50%;
    right: 0;
  }
  .mint-swipe-indicator {
    width: 20/@rem;
    height: 20/@rem;
    display: inline-block;
    border-radius: 100%;
    background: #bfbfbf;
    margin: 0 10/@rem;
  }
  .mint-swipe-indicator.is-active {
    background: #000000
  }
}
</style>