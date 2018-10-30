<template>
  <div class="address-book">
    <ul class="address-list clearfix">
      <li class="address-item fl" v-for="item in list">
        <div class="line"></div>
        <p>
          {{item.recipients}}
          <span class="edit" @click="addressEdit(item)"><i class="iconfont">&#xe621;</i>Edit</span>
          <span class="delete" @click="addressDelete(item)"><i class="iconfont">&#xe63d;</i>Delete</span>
        </p>
        <p>{{item.iphone}}</p>
        <p class="address">{{item.address}}</p>
        <p class="is-default"  v-if="item.is_default">Default Shopping Address</p>
        <p class="set-default" v-if="!item.is_default"><checkbox :checked.sync="item.checked" :onChange="setDefaultAddress(item)"></checkbox> as Default Shipping Address</p>
      </li>
    </ul>
    <div class="add-address" @click="addressClick">
      + ADD NEW ADDRESS
    </div>
    <AddEditAddress :show.sync="showAddress" :callback="getAddressList" :address-id="addressId"></AddEditAddress>
  </div>
</template>
<script>
import AddEditAddress from './addEditAddress';
export default {
  data() {
    return {
      list: [],
      showAddress: false,
      addressId: ''
    }
  },
  components: {
    AddEditAddress
  },
  mounted() {
    this.getAddressList();
  },
  methods: {
    getAddressList () {
      this.request('AddressList', {
        page: 1
      }).then((res) => {
        if (res.status === 200 && res.content) {
          let list = res.content || [];
          list.forEach((item) => {
            item.checked = false;
          })
          this.list = list;
        }
      }, err => {
      });
    },
    addressClick() {
      this.showAddress = true;
    },
    setDefaultAddress(item) {
      if(!item.checked) {
        return;
      }
      const params = Object.assign(item, {default: true})
      this.request('AddressEdit', params).then((res) => {
        if (res.status === 200) {
          // 回调返回地址数据
          this.callback && this.callback(res.content);
          // 初始化数据
          this.getAddressList();
        }
      }, err => {
        this.$Messagebox({
          title: err || 'system error',
          type: 'error'
        });
      });
    },
    addressEdit(item) {
      this.showAddress = true;
      this.addressId = item.id
    },
    addressDelete(item) {
      this.request('AddressDelete', {
        address_id: item.id
      }).then((res) => {
        if (res.status === 200) {
          // 初始化数据
          this.getAddressList();
        }
      }, err => {
        this.$Messagebox({
          title: err || 'system error',
          type: 'error'
        });
      });
    }
  }
}
</script>
<style lang="less">
@import '~less/tool.less';

.address-book{
  .address-list{
    .address-item{
      width: 445px;
      height: 194px;
      padding: 5px 14px 5px 30px; 
      margin-top: 20px;
      position: relative; 
      background-color: #E4E4E4;
      box-shadow:0px 0px 0px 0px rgba(228,228,228,1), 0px 0px 0px 0px rgba(228,228,228,1), 0px 0px 0px 0px rgba(228,228,228,1);
      &:nth-child(odd) {
        margin-right: 20px;
      }
      .line{
        position: absolute;
        left: 0;
        top: 0;
        width: 8px;
        height: 100%;
        background: url('../../assets/images/my/xinfeng.png') repeat center center;
      }
      .edit{
        position: absolute;
        top: 10px;
        right: 120px;
        height: 20px;
        line-height: 20px;
        font-size: 13px;
        color: #939399;
        font-weight: normal;
        i {
          margin-right: 10px;
          font-size: 20px;
        }
        cursor: pointer;
      }
      .delete{
        position: absolute;
        top: 10px;
        right: 15px;
        height: 20px;
        line-height: 20px;
        font-size: 13px;
        margin-right: 10px;
        color: #939399;
        font-weight: normal;
        i {
          margin-right: 10px;
          font-size: 20px;
        }
        cursor: pointer;
      }
      .address{
        white-space:nowrap; 
        text-overflow:ellipsis; 
        overflow:hidden;
      }
      p{
        font-size: 16px;
        line-height: 44px;
        text-align: left;
      }
      .is-default{
        color: #019532
      }
      .set-default{
        color: #939399;
      }
    }
  }
  .add-address{
    cursor: pointer;
    margin-top: 30px;
    width:200px;
    height:40px;
    line-height: 40px;
    border:1px solid @orange;
    padding: 0 13px;
    border-radius: 4px;
    color: orange;
    cursor: pointer;
  }
}

</style>

