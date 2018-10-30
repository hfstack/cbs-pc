<template>
  <div class="card-new">
    <div class="card-table">
      <div class="table-item">
        <div class="label">* Card No.</div>
        <div class="input">
          <input type="text" v-model="cardData.number">
        </div>
      </div>
      <div class="clearfix">
        <div class="table-item mr fl">
          <div class="label">* Expiration date</div>
          <div class="input">
            <input type="text" placeholder="Month/Year" v-model="cardData.exp">
          </div>
        </div>
        <div class="table-item  fl">
          <div class="label">* Security code</div>
          <div class="input">
            <input type="text" v-model="cardData.cvc" placeholder="CVV / CVC / CID">
          </div>
        </div>
      </div>
    </div>
    <div class="rember">
      <input type="checkbox" v-model="cardData.is_default">Remember this card for later use
    </div>
    <div class="billing-address" v-if="JSON.stringify(address).length > 2">
      <div class="title">
        Billing Address
        <span>(Please make sure the billing address you enter below matches the name and address associated with the credit card you are using for this purchase.)</span>
      </div>
      <div class="content">
        <p>{{address.firstname}}&nbsp;{{address.lastname}} ( {{address.country}}&nbsp;{{address.state}}&nbsp;{{address.city}}&nbsp;{{address.street}}&nbsp;{{address.suburb}} )</p>
      </div>
    </div>
    <div class="add-button" @click="clickSave">SAVE</div>
  </div>
</template>

<script>
export default {
  props: {
    cardId: {
      type: String,
      default: ''
    },
    saveCallback: {
      type: Function,
      default: () => {}
    }
  },
  data () {
    return {
      addressId: '',
      cardData: {}, // 银行卡内容
      address: {},
      url: 'CardsAdd'
    };
  },
  watch: {
    'cardId': function(status) {
      if (status) {
        this.getEditData();
        this.url = 'CardsEdit';
      } else {
        this.cardData = {};
        this.address = {};
        this.cardData.is_default = false;
        this.url = 'CardsAdd';
      }
    }
  },
  computed: {},
  created () {},
  mounted () {},
  methods: {
    // 银行卡信息 - 编辑
    getEditData () {
      if (!this.cardId) {
        return;
      }
      this.request('CardsInfo', {
        card_id: +this.cardId
      }).then((res) => {
        if (res.status === 200 && res.content) {
          this.cardData = res.content.card || {};
          this.address = res.content.address || {};
          this.cardData.is_default = res.content.is_default || false;
        } else {
          this.Messagebox({
            title: res.msg || 'system error',
            type: 'error'
          });
        }
      }, err => {
        this.Messagebox({
          title: err || 'system error',
          type: 'error'
        });
      });
    },
    // 保存修改
    clickSave () {
      let self = this;
      let data = {};
      if (!this.cardData.number) {
        this.Messagebox({
          title: 'Number must be more than 2 letters',
          type: 'error'
        });
        return;
      }
      if (!this.cardData.exp) {
        this.Messagebox({
          title: 'Exp must be more than 2 letters',
          type: 'error'
        });
        return;
      }
      if (!this.cardData.cvc) {
        this.Messagebox({
          title: 'Cvc must be more than 2 letters',
          type: 'error'
        });
        return;
      }
      this.cardData.is_default = this.cardData.is_default || false;
      Object.assign(data, this.cardData);
      this.request(this.url, data).then((res) => {
        if (res.status === 200) {
          // 重置
          this.cardData = {};
          this.address = {};
          this.cardData.is_default = false;
          // callback
          this.saveCallback && this.saveCallback();
        } else {
          this.Messagebox({
            title: res.msg || 'system error',
            type: 'error'
          });
        }
      }, err => {
        this.Messagebox({
          title: err || 'sysytem error',
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
// 新增银行卡
.card-new {
  width: 800px;
  padding: 20px;
  background-color: #F7F9FA;
  margin-left: 15px;
  .table-item {
    width: 760px;
    margin-bottom: 20px;
    &.mr {
      margin-right: 20px;
    }
    .label {
      font-weight: bold;
      .height(25);
    }
    input {
      width: 760px;
      .height(44);
      border: 1px solid #e4e4e4;
      padding: 0 10px;
    }
    &.fl {
      width: 370px;
      input {
        width: 370px;
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
  .billing-address {
    border-top: 1px solid @bgray;
    padding-top: 20px;
    margin-top: 20px;
    .title {
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 10px;
      span {
        font-size: 12px;
        font-weight: normal;
        color: @gray;
      }
    }
    .content {
      position: relative;
      background-color: #fff;
      font-weight: bold;
      .whl(760, 60);
      &::before {
        position: absolute;
        top: 0;
        left: 0;
        background: url('~img/cart/left_bg.png') no-repeat;
        width: 8px;
        height: 60px;
        display: block;
        content: '';
      }
      p {
        padding-left: 20px;
        .height(60);
        .line1();
      }
    }
  }
  .add-button {
    .whl(200, 40);
    cursor: pointer;
    border: 1px solid @orange;
    border-radius: 4px;
    background-color: #fff;
    color: @orange;
    text-align: center;
    margin-left: 300px;
    margin-top: 20px;
  }
}
</style>
