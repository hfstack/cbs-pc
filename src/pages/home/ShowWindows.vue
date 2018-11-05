<template>
  <div class="showwindow">
    <p class="head"><span class="title">{{data.storey_title}}</span><a :href="data.storey_url" class="more">MORE >></a></p>
    <div class="windows clearfix">
      <div class="window-item left">
        <template v-if="data.storey_left && data.storey_left.length === 5">
          <div class="win5">
            <div class="win5-1">
              <a :href="data.storey_left[0].url">
                <img :src="data.storey_left[0].img" alt="">
              </a>
            </div>
            <div class="win5-2">
              <a :href="data.storey_left[1].url">
                <img :src="data.storey_left[1].img" alt="">
              </a>
                <a :href="data.storey_left[2].url">
                <img :src="data.storey_left[2].img" alt="">
              </a>
               <a :href="data.storey_left[3].url">
                <img :src="data.storey_left[3].img" alt="">
              </a>
                <a :href="data.storey_left[4].url">
                <img :src="data.storey_left[4].img" alt="">
              </a>
            </div>
          </div>
        </template>
        <template v-if="data.storey_left && data.storey_left.length === 3">
          <div class="win3">
            <div class="win3-1">
              <a :href="data.storey_left[0].url">
                <img :src="data.storey_left[0].img" alt="">
              </a>
            </div>
            <div class="win3-2">
              <a :href="data.storey_left[1].url">
                <img :src="data.storey_left[1].img" alt="">
              </a>
                <a :href="data.storey_left[2].url">
                <img :src="data.storey_left[2].img" alt="">
              </a>
            </div>
          </div>
        </template>
      </div>
      <div class="window-item right">
        <p class="win-title">Latest Hot Sale</p>
        <ul class="goods-list">
          <li v-for="item in data.storey_right" class="goods-item clearfix">
            <router-link class="fl" :to="{path: '/detail?id=' + item.id}">
              <img :src="item.img" alt="" class="img" width="90">
            </router-link>
            <div class="fl goods-detail">
              <p class="goods-name">{{item.name}}</p>
              <p class="price"><span class="current-price">${{item.price}}</span><span class="price-origin">${{item.origin_price}}</span></p>
              <p class="price-rebate">Rebate ${{item.rebate}}<span class="fh"></span></p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => {
        return {}
      }
      
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
.showwindow{
  width: 1240px;
  margin: 0 auto;
  .head{
    padding: 50px 0 22px 0;
    .title{
      font-size: 22px
    }
    .more{
      display: block;
      font-size: 12px;
      line-height: 28px;
      float: right;
      color: @gray
    }
  }
  .windows{
    height: 602px;
    border: 1px solid #ccc;
    border-top: 2px solid #343434;
    .window-item{
      float: left;
      .goods-detail{
        width: 120px;
      }
      .goods-list:last-child{
        border-bottom: none;
      }
    }
    a{
      display: inline-block;
    }
    
    .win5{
      float: left;
      .win5-1{
        width: 380px;
        height: 100%;
        float: left;
      }
      .win5-1>a>img {
        width: 100%;
        height: 100%;
        overflow: hidden;
      }
      .win5-2{
        width: 600px;
        float: left;
        a{
          float: left;
          width: 49%;
          height: 300px;
          border-bottom: 1px solid @bgray;
          &:nth-child(even) {
            border-right: 1px solid @bgray
          }
        }
      }
      .win5-2>a>img{
        width: 100%;
        height: 100%;
      }
    }
    .win3{
      float: left;
      .win3-1{
        width: 380px;
        height: 100%;
        float: left;
      }
      .win3-1>a>img {
        width: 100%;
        height: 100%;
        overflow: hidden;
      }
      .win3-2{
        width: 600px;
        float: left;
        a{
          float: left;
          width: 100%;
          height: 300px;
          border-bottom: 1px solid @bgray;
        }
      }
      .win3-2>a>img{
        width: 100%;
        height: 100%;
      }
    }
    .right {
      float: left;
      width: 256px;
      height: 600px;
      padding: 0 10px;
    }
  }
  .clearfix:after {
    display: block;
    content: '';
    clear: both;
  }
  .win-title{
    margin-top: 22px;
    margin-bottom: 5px;
    font-size: 20px;
    color: #363433;
  }
  .goods-item{
    padding: 8px 5px;
    border-bottom: 1px dashed @gray;
    &:last-child {
      border-bottom: none;
    }
    .goods-name{
      width: 120px;
      height: 36px;
      color: #000000;
      display: -webkit-box; 
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-align: left;
    }
    .img {
      margin-right: 10px;
    }
    .price{
      padding: 10px 0;
    }
    .price-rebate{
      // padding: 3px;
      width: 90px;
      background-color: #F96C17;
      padding-left: 5px;
      padding-right: 10px;
      color: #fff;
      position: relative;
    }
    .current-price{
      color: #F45263;
      margin-right: 10px;
    }
    .price-origin{
      color: @gray;
      text-decoration: line-through;
    }
    .fh{
      position: absolute;
      right: 0;
      display: inline-block;
      width:0;
      height:0;
      border: 9px solid transparent;
      border-right-color: #fff;//左箭头
    }
  }
}
</style>

