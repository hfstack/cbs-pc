<template>
  <div class="cart-modal-layout">
    <div class="cart-number">1</div>
    <div class="cart-modal-main" v-show="show">
      <ul class="list">
        <li v-for="(item, index) in cartsData.goods" :key="index">
          <router-link :to="{path: '/detail?id=' + item.id}">
            <div class="img fl">
              <img :src="item.img && item.img.ossimg()">
            </div>
            <div class="info fl">
              <div class="title">{{item.name}}</div>
              <div class="sku" v-for="(prop, key, indexp) in item.props" :key="indexp">{{key}}:&nbsp; {{prop}}</div>
              <div class="sku">Qty: {{item.num}}</div>
              <div class="price">${{item.num * item.price}}</div>
            </div>
          </router-link>
        </li>
      </ul>
      <div class="total-price">
        <span class="lalel">Total:</span>
        <span class="price">${{totalPrice}}</span>
      </div>
      <router-link :to="{path: '/cart'}" class="submit-button">View Cart</router-link>
      <div class="arrow-up"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      cartsData: [],
      totalPrice: 0
    }
  },
  created () {
    this.show && this.getCartData();
  },
  methods: {
    getCartData () {
      this.request('Carts', {}).then((res) => {
        if (res.status === 200 && res.content) {
          this.cartsData = res.content;
          if (!localStorage.userToken) {
            // 认定是游客访问
            localStorage.setItem('userToken', res.content.token);
          }
          if (this.cartsData && this.cartsData.goods && this.cartsData.goods.length) {
            this.cartEmpty = false;
            this.computeTotalPrice();
          } else {
            this.cartEmpty = true;
          }
        } else {
          this.cartEmpty = true;
          // this.$router.push({name: 'sign'})
        }
      }, err => {
        // this.$Toast(err);
      });
    },
    computeTotalPrice () {
      let goods = this.cartsData.goods;
      let len = goods.length;
      for (let i = 0; i < len; i++) {
        this.totalPrice += goods[i].num * goods[i].price;
      }
      // this.totalPrice -= +this.cartsData.specialoffer;
      // 处理券价格
      // this.totalPrice = this.totalPrice - this.couponPrice.substring(1, this.couponPrice.length);
      // this.totalPrice = this.totalPrice - this.couponPrice.replace(/[^0-9]/ig, '');
      if (this.totalPrice < 0) {
        this.totalPrice = 0;
      }
    }
  }
}
</script>

<style lang="less">
@import "~less/tool.less";
.cart-modal-layout {
  .cart-modal-main {
    position: absolute;
    top: 52px;
    left: -188px;
    z-index: 2;
    width: 390px;
    padding: 15px 20px;
    height: auto;
    background-color: #fff;
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.2);

    .list {
      // margin-top: 15px;
      border-bottom: 1px solid @bgray;
      max-height: 350px;
      overflow-y: scroll;
      li {
        margin: 12px 0;
        height: 100px;
        .clearfix();
        .img {
          img {
            display: block;
            .wh(100, 100);
          }
        }
        .info {
          width: 225px;
          height: 100px;
          position: relative;
          font-size: 12px;
          margin-left: 10px;
          .title {
            .line1();
            height: 15px;
            line-height: 15px;
          }
          .sku {
            color: @gray;
            .height(25);
          }
          .price {
            position: absolute;
            right: 0;
            top: 70px;
            font-size: 14px;
            color: @red;
          }
        }
      }
    }
    .arrow-up {
      position: absolute;
      right: 38px;
      z-index: 1;
      top: -10px;
      width: 0;
      height: 0;
      border-left: 10px solid transparent;
      border-right: 10px solid transparent;
      border-bottom: 10px solid #fff;
    }
    .total-price {
      .height(70);
      text-align: right;
      font-size: 20px;
      .price {
        color: @red;
      }
    }
    .submit-button {
      display: block;
      .whl(350, 45);
      background-color: @orange;
      border-radius: 4px;
      text-align: center;
      font-size: 16px;
      font-weight: bold;
      color: #fff;
    }
  }
  .cart-number {
    .whl(28, 28);
    background-color: @orange;
    border-radius: 50%;
    color: #fff;
    position: absolute;
    right: 6px;
    top: 6px;
    text-align: center;
  }
}
</style>

