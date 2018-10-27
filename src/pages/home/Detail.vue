<template>
  <div class="detail-main">
    <headers></headers>
  </div>
</template>

<script>
// import { Swipe, SwipeItem } from 'components/swipe';
// import Coupon from 'common/Coupon.vue';
// import Point from './Point.vue';
export default {
  props: {},
  components: {},
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

}
</style>
