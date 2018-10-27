<template>
  <div class="shipping-address-main">
    <topbar title="Shipping Address"></topbar>
    <div class="address-con" v-for="item in data">
      <div class="address-detail">
        <div class="info">
          <div class="fl">{{item.recipients}}</div>
          <div class="fr">{{item.iphone}}</div>
        </div>
        <div class="address">{{item.address}}</div>
        <div class="pos">
          <i class="iconfont gray2">&#xe62e;</i>
        </div>
      </div>
      <div class="operate">
        <div class="fl">
          <input type="radio" name="radio" @click="addressDefault(item.id)" v-if="item.is_default === 1" checked>
          <input type="radio" name="radio" @click="addressDefault(item.id)" v-else>
          Set as Default Shipping Address
        </div>
        <div class="fr">
          <div class="edit" @click="edit(item.id)">
            <i class="iconfont">&#xe621;</i>Edit
          </div>
          <div class="delete" @click="del(item.id)">
            <i class="iconfont">&#xe63d;</i>Delete
          </div>
        </div>
      </div>
    </div>
    <div class="global-fixed-btn">
      <router-link :to="{path: '/cart/addAddress', query: {orderId: this.$route.query.orderId || ''}}" class="fixed-btn">+ ADD NEW ADDRESS</router-link>
    </div>
    <confirm :show.sync="confirmModal.show" :title="confirmModal.title"  :content="confirmModal.content" :on-ok="confirmModal.action"  okText="Yes"></confirm>
  </div>
</template>

<script>
export default {
  data () {
    return {
      data: [],
      confirmModal: {}
    }
  },
  computed: {
    backUrl: function() {
      if(this.$route.query.orderId) {
        return 'cart/secure/' + this.$route.query.orderId;
      } else {
        return null
      }
    }
  },
  created () {
    this.getAddressList();
  },
  mounted () {},
  watch: {},
  methods: {
    getAddressList () {
      this.request('AddressList', {
        page: 1
      }).then((res) => {
        if (res.status === 200 && res.content) {
          this.data = res.content;
        }
      }, err => {
        this.$Toast(err);
      });
    },
    edit (addressId) {
      this.$router.push({path: '/cart/addAddress', query: {orderId: this.$route.params.orderId, addressId: addressId}});
    },
    del (addressId) {
      let self = this;
      self.confirmModal = {
        show: true,
        title: 'Confirmed to delete?',
        onText: 'Yes',
        content: `Delete the Address!`,
        action: function () {
          self.request('AddressDelete', {
            address_id: addressId
          }).then((res) => {
            if (res.status === 200 && res.content) {
              self.confirmModal.show = false;
              self.$Toast({
                message: 'Success',
                duration: 1200
              });
              setTimeout(function() {
                self.data = res.content;
              }, 500);
            } else {
              self.$Toast(res.msg);
            }
          }, err => {
            self.$Toast(err);
          });
        }
      }
    },
    addressDefault (addressId) {
      this.request('AddressDefault', {
        address_id: addressId
      }).then((res) => {
        if (res.status === 200 && res.content) {
          this.data = res.content;
          this.$Toast({
            message: 'Setting default success',
            duration: 1000
          });
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
.shipping-address-main {
  padding-top: 92/@rem;

  .address-con {
    font-size: 28/@rem;
    margin-top: 20/@rem;
    background-color: #fff;
  }
  .address-detail {
    position: relative;
    display: block;
    padding: 20/@rem;
    position: relative;
    color: #535353;
    border-bottom: 1px solid @gray3;

    .info {
      .height(40);
      .clearfix();
    }
    .address {
      word-break: break-all;
      line-height: 40/@rem;
    }

    .pos {
      position: absolute;
      top: 30/@rem;
      right: -40/@rem;
    }
  }
  .operate {
    .height(70);
    .clearfix();
    .fl input {
      margin-left: 20/@rem;
      vertical-align: top;
      margin-top: 18/@rem;
      .wh(34, 34);
    }
    .fr {
      font-size: 24/@rem;
      margin-right: 20/@rem;
    }
    .edit, .delete {
      display: inline-block;
      i {
        color: #929299;
        font-size: 32/@rem;
        vertical-align: top;
        margin-right: 5/@rem;
      }
    }
  }
}
</style>
