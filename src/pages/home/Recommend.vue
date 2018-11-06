<template>
   <div class="home-recommend">
      <p class="home-recommend-title">{{title}}</p>
      <ul class="home-recommend-goods clearfix">
        <li class="recommend-goods" v-for="(item, index) in list" :style="{'margin-rigth': (index + 1) % 4 === 0 ? '0px': '20px'}">
          <router-link :to="{path: '/detail?id=' + item.id}">
            <img :src="item.img && item.img.ossimg()" class="goods-img" alt="">
            <p class="goods-title">{{item.name}}</p>
            <p class="goods-price">
              <span class="price-now">${{item.price}}</span>
            </p>
          </router-link>
        </li>
      </ul>
    </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    list: {
      type: Array,
      default: () => {
        return  []
      }
    }
  }
}
</script>
<style lang="less">
.home-recommend{
    width: 1240px;
    margin: 0 auto;
    background-color: #fff;
    .home-recommend-title{
      font-size: 22px;
      color:rgba(54,52,51,1);
      padding: 60px 0 50px;
      text-align: center;
      font-weight: bold;
      font-family: Helvetica-Bold;
    }
    .recommend-goods{
      float: left;
      height: 325px;
      margin-right: 20px;
      &:nth-child(even) {
        margin-right: 0;
      }
      .goods-img{
        width: 232px;
        height: 232px;
        display: block;
      }
      .goods-title{
        margin: 10px 0;
        width: 232px;
        color: #000;
        display: -webkit-box; 
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical!important;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .price-now{
        color: #FF473C;
        margin-right: 5px;
      }
      .price-origin{
        color: #DDDCDC;
        vertical-align: text-bottom;
        text-decoration: line-through;
      }
      .price-rebate{
        background-color: #FF473C;
        height: 32px;
        line-height: 40px;
        color: #fff;
        padding: 0 10px;
        margin-left: 20px;
      }
    }
  }
</style>

