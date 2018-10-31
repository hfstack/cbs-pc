<template>
  <div class="c-goods-list clearfix">
    <ul v-if="list.length">
      <li v-for="item in list" class="goods-item" :key="item.id">
       <a :href="item.stock > 0 ? 'detail?id=' + item.id : 'javascript:;'">
         <img :src="item.img && item.img.ossimg()" class="img">
         <p class="title">{{item.name}}</p>
         <p class="price">${{item.price}}<span class="prom-price">${{item.origin_price}}</span></p>
       </a>
       <div class="solt-out" v-if="item.stock === 0">
         <img src="../../assets/images/my/soltout.png" alt="">
       </div>
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
  },
  mounted() {},
  methods: {}
}
</script>
<style lang="less">
@import '~less/tool';

.c-goods-list{
  width: 1440px;
  margin: 0 auto;
  padding: 0 100px;
  background: #fff;
  .goods-item{
    width: 252px;
    height: 320px;
    padding: 10px;
    float: left;
    position: relative;
    &:hover{
      box-shadow: 0 4px 8px #ccc;
    }
    a{
      display: block;
    }
    .img{
      width: 232px;
      height: 232px;
      display: block;
    }
    .title{
      padding: 10px 0;
      color: #000000;
      font-weight: bold;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-align: left;
    }
    .price{
      color: @red;
      width: 100%;
      text-align: left
    }
    .prom-price{
      color: #939399;
      margin-left: 10px;
      text-decoration: line-through;
    }
    .solt-out{
      position: absolute;
      top: 0;
      background-color: rgba(255, 255, 255, 0.5);
      width: 252px;
      height: 320px;
      padding-top: 70px;
      img{
        width: 110px;
        height: 96px;
      }
    }
  }
  li:nth-child(odd){
    margin-right: 20px;
  }
}
</style>