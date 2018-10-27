<template>
  <div class="detail-main">
    11233
    <div class="detail-swipe">
      <Swipe class="my-swipe big-img-swipe" ref="bigImgSwipeRef" :nextCallback="nextCallback">
        <SwipeItem v-for="(img, index) in imgSwipe" :key="index">
          <img :src="img && img.ossimg()">
        </SwipeItem>
      </Swipe>
      <div class="small-img-list" ref="smallImgListRef">
        <Swipe class="my-swipe small-img-swipe" ref="smallImgSwipeRef" :showIndicators="false" :operator="true">
          <SwipeItem v-for="(smallImgs, index) in smallImgSwipe" :key="index">
            <img v-for="(simg, sindex) in smallImgs" :src="simg && simg.ossimg()" @click="smallImgClick(index * 4 + sindex)" :class="{'cur': index * 4 + sindex === 0}">
          </SwipeItem>
        </Swipe>
        <div class="des">
          <p>{{data.name}}</p>
          <p>{{goodsData.name}}&nbsp;{{goodsData.oneValue}}</p>
        </div>
      </div>
    </div>

    <ul class="detail-something">
      <li class="detail-coupon" @click="clickShowCouponModal" v-show="data.coupon && data.coupon.length">
        <img src="~img/detail/s1.png">
        <span class="gray2">（Rewards {{data.coupon && data.coupon.length}}）</span>
        <span class="span1">Recive</span>
        <i class="iconfont">&#xe62e;</i>
      </li>
      <li class="detail-sale" v-if="data.promotion && data.promotion.id">
        <router-link :to="{path: '/activity?activity_id=' + data.promotion.id}">
          <img src="~img/detail/s2.png">
          {{data.promotion && data.promotion.role}}
          <span class="span2">More</span>
          <i class="iconfont">&#xe62e;</i>
        </router-link>
      </li>
      <li class="detail-point" @click="clickShowPointModal">
        <img src="~img/detail/s3.png">
        Earn {{data.max_integral}} Points，100 points equals to U.S. $1.00
        <i class="iconfont">&#xe62e;</i>
      </li>
    </ul>

    <div class="detail-sku" @click="footCartClick">
      <div class="sku-label fl">Select {{goodsData.oneValue || `Color`}}&nbsp;,&nbsp;{{goodsData.twoValue ||`Size`}}&nbsp;&&nbsp;{{goodsData.twoValue && goodsData.saleNum || `Quantiy`}}</div>
      <i class="iconfont">&#xe62e;</i>
    </div>

    <div class="detail-info">
      <div class="title">Description</div>
      <ul class="info-main">
        <li v-for="(prop, key, index) in data.prop">
          <div class="label fl">{{key}}</div>
          <div class="des fl">{{prop}}</div>
        </li>
      </ul>
    </div>

    <div class="detail-imglist">
      <img v-for="item in data.images" :src="item && item.ossimg()">
    </div>

    <div class="detail-foot" @click="footCartClick">
      <div class="pos-rel">
        <div class="price">${{goodsData.price}}</div>
        <i class="iconfont">&#xe624;</i>
      </div>
    </div>

    <div class="bg-mask" :class="{'show': isMaskShow}" @click="changeMaskClick"></div>
    <!-- 弹出SKU -->
    <div class="detail-popup-sku" :class="{'a-fadeinT': isPopupSkuShow}" v-show="isPopupSkuShow">
      <div class="popup-sku">
        <div class="sku-info">
          <img class="fl" :src="goodsData.img && goodsData.img.ossimg()">
          <div class="des fl">
            <div class="price">${{goodsData.price}}</div>
            <div class="stock">Stock：> {{goodsData.stock}} Pieces</div>
          </div>
        </div>
        <div class="sku-attr">
          <div class="attr-con">
            <div class="attr-title">{{goodsData.name}}</div>
            <ul class="attr-des" ref="oneSkuRef">
              <li v-for="(item, index) in data.style" @click="oneSkuClick(index, item.stock)">
                <a :class="{'cur': item.value === goodsData.oneValue && +item.stock !== 0, 'disabled': +item.stock === 0}" href="javascript:;">{{item.value}}</a>
              </li>
            </ul>
            <template v-if="goodsData.subArr && goodsData.subArr.length">
              <div class="attr-title">{{goodsData.subArr[0].name}}</div>
              <ul class="attr-des" ref="twoSkuRef">
                <li v-for="(item, index) in goodsData.subArr" @click="twoSkuClick(index, item.stock)">
                  <a :class="{'disabled': +item.stock === 0}" href="javascript:;">{{item.value}}</a>
                </li>
              </ul>
            </template>
          </div>
        </div>
        <div class="sku-qty">
          <div class="title">Qty</div>
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
        <div class="sku-ok" @click="submitClick">OK</div>
        <i class="iconfont sku-close" @click="skuCloseClick">&#xe63f;</i>
      </div>
    </div>
    <!-- <Coupon :show.sync="isShowCoupon" :coupons="data.coupon" name="Receive "></Coupon> -->
    <Point :showPoint.sync="isShowPoint"></Point>
  </div>
</template>

