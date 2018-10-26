<template>
  <div class="goods-main">
    <div class="title">
      <h3>全部商品</h3>
      <p>PRODUCT SHOW</p>
    </div>
    <div class="goods-list" if="data.length">
      <router-link v-for="item in data" :to="{path: '/detail/' + item.good_id}" class="goods-link fl" active-class="cur">
        <div class="goods-img">
          <img v-lazy="item.good_image && item.good_image.ossimg()"/>
        </div>
        <div class="goods-info">
          <p class="text">{{item.good_name}}</p>
          <p class="price">￥{{item.price}}</p>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // 数据
    data: {
      type: Array,
      default: []
    }
  }
};
</script>

<style lang="less">
@import "~less/tool.less";
.goods-main {
  background-color: #fff;

  .title {
    text-align: center;
    padding: 30/@rem 0;
    h3,
    p {
      height: 44/@rem;
      line-height: 44/@rem;
      text-align: center;
      font-size: 24/@rem;
    }
    h3 {
      font-size: 28/@rem;
    }
  }

  .goods-list {
    .clearfix();
    .goods-link {
      display: block;
      position: relative;
      width: 370/@rem;
      height: 520/ @rem;
      margin-right: 10/@rem;
      &:nth-child(2n) {
        margin-right: 0;
      }
    }
    .goods-img {
      img {
        display: block;
        width: 370/@rem;
        height: 370/@rem;
      }
    }
  }
}
</style>
