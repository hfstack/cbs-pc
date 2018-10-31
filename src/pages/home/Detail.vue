<template>
  <div class="detail-main-layout">
    <headers></headers>
    <div class="detail-main">
      <div class="chip">
        Women
        <span>/</span>
        Clothing
        <span>/</span>
        Carding
        <span>/</span>
      </div>

      <div class="detail-core">
        <div class="detail-swipe fl">
          <Swipe class="my-swipe big-img-swipe" ref="bigImgSwipeRef" :showIndicators="false" :nextCallback="nextCallback" :disabled="true">
            <SwipeItem v-for="(img, index) in imgSwipe" :key="index">
              <img :src="img && img.ossimg()">
            </SwipeItem>
          </Swipe>
          <div class="small-img-list" ref="smallImgListRef">
            <Swipe class="my-swipe small-img-swipe" ref="smallImgSwipeRef" :showIndicators="false" :operator="true" :disabled="true">
              <SwipeItem v-for="(smallImgs, index) in smallImgSwipe" :key="index">
                <img v-for="(simg, sindex) in smallImgs" :src="simg && simg.ossimg()" @click="smallImgClick(index * 4 + sindex)" :class="{'cur': index * 4 + sindex === 0}">
              </SwipeItem>
            </Swipe>
          </div>
        </div>

        <div class="detail-info fl">
          <div class="detail-title">{{data.name}}</div>
          <div class="detail-price">
            <div class="fl price">
              <div class="red">${{goodsData.price}}</div>
              <div class="gray">${{goodsData.originPrice}}</div>
            </div>
            <div class="fl off">-{{(goodsData.price * 100) / (goodsData.originPrice * 100) * 100}}% OFF</div>
          </div>
          <ul class="detail-some">
            <li class="li1">Deals</li>
            <li>
              <i class="iconfont icon orange">&#xe612;</i>
              <span>BUY $300 GET $50 </span>
              <i class="iconfont arrow">&#xe62e;</i>
              <i class="iconfont arrow">&#xe62e;</i>
            </li>
            <li>
              <i class="iconfont icon red">&#xe710;</i>
              <span>BUY 2 GET 70% OFF</span>
              <i class="iconfont arrow">&#xe62e;</i>
              <i class="iconfont arrow">&#xe62e;</i>
            </li>
            <li>
              <i class="iconfont icon yellow">&#xe61c;</i>
              <span>Earn 6 Points，100 points </span>
            </li>
          </ul>

          <div class="detail-sku">
            <div class="attr-con">
              <div class="attr-title">{{goodsData.name}}</div>
              <ul class="attr-des" ref="oneSkuRef">
                <li v-for="(item, index) in data.style" @click="oneSkuClick(index, item.stock)" >
                  <a :class="{'cur': item.value === goodsData.oneValue && +item.stock !== 0, 'disabled': +item.stock === 0}" href="javascript:;">{{item.value}}</a>
                </li>
              </ul>
              <template v-if="goodsData.subArr && goodsData.subArr.length">
                <div class="attr-title">{{goodsData.subArr[0].name}} <SizeGuide :show="goodsData.subArr[0].name === 'Size' || goodsData.subArr[0].name === 'size'"></SizeGuide></div>
                <ul class="attr-des" ref="twoSkuRef">
                  <li v-for="(item, index) in goodsData.subArr" @click="twoSkuClick(index, item.stock)">
                    <a :class="{'disabled': +item.stock === 0}" href="javascript:;">{{item.value}}</a>
                  </li>
                </ul>
              </template>
            </div>
          </div>

          <div class="detail-qty">
            <div class="qty-title">Qty</div>
            <div class="qty">
              <a href="javascript:;" class="reduce fl" :class="{'ban': goodsData.saleNum <= 1}"  @click="reduceClick()">
                <i class="iconfont">&#xe62a;</i>
              </a>
              <div class="num fl">{{goodsData.saleNum}}</div>
              <a href="javascript:;" class="add fl" @click="addClick()">
                <i class="iconfont">&#xe66f;</i>
              </a>
            </div>
          </div>

          <div class="detail-button" @click="submitClick">ADD TO CART</div>
        </div>

        <div class="product-details fl">
          <div class="title">Product Details</div>
          <ul class="info-main">
            <li v-for="(prop, key, index) in data.prop">
              <div class="label fl">{{key}}:</div>
              <div class="des fl">{{prop}}</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Swipe, SwipeItem } from 'components/swipe';
