<template>
  <div class="shipping-table">
    <div class="clearfix">
      <div class="table-item mr fl">
        <div class="label">* First Name</div>
        <div class="input">
          <input type="text" v-model="data.firstname">
        </div>
      </div>
      <div class="table-item fl">
        <div class="label">* Last Name</div>
        <div class="input">
          <input type="text" v-model="data.lastname">
        </div>
      </div>
      <div class="table-item mr fl">
        <div class="label">* Country</div>
        <div class="input">
          <input type="text" v-model="data.country" placeholder="Fill in a country">
        </div>
      </div>
      <div class="table-item fl">
        <div class="label">* State / Province / Region</div>
        <div class="input">
          <input type="text" v-model="data.state" placeholder="Fill in your state or region">
        </div>
      </div>
      <div class="table-item mr fl">
        <div class="label">* City</div>
        <div class="input">
          <input type="text" v-model="data.city" placeholder="Fill in your city">
        </div>
      </div>
      <div class="table-item fl">
        <div class="label">* Post／Zip Code</div>
        <div class="input">
          <input type="text" v-model="data.postalcode" placeholder="Fill in your post code">
        </div>
      </div>
    </div>
    <div class="table-item">
      <div class="label">* Address Line1</div>
      <div class="input">
        <input type="text" v-model="data.street" placeholder="Street/Building/Apartment">
      </div>
    </div>
    <div class="table-item">
      <div class="label">* Address Line2</div>
      <div class="input">
        <input type="text" v-model="data.suburb" placeholder="Suite/Unit/Building/Floor">
      </div>
    </div>
    <div class="table-item">
      <div class="label">* Telephone</div>
      <div class="input">
        <input type="text" v-model="data.iphone">
      </div>
    </div>
    <div class="rember">
      <input type="checkbox" v-model="data.default">Set as Default Shipping Address
    </div>
    <div class="shipping-submit">
      <div class="btn-submit" @click="saveAddress">SAVE</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    editAddressId: {
      type: String,
      default: ''
    },
    callback: {
      type: Function,
      default: () => {}
    }
  },
  data () {
    return {
      data: {}
    }
  },
  created () {},
  mounted () {},
  watch: {
    'editAddressId': function(id) {
      if (id) {
        this.getAddressInfoData(id);
      } else {
        this.data = {};
      }
    }
  },
  methods: {
    // 编辑
    getAddressInfoData (addressId) {
      this.request('AddressInfo', {
        address_id: addressId
      }).then((res) => {
        if (res.status === 200 && res.content) {
          this.data = res.content;
        }
      }, err => {
        this.$Messagebox({
          title: err || 'system error',
          type: 'error'
        });
      });
    },
    // 保存
    saveAddress () {
      let data = Object.assign({}, this.data);
      if (!data.firstname) {
        this.$Messagebox({
          title: 'Firstname must be more than 2 letters',
          type: 'error'
        });
        return;
      }
      if (!data.lastname) {
        this.$Messagebox({
          title: 'Lastname must be more than 2 letters',
          type: 'error'
        });
        return;
      }
      if (!data.country) {
        this.$Messagebox({
          title: 'Country  must be more than 2 letters',
          type: 'error'
        });
        return;
      }
      if (!data.state) {
        this.$Messagebox({
          title: 'State/province  must be more than 2 letters',
          type: 'error'
        });
        return;
      }
      if (!data.city) {
        this.$Messagebox({
          title: 'City must be more than 2 letters',
          type: 'error'
        });
        return;
      }
      if (!data.street) {
        this.$Messagebox({
          title: 'Firstname must be more than 2 letters',
          type: 'error'
        });
        return;
      }
      if (!data.postalcode) {
        this.$Messagebox({
          title: 'ZIP/Post Code must be more than 2 letters',
          type: 'error'
        });
        return;
      }
      if (!data.iphone) {
        this.$Messagebox({
          title: 'Phone Number must be more than 2 letters',
          type: 'error'
        });
        return;
      }
      // country	是	string	国家 最大长度50字符 - 目前自行填写
      // state	是	string	州/省/区域 最大长度250字符  - 目前自行填写
      // AddressEdit
      let url = 'AddressAdd';
      // 如果有editAddressId 则为编辑
      if (this.editAddressId) {
        url = 'AddressEdit';
      }

      this.request(url, data).then((res) => {
        if (res.status === 200) {
          // 回调返回地址数据
          this.callback && this.callback(res.content);
          // 初始化数据
          this.data = {};
        }
      }, err => {
        this.$Messagebox({
          title: err || 'system error',
          type: 'error'
        });
      });
    }
  },
  beforeDestroy () {}
};
</script>

<style lang="less">
@import '~less/tool.less';
// 地址
.shipping-table {
  .table-item {
    width: 830px;
    margin-top: 20px;
    &.mr {
      margin-right: 20px;
    }
    .label {
      font-weight: bold;
      .height(25);
    }
    input {
      width: 825px;
      .height(44);
      border: 1px solid #e4e4e4;
      padding: 0 10px;
    }
    &.fl {
      width: 400px;
      input {
        width: 405px;
      }
    }
  }
  .rember {
    margin-top: 20px;
    .height(20);
    input {
      display: inline-block;
      vertical-align: middle;
      margin:0;
      margin-right: 10px;
      -webkit-appearance: checkbox;

    }
  }
  .shipping-submit {
    text-align: center;
    .btn-submit {
      cursor: pointer;
      display: inline-block;
      .whl(200, 40);
      border: 1px solid @orange;
      border-radius: 4px;
      text-align: center;
      color: @orange;
    }
  }
}
</style>
