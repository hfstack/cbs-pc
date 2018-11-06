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
@media screen and (max-width: 1440px) {
  .mint-swipe {
    height: 435px !important;
  }
}
@media screen and (min-width: 1920px) {
  .mint-swipe {
    height: 580px !important;
  }
}
.g-banner {
  width: 100%;
  max-height: 580px;
  
  .mint-swipe{
    max-height: 580px;
    position: relative;
  }
  img{
    height: 100%;
    display: block; 
    width: 1438px;
    margin: 0 auto;
  }
  .mint-swipe-indicators {
    width: 100%;
    position: absolute;
    bottom: 0.45rem;
    text-align: center;
    left: 50%;
  }
  .mint-swipe-indicator {
    width: 10px;
    height: 10px;
    display: inline-block;
    border-radius: 100%;
    background: rgba(255,255,255,0.8);
    margin: 0 10px;
  }
  .mint-swipe-indicator.is-active {
    background: rgba(0,0,0,0.7);
  }
}
</style>