import SizeGuide from './SizeGuide.vue';
export default {
  props: {},
  components: {
    Swipe,
    SwipeItem,
    SizeGuide
  },
  data () {
    return {
      data: {},
      goodsData: {
        saleNum: 1
      }, // 选中的商品信息
      imgSwipe: [], // 大图
      smallImgSwipe: [], // 小图
      imgRelationArr: [], // 图片关系  找到图片属于第几个object
      imgNum: 0, // sku中展示的图片
      oneSkuNum: 0, // sku第一排动态属性高亮
      el: {}, // dom 集合
      skuId: null, // sku id
      submitLocked: false // 提交锁
    }
  },
  created () {
    this.getDetailData();
  },
  mounted () {},
  watch: {},
  methods: {
    // 获取详情页基础数据
    getDetailData () {
      this.request('ProductsDetail', {
        id: this.$route.query.id || ''
      }).then((res) => {
        if (res.status === 200 && res.content) {
          this.data = res.content;
        }
      }, err => {
        this.$Messagebox({
          title: err || '网络错误',
          type: 'error'
        });
      }).then(() => {
        this.getOneSkuData();
      }).then(() => {
        this.imgDomHandler();
      });
    },
    // 图片和dom处理助手
    imgDomHandler () {
      // swipe的图片逻辑处理
      let style = this.data.style;
      if (style && style.length) {
        // 大图逻辑处理
        let len = style.length;
        for (let i = 0; i < len; i++) {
          let imgArr = style[i].img || [];
          let imgLen = imgArr.length;
          for (let j = 0; j < imgLen; j++) {
            // 所有图片
            this.imgSwipe.push(imgArr[j]);
            this.imgRelationArr.push(i);
          }
        }
        // 小图逻辑处理
        let iLen = this.imgSwipe.length;
        for (let n = 0; n < iLen; n += 4) {
          this.smallImgSwipe.push(this.imgSwipe.slice(n, n + 4));
        }
      }
      // 缓存dom
      this.el.oneSkuA = this.$refs.oneSkuRef && this.$refs.oneSkuRef.querySelectorAll('a') || ''
      this.el.twoSkuA = this.$refs.twoSkuRef && this.$refs.twoSkuRef.querySelectorAll('a') || '';
    },
    // 高亮
    // @param option.dom 元素
    // @param option.num 第几个高亮
    hightLightHandler (option) {
      let dom = option.dom;
      let len = dom.length;

      // 更新第一属性数据
      // !option.unUpdata && this.getOneSkuData();
      // 高亮处理
      for (let i = 0; i < len; i++) {
        if (dom[i].className.indexOf('disabled') === -1) {
          dom[i].className = '';
        }
      }
      dom[option.num].className = 'cur';
    },
    // ------------------------ sku start  ------------------------ //
    // 第一个sku属性信息
    getOneSkuData () {
      let self = this;
      // 初始化
      this.goodsData = {};
      // 初始化
      let style = this.data.style || [];
      let len = style.length;
      if (!len) return;

      // 第一属性
      let oneSku = style[this.oneSkuNum];
      // 初始化数据集合
      this.goodsData = {
        id: oneSku.id, // 选中的商品ID
        name: oneSku.name, // 选中一层属性名
        oneValue: oneSku.value, // 选中一层属性值
        twoValue: '', // 选中二层属性值
        img: '', // 展示图片
        price: oneSku.prom_price || oneSku.price,
        originPrice: oneSku.price,
        stock: oneSku.stock,
        saleNum: 1 // 购物数量
      };

      // 第二属性处理
      let subArr = oneSku.sub || [];
      let subLen = subArr.length;
      this.goodsData.subArr = subLen && subArr || [];

      // SKUID 如果有第二属性 则赋值为null
      this.skuId = subLen ? null : oneSku.id;
      // DOM未渲染所以用异步
      setTimeout(function() {
        // 展示图片
        self.goodsData.img = self.imgSwipe[self.imgNum];
        // 第二层sku重置
        let dom = self.el.twoSkuA;
        for (let i = 0; i < subLen; i++) {
          if (dom[i].className.indexOf('disabled') === -1) {
            dom[i].className = '';
          }
        }
      }, 50);
    },
    // 第二个sku属性信息
    getTwoSkuData (num) {
      // 变化
      let arr = this.goodsData.subArr[num];
      this.goodsData.price = arr.prom_price || arr.price;
      this.goodsData.stock = arr.stock;
      this.goodsData.twoValue = arr.value;
      this.goodsData.saleNum = 1;
      this.skuId = arr.id; // SKU ID
    },
    // 联动swipe图片 - 第一排sku属性点击
    oneSkuClickSwipeHandler () {
      // 图片滚动
      let swipeNum = 0;
      let iArr = this.imgRelationArr;
      let len = iArr.length;
      for (let i = 0; i < len; i++) {
        if (iArr[i] === this.oneSkuNum) {
          swipeNum = i;
          break;
        }
      }
      // sku展示图片
      this.imgNum = swipeNum;
      // 轮播跟随
      this.$refs.bigImgSwipeRef.goto(swipeNum);
      this.$refs.smallImgSwipeRef.goto(Math.floor(swipeNum / 4));
      // 配图小图
      this.goodsData.img = this.imgSwipe[swipeNum];
      // 点亮小图高亮 && 同步数据
      this.hightLightHandler({
        dom: this.$refs.smallImgListRef.querySelectorAll('img'),
        num: swipeNum
      });
    },
    // 第一排sku属性点击
    oneSkuClick (num, stock) {
      if (+stock === 0) return;
      this.oneSkuNum = num;
      // 更新数据
      this.getOneSkuData();
      // DOM高亮
      this.hightLightHandler({
        dom: this.el.oneSkuA,
        num: num
      });
      // 联动swipe图片
      this.oneSkuClickSwipeHandler();
    },
    // 第二排sku属性点击
    twoSkuClick (num, stock) {
      if (+stock === 0) return;
      // 更新数据
      this.getTwoSkuData(num);
      // 高亮
      this.hightLightHandler({
        dom: this.el.twoSkuA,
        num: num
      });
    },
    // ------------------------ sku end  ------------------------ //
    // ------------------------ 轮播函数集合 start  ------------------------- //
    // @note 辅助轮播函数
    // @param num 第几张小图
    swipeImgHandler (num) {
      // 关联图片与属性
      this.oneSkuNum = this.imgRelationArr[num];
      this.imgNum = num;
      // 高亮 && 同步数据
      this.hightLightHandler({
        dom: this.$refs.smallImgListRef.querySelectorAll('img'),
        num: num
      });
      // 第一属性联动
      this.getOneSkuData();
    },
    // 选中小图
    // @param num 第几张小图
    smallImgClick (num) {
      this.swipeImgHandler(num);
      // 滚动轮播大图
      this.$refs.bigImgSwipeRef.goto(num);
    },
    // 大图滑动回调函数
    // @param num 第几张图片高亮
    nextCallback (num) {
      this.swipeImgHandler(num);
      // 滚动轮播小图
      this.$refs.smallImgSwipeRef.goto(Math.floor(num / 4));
    },
    // ------------------------ 轮播函数集合 end  ------------------------ //
    // 点击加
    addClick () {
      if (this.goodsData.saleNum >= +this.goodsData.stock) {
        this.goodsData.saleNum = +this.goodsData.stock;
        return;
      }
      this.goodsData.saleNum++;
    },
    // 点击减
    reduceClick () {
      if (this.goodsData.saleNum <= 1) {
        return;
      }
      this.goodsData.saleNum--;
    },
    // OK - 提交表单
    submitClick () {
      // 判定是否选择完毕
      if (!this.skuId) {
        this.$Messagebox({
          title: 'Please select your ' + this.goodsData.subArr[0].name,
          type: 'error'
        });
        return;
      }
      // 提交锁
      if (this.submitLocked) {
        return;
      }
      // 提交锁
      if (!this.submitLocked) {
        this.submitLocked = true;
      }
      // 提交表单
      this.request('CartsAdd', {
        token: localStorage.getItem('userToken') || '',
        good_id: +this.$route.query.id,
        sku_id: +this.skuId,
        num: +this.goodsData.saleNum
      }).then((res) => {
        if (res.status === 200) {
          let self = this;
          localStorage.setItem('userToken', res.content.token);
          // 跳转到购物车
          setTimeout(function() {
            self.submitLocked = false; // 解锁
            self.$router.push({
              path: '/mycart?id=' + self.$route.query.id
            });
          }, 1000);
        } else {
          this.submitLocked = false; // 解锁
          this.$Messagebox({
            title: res.msg || '网络错误',
            type: 'error'
          });
        }
      }, err => {
        this.$Messagebox({
          title: err || '网络错误',
          type: 'error'
        });
      });
    }
  }
};
</script>

