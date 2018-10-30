<template>
   <div class="modal-popup address-modal" v-if="show">
      <div class="modal-content">
        <div class="title">{{addressId ? 'Edit': 'Add New'}} Shipping Address</div>
        <div class="close" @click="closeModal"><i class="iconfont">&#xe63f;</i></div>
        <shippingaddress :callback="addEditUpdate" :editAddressId="addressId"></shippingaddress>
      </div>
    </div>
</template>
<script>
import shippingaddress from '../cart/ShippingAddress';
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    addressId: {
      type: Number,
      default: ''
    },
    callback: {
      type:Function,
      default: () => {}
    }
  },
  components: {
    shippingaddress
  },
  methods: {
    // 关闭
    closeModal () {
      this.$emit('update:show', false)
    },
     // 获取地址数据
    addEditUpdate () {
      this.$emit('update:show', false)
      this.callback && this.callback();
    }
  }
}
</script>
<style lang="less">
@import '~less/tool.less';

// 弹层
.modal-popup {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  background: rgba(0, 0, 0, 0.5);
  .modal-content {
    position: relative;
    margin: 0 auto;
    width: 890px;
    padding: 30px;
    background-color: #fff;
    border-radius: 8px;
    top: 100px;
    .close {
      position: absolute;
      cursor: pointer;
      right: 20px;
      top: 20px;
      i {
        color: @gray;
      }
    }
    .title {
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 20px;
    }
  }
  .card-new {
    background: none;
  }
}
</style>