<script>
import { Swipe, SwipeItem } from 'components/swipe';
// import Coupon from 'common/Coupon.vue';
import Point from './Point.vue';
export default {
  props: {},
  components: {
    Swipe,
    SwipeItem,
    // Coupon,
    Point
  },
  data () {
    return {
      data: {},
      isShowCoupon: false, // 是否显示coupon弹层
      isShowPoint: false,
      goodsData: {
        saleNum: 1
      }, // 选中的商品信息
      imgSwipe: [], // 大图
      smallImgSwipe: [], // 小图
      imgRelationArr: [], // 图片关系  找到图片属于第几个object
      isBackMenuShow: false, // back菜单按钮
      isMaskShow: false, // 背景mask
      isPopupSkuShow: false, // 弹出SKU
      imgNum: 0, // sku中展示的图片
      oneSkuNum: 0, // sku第一排动态属性高亮
      el: {}, // dom 集合
      skuId: null, // sku id
      submitLocked: false, // 提交锁
      backUrl: 'home' // 返回路径
    }
  },
  created () {
    this.getDetailData();
    if (this.$route.query.from) {
      this.backUrl = decodeURIComponent(this.$route.query.from);
    }
  },
  mounted () {},
  watch: {
    'isPopupSkuShow': function(value) {
      document.documentElement.style.overflow = value ? 'hidden' : 'auto';
    }
  },
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
        this.$Toast(err);
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
        stock: oneSku.stock,
        saleNum: 1 // 购物数量
      };
      this.skuId = null; // 第二属性没选
      // 第二属性处理
      let subArr = oneSku.sub || [];
      let subLen = subArr.length;
      this.goodsData.subArr = subLen && subArr || [];

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
    // 返回菜单
    backMenuClick () {
      this.isMaskShow = !this.isMaskShow;
      this.isBackMenuShow = !this.isBackMenuShow;
    },
    // 点击黑点底层
    changeMaskClick () {
      this.isMaskShow = !this.isMaskShow;
      document.documentElement.style.overflow = this.isMaskShow ? 'hidden' : '';
      this.isPopupSkuShow = false;
      this.isBackMenuShow = false;
    },
    // 点击coupon
    clickShowCouponModal () {
      this.isShowCoupon = true;
    },
    clickShowPointModal () {
      this.isShowPoint = true;
    },
    // 点击加入购物车
    footCartClick () {
      this.isMaskShow = true;
      this.isPopupSkuShow = true;
    },
    // OK - 提交表单
    submitClick () {
      // 判定是否选择完毕
      if (!this.skuId) {
        this.$Toast('Please select your ' + this.goodsData.subArr[0].name);
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
            document.body.scrollTop = document.documentElement.scrollTop = 0; // 滚动到顶部
            document.documentElement.style.overflow = 'auto';
            self.submitLocked = false; // 解锁
            self.isMaskShow = false;
            self.isPopupSkuShow = false;
            self.$router.push({
              path: '/cart?id=' + self.$route.query.id
            });
          }, 1000);
        } else {
          this.submitLocked = false; // 解锁
          this.$Toast(res.msg);
        }
      }, err => {
        this.$Toast(err);
      });
    },
    // 弹出SKU点击关闭
    skuCloseClick () {
      this.isMaskShow = false;
      this.isPopupSkuShow = false;
    }
  }
};
</script>

<style lang="less">
@import "~less/tool.less";
.detail-main {
  padding-top: 90/@rem;
  padding-bottom: 90/@rem;
  .detail-swipe {
    .big-img-swipe {
      height: 750/@rem;
      img {
        display: block;
        width: 100%;
      }
    }
    .small-img-list {
      position: relative;
      background-color: #fff;
      width: 750/@rem;
      padding: 20/@rem 0;
      height: 270/@rem;
      margin-top: 20/@rem;
      .small-img-swipe {
        overflow: visible;
        width: 572/@rem;
        height: 128/@rem;
        margin: 0 auto;
        .mint-swipe-items-wrap {
          .clearfix();
          img {
            display: block;
            float: left;
            width: 128/@rem;
            height: 128/@rem;
            margin-right: 20/@rem;
            -webkit-transition: -webkit-transform .3s;
            transition: -webkit-transform .3s;
            transition: transform .3s;
            transition: transform .3s, -webkit-transform .3s;
            &:nth-child(4n) {
              margin-right: 0;
            }
          }
          img.cur {
            border: 1px solid @red;
          }
        }
      }
      .des {
        margin-top: 20/@rem;
        p {
          padding: 0 30/@rem;
          height: 40/@rem;
          line-height: 40/@rem;
          text-align: center;
          font-size: 26/@rem;
          .line1();
        }
      }
    }
  }

  .detail-something {
    display: block;
    margin-top: 20/@rem;
    .detail-sale a {
      display: block;
    }
    li {
      position: relative;
      padding: 0 20/@rem;
      width: 750/@rem;
      .height(84);
      background-color: #fff;
      border-bottom: 1px solid @gray3;
      img {
        .wh(60, 28);
        vertical-align: top;
        margin-top: 27/@rem;
      }
      .span1, .span2 {
        position: absolute;
        top: 0;
        right: 60/@rem;
        // font-size: 10/@rem;
        transform: scale(.85);
        color: #1EBDFD;
      }
      .span2 {
        color: @red;
      }
      i {
        position: absolute;
        z-index: 1;
        right: 20/@rem;
        color: @gray2;
      }
    }
  }

  .detail-sku {
    position: relative;
    padding: 0 20/@rem;
    margin-top: 20/@rem;
    width: 750/@rem;
    height: 84/@rem;
    background-color: #fff;
    line-height: 84/@rem;
    i {
      position: absolute;
      z-index: 1;
      right: 20/@rem;
      color: @gray2;
    }
  }

  .detail-info {
    margin-top: 20/@rem;
    background-color: #fff;
    .title {
      padding-left: 20/@rem;
      line-height: 84/@rem;
      height: 84/@rem;
      border-bottom: 1px solid @bordercolor;
    }
    .info-main {
      display: block;
      width: 750/@rem;
      padding: 10/@rem 20/@rem;
      li {
        width: 100%;
        .clearfix();
        height: 44/@rem;
        line-height: 44/@rem;
        .label {
          width: 200/@rem;
          color: #535353;
          .line1();
        }
        .des {
          width: 500/@rem;
          color: @gray2;
        }
      }
    }
  }

  .detail-imglist {
    img {
      width: 750/@rem;
      height: auto;
      display: block;
    }
  }

  .detail-foot {
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 100;
    width: 100%;
    height: 96/@rem;

    .pos-rel {
      position: relative;
      width: 100%;
      margin: 0 auto;
      max-width: 750px;
      padding: 0 20/@rem;
      background-color: @red;
      color: #fff;
      .price {
        font-size: 36/@rem;
        line-height: 96/@rem;
      }
      i {
        position: absolute;
        top: 20/@rem;
        right: 20/@rem;
        font-size: 50/@rem;
      }
    }
  }

  .detail-popup-sku {
    position: fixed;
    z-index: 110;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 998/@rem;
    .popup-sku {
      position: relative;
      width: 100%;
      margin: 0 auto;
      max-width: 750px;
      background: #fff;
      height: 998/@rem;
      padding: 0 20/@rem;
    }
    .sku-info {
      width: 100%;
      height: 180/@rem;
      border-bottom: 1px solid #e1e1e1;
      .clearfix();
      img {
        display: block;
        width: 200/@rem;
        height: 200/@rem;
        border-radius: 20/@rem;
        margin-top: -40/@rem;
      }
      .des {
        margin: 60/@rem 0 0 30/@rem;
        .price {
          height: 50/@rem;
          line-break: 50/@rem;
          font-size: 30/@rem;
          color: @red;
        }
        .stock {
          height: 48/@rem;
          line-height: 48/@rem;
          font-size: 24/@rem;
          color: @gray2;
        }
      }
    }
    .sku-attr {
      padding-bottom: 35/@rem;
      border-bottom: 1px solid #e1e1e1;
      .attr-con {
        .clearfix();
        .attr-title {
          height: 40/@rem;
          margin-top: 25/@rem;
          color: #5a5a5e;
        }
        .attr-des {
          .clearfix();
          li {
            float: left;
            a {
              display: block;
              width: 140/@rem;
              height: 54/@rem;
              line-height: 54/@rem;
              margin: 25/@rem 25/@rem 0 0;
              text-align: center;
              border: 1px solid @gray2;
              border-radius: 2px;
              -webkit-transition: -webkit-transform .3s;
              transition: -webkit-transform .3s;
              transition: transform .3s;
              transition: transform .3s, -webkit-transform .3s;
              &.cur {
                border: 1px solid @red;
                color: @red;
              }
              &.disabled {
                border: 1px solid #eee;
                color: #eee;
              }
            }
          }
        }
      }
    }
    .sku-qty {
      position: relative;
      width: 100%;
      height: 54/@rem;
      margin-top: 35/@rem;
      .clearfix();
      .qty {
        position: absolute;
        right: 0;
        top: 0;
        width: 182/@rem;
        height: 54/@rem;
        border-radius: 2px;
        border: 1px solid @gray2;
        overflow: hidden;
        .reduce {
          border-right: 1px solid @gray2;
          i {
            font-size: 32/@rem;
          }
          &.ban i {
            color: #c7c7c7;
          }
        }
        .add {
          border-left: 1px solid @gray2;
        }
        .reduce, .add {
          display: block;
          text-align: center;
          width: 48/@rem;
          height: 54/@rem;
          line-height: 50/@rem;
        }
        .num {
          width: 80/@rem;
          height: 54/@rem;
          line-height: 54/@rem;
          text-align: center;
        }
      }
    }
    .sku-ok {
      position: absolute;
      width: 100%;
      height: 99/@rem;
      line-height: 99/@rem;
      left: 0;
      bottom: 0;
      background-color: @red;
      text-align: center;
      color: #fff;
      font-size: 36/@rem;
    }
    .sku-close {
      position: absolute;
      top: 20/@rem;
      right: 20/@rem;
      color: @gray2;
      font-size: 32/@rem;
    }
  }
}
</style>
