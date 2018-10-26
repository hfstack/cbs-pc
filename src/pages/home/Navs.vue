<template>
  <div class="g-navs">
    <ul class="clearfix">
      <li class="navs-item" v-for="item in list">
        <router-link :to="{path: '/categories/search?cate=' + item.cate}">
          <img class="nav-img" v-lazy="item.img && item.img.ossimg()">
          <p class="nav-title">{{item.title}}</p>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    list: {
      type: Array,
      default: []
    }
  },
  data() {
    return {

    }
  }
}
</script>

<style lang="less">
@import '~less/tool.less';
.g-navs{
  padding: 40/@rem;
  background-color: #fff;
  .navs-item{
    float: left;
    width: 25%;
    text-align: center;
    .nav-img{
      width: 105/@rem;
      height: 105/@rem;
      margin: 0 auto;
      display: block;
    }
    .nav-title {
      font-size: 24/@rem;
      font-weight: bold;
      margin-top: 16/@rem;
    }
  }
}
</style>

