<template>
  <div class="c-goods-list">
    <ul v-if="list.length">
      <li v-for="item in list" class="goods-item" :key="item.id">
       <a :href="item.stock > 0 ? 'detail?id=' + item.id : 'javascript:;'">
         <img v-lazy="item.img && item.img.ossimg()" class="img">
         <p class="title">{{item.name}}</p>
         <p class="price">${{item.price}}<span class="prom-price">${{item.prom_price}}</span></p>
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
.c-goods-list{
  .goods-item{
    width: 365px;
    float: left;
    position: relative;
    a{
      display: block;
    }
    .img{
      width: 365px;
      height: 365px;
      display: block;
    }
    .title{
      padding: 0 11px;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
      margin-top: 42px;
      color: #000000;
      font-size: 28px;
      font-weight: bold;
    }
    .price{
      color: #FF473C;
      font-size: 28px;
      margin-top: 32px;
      margin-bottom: 60px;
      width: 100%;
      text-align: center
    }
    .prom-price{
      font-size: 24px;
      color: #939399;
      margin-left: 10px;
      text-decoration: line-through;
    }
    .solt-out{
      position: absolute;
      top: 0;
      background-color: rgba(255, 255, 255, 0.5);
      width: 365px;
      height: 365px;
      img{
        margin-top: 100px;
        width: 185px;
        height: 160px;
      }
    }
  }
  li:nth-child(odd){
    margin-right: 20px;
  }
}
</style>