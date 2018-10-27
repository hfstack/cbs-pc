<template>
  <div class="add-address-main">
    <topbar title="Add Address"></topbar>

    <ul class="address-ul">
      <li>
        <div class="label">First Name*</div>
        <input type="text" v-model="data.firstname">
      </li>
      <li>
        <div class="label">Last Name*</div>
        <input type="text" v-model="data.lastname">
      </li>
      <li>
        <div class="label">Country*</div>
        <input type="text" v-model="data.country">
        <!-- <i class="iconfont gray2">&#xe62e;</i> -->
      </li>
      <li>
        <div class="label">State/Province*</div>
        <input type="text" v-model="data.state">
        <!-- <i class="iconfont gray2">&#xe62e;</i> -->
      </li>
      <li>
        <div class="label">City*</div>
        <input type="text" v-model="data.city">
      </li>
      <li>
        <div class="label">Address Line 1*</div>
        <input type="text" v-model="data.street" placeholder="Street，Address，Company Name，C/O">
      </li>
      <li>
        <div class="label">Address Line 2(Optional)</div>
        <input type="text" v-model="data.suburb" placeholder="Apartment，Suite，Unite，Builting，Floor，etc">
      </li>
      <li>
        <div class="label">ZIP/Post Code*</div>
        <input type="text" v-model="data.postalcode">
      </li>
      <li>
        <div class="label">Phone Number*</div>
        <input class="phone" type="text" v-model="data.iphone">
        <!-- <div class="phone-number-icon">
          <div class="img"></div>
          <div class="des">+001</div>
        </div> -->
      </li>
    </ul>

    <div class="set-defualt">
      Set as Default Shipping Address
      <mt-switch v-model="data.default"></mt-switch>
    </div>

    <div class="global-fixed-btn">
      <div class="fixed-btn" @click="submitAddress">SAVE</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      data: { // 提交的数据
        default: false,
      },
      addressId: null,
    };
  },
  computed: {},
  created () {
    // 如果存在addressId就是编辑页面
    this.addressId = this.$route.query.addressId;
    if (this.addressId) {
      this.request('AddressInfo', {
        address_id: this.addressId
      }).then((res) => {
        if (res.status === 200 && res.content) {
          this.data = res.content;
        }
      }, err => {
        this.$Toast(err);
      });
      // 返回页面控制
      // this.backUrl = 'cart/shippingAddress/' + this.$route.params.orderId
    } else if (this.$route.query.from === 'shipping') { // 如果是是shippingAddress页面点击新增过来的
      // this.backUrl = 'cart/shippingAddress/' + this.$route.params.orderId
    }
    // else if (this.$route.query.from === 'addCard') {
    //   this.backUrl = 'cart/addCard/' + this.$route.params.orderId
    // }
  },
  mounted () {},
  watch: {},
  methods: {
    submitAddress () {
      let data = Object.assign({}, this.data);
      if (!data.firstname) {
        this.$Toast('Firstname must be more than 2 letters');
        return;
      }
      if (!data.lastname) {
        this.$Toast('Lastname must be more than 2 letters');
        return;
      }
      if (!data.country) {
        this.$Toast('Country  must be more than 2 letters');
        return;
      }
      if (!data.state) {
        this.$Toast('State/province  must be more than 2 letters');
        return;
      }
      if (!data.city) {
        this.$Toast('City must be more than 2 letters');
        return;
      }
      if (!data.street) {
        this.$Toast('Firstname must be more than 2 letters');
        return;
      }
      if (!data.postalcode) {
        this.$Toast('ZIP/Post Code must be more than 2 letters');
        return;
      }
      if (!data.iphone) {
        this.$Toast('Phone Number must be more than 2 letters');
        return;
      }
      // country	是	string	国家 最大长度50字符 - 目前自行填写
      // state	是	string	州/省/区域 最大长度250字符  - 目前自行填写
      this.request('AddressAdd', data).then((res) => {
        if (res.status === 200) {
          let self = this;
          self.$Toast({
            message: 'Success',
            duration: 800
          });
          setTimeout(function() {
            self.$router.replace({
              name: 'shippingAddress',
              query: {
                orderId: self.$route.query.orderId || ''
              }
            });
          }, 1000);
        }
      }, err => {
        this.$Toast(err);
      });
    }
  },
  beforeDestroy () {}
};
</script>

<style lang="less">
@import '~less/tool.less';
.add-address-main {
  font-size: 28/@rem;
  padding-top: 92/@rem;
  padding-bottom: 98/@rem;

  .address-ul {
    margin-top: 20/@rem;
    padding: 30/@rem 0;
    display: block;
    width: 100%;
    background-color: #fff;
    li {
      position: relative;
      width: 100%;
      padding: 0 20/@rem;
      height: 130/@rem;
      margin-bottom: 20/@rem;
      .label {
        font-weight: 400;
        .height(40);
        margin-bottom: 10/@rem;
      }
      input {
        .whl(710,80);
        border:1px solid #c5c5c5;
        padding: 0 20/@rem;
        // &.phone {
        //   padding-left: 200/@rem;
        // }
      }
      i {
        position: absolute;
        top: 65/@rem;
        right: 20/@rem;
      }
    }
    .phone-number-icon {
      position: absolute;
      left: 40/@rem;
      top: 70/@rem;
      .img {
        float: left;
        display: block;
        background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAApCAMAAACm2UGfAAAA1VBMVEX///+vRkgeL1rr0dH69PTSl5jqz88hMl1BQmUrMVgyQmnPkJElNl8wP2cpOWI8S3A5SG4rPGROXH6AepFMWXxBUHSdQ0qSmq9HVXjpzM2Kk6l6hJ1ueZVATnM9THHj5eqwtsVlcY41RGvd4Oanrb6FjqZ/iaF1gJpiboxYZYUjNF7u8PPh4+nW2eG6v81fa4pUYYLR1d21usnRvcKhqLqbo7aXn7OIj6WGiJ9rdpJaZobf2+HLz9nHzNa/xNCpsMCMlauEhJq7h4379fXk5uv26enw3NztBhzRAAABoklEQVRIx5yTyW7bMBRF1dMWr1BJaohUCZbsWnJkW42npHUcu20m5P+/KRQyrCQuchcH3Dzi8eDSe/jmzOP33njeGToEJAeI35G8nn586k03dzcVuL5VML80UK18SC4CCC92w3MHfJ8xviZ9OWlNINqYyFdRxN8vvfG8ERDOYtDrJZj/C5CrzOLPuQA/vYGMUJGkGp+0thgHFpM3OOZu2HcXNxsF5T8Dp7UP+Szs1kj4/bk3nZftll/sKou4tEgXFnVhEFWELp8QbhLQVy2Y6bJ7WmFxnwkMz92AyCFAmOcWi9biuLSoKovhPUccFwK7kYI8iyDNfAiyEOps4vJZzIHyHtjugaTTVE+jbumJyyfUzRh0k4NpEpCitahKAZdPkKcUuGyBTQmcN0B2Dc5+6lDESI5SxO9ILJy9fnD3+vFrb6wXZ68dPj/Y64Oz18P/6EymG4F9V+n5WkM5m8BplUC+2rp8ticgXgL5EQhKICoUPE9LmguPPk68AJe+IQMkGckBtNM31MPTjZUcQP/wdGYhBzDQHbgykwPoH54sbOQABgDcPTW/6d89KwAAAABJRU5ErkJggg==') no-repeat;
        .wh(55,41);
        background-size: 100% auto;
      }
      .des {
        float: left;
        margin-left: 20/@rem;
        font-size: 26/@rem;
        .wh(90, 40);
        border-right: 1px solid #e5e5e5;
      }
    }
  }

  .set-defualt {
    margin: 20/@rem 0;
    padding: 0 20/@rem;
    width: 100%;
    .height(92);
    background-color: #fff;
    .clearfix();
    .mint-switch {
      margin-top: 20/@rem;
      float: right;
    }
  }
}
</style>