<style lang="less">
@import "~less/tool.less";
.detail-main-layout {
  width: 100%;
  background-color: #fff;
}

.detail-main {
  width: 1240px;
  margin: 0 auto;
  .chip {
    width: 100%;
    .height(56);
    color: @gray;
    text-align: left;
    font-weight: bold;
    font-size: 12px;
    span {
      color: #222;
      &:last-child {
        display: none;
      }
    }
  }
}

.detail-core {
  .clearfix();
  .detail-swipe {
    width: 580px;
    height: 710px;
    .big-img-swipe {
      background-color: #e0e0e0;
      .wh(580, 580);
      img {
        display: block;
        width: 100%;
      }
    }
    .small-img-list {
      position: relative;
      background-color: #fff;
      .wh(580, 110);
      margin-top: 20px;
      .small-img-swipe {
        overflow: visible;
        .wh(580, 110);

        .mint-swipe-items-wrap {
          .clearfix();
          .mint-swipe-item {
            padding-left : 38px;
          }
          img {
            display: block;
            float: left;
            .wh(110, 110);
            margin-right: 20px;
            -webkit-transition: -webkit-transform .3s;
            transition: -webkit-transform .3s;
            transition: transform .3s;
            transition: transform .3s, -webkit-transform .3s;
            &:nth-child(4n) {
              margin-right: 0;
            }
          }
          img.cur {
            border: 1px solid @orange;
          }
        }
      }
      .des {
        margin-top: 20px;
        p {
          padding: 0 30px;
          height: 40px;
          line-height: 40px;
          text-align: center;
          font-size: 26px;
          .line1();
        }
      }
    }
  }
  .detail-info {
    width: 600px;
    margin-left: 40px;
    padding-bottom: 20px;
    border-bottom: 1px solid @bgray;

    .detail-title {
      font-size: 18px;
      font-weight: bold;
      .line1();
      margin-bottom: 15px;
    }
    .detail-price {
      .clearfix();
      .price {
        .red {
          .height(30);
          color: @red;
          font-size: 28px;
          // font-weight: bold;
          // margin-bottom: 5px;
        }
        .gray {
          color: @gray;
          text-decoration: line-through;
          font-size: 18px;
        }
      }
      .off {
        .whl(80,30);
        color: #fff;
        margin-left: 10px;
        // margin-top: 5px;
        background-color: #222;
        text-align: center;
        font-size: 12px;
      }
    }
    .detail-some {
      display: block;
      li {
        margin-bottom: 15px;
        .height(25);
        i.icon {
          vertical-align: top;
          font-size: 18px;
          &.orange {
            color: @orange;
          }
          &.red {
            color: @red;
          }
          &.yellow {
            color: #FCBE01;
          }
        }
        span {
          font-weight: 400;
          margin-right: 15px;
        }
        i.arrow {
          font-weight: bold;
          font-size: 14px;
          margin-left: -10px;
          color: @gray;
        }
        &:last-child {
          margin-bottom: 0;
        }
      }
      .li1 {
        margin-bottom: 5px;
        margin-top: 20px;
        font-weight: bold;
      }
    }
    .detail-sku {
      margin-top: 5px;
      .attr-con {
        .clearfix();
        .attr-title {
          position: relative;
          margin-top: 15px;
          margin-bottom: 10px;
          font-weight: bold;
        }
        .attr-des {
          .clearfix();
          li {
            float: left;
            a {
              display: block;
              // font-weight: bold;
              min-width: 75px;
              .height(25);
              padding: 0 20px;
              margin-right: 10px;
              margin-bottom: 10px;
              text-align: center;
              border: 1px solid @bgray;
              -webkit-transition: -webkit-transform .3s;
              transition: -webkit-transform .3s;
              transition: transform .3s;
              transition: transform .3s, -webkit-transform .3s;
              &.cur {
                border: 1px solid @orange;
              }
              &.disabled {
                border: 1px solid @bgray;
                color: @bgray;
              }
            }
          }
        }
      }
    }
    .detail-qty {
      .qty-title {
        position: relative;
        margin-top: 25px;
        margin-bottom: 10px;
        font-weight: bold;
      }
      .qty {
        width: 96px;
        height: 26px;
        border: 1px solid @bgray;
        overflow: hidden;
        .reduce {
          border-right: 1px solid @bgray;
          i {
            font-size: 14px;
          }
          &.ban i {
            color: #c7c7c7;
          }
        }
        .add {
          border-left: 1px solid @bgray;
        }
        .reduce, .add {
          display: block;
          text-align: center;
          font-weight: bold;
          .whl(24, 24);
        }
        .num {
          .whl(45, 24);
          text-align: center;
        }
      }
    }
    .detail-button {
      cursor: pointer;
      .whl(340,55);
      margin-top: 25px;
      text-align: center;
      background-color: @orange;
      border-radius:4px;
      color: #fff;
      font-size: 24px;
    }
  }

  .product-details {
    margin-left: 40px;
    .title {
      font-size: 16px;
      font-weight: bold;
      margin: 15px 0 20px 0;
    }
    .info-main {
      display: block;
      width: 600px;
      li {
        color: @gray;
        width: 100%;
        .clearfix();
        .height(30);
        .label {
          width: 180px;
        }
        .des {
          width: 400px;
        }
      }
    }
  }
}
</style>
