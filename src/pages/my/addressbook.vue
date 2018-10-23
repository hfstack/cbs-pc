<template>
  <div class="address-book">
    <ul class="address-list clearfix">
      <li class="address-item fl">
        <div class="line"></div>
        <p>
          QIAN.XIAO
          <span class="edit"><i class="iconfont">&#xe621;</i>Edit</span>
          <span class="delete"><i class="iconfont">&#xe63d;</i>Delete</span>
        </p>
        <p>+001123455534545</p>
        <p>608 kingsley st</p>
        <p>United States, 61761</p>
        <p class="is-default">Default Shopping Address</p>
      </li>
      <li class="address-item fl">
        <div class="line"></div>
        <p>
          QIAN.XIAO
          <span class="edit"><i class="iconfont">&#xe621;</i>Edit</span>
          <span class="delete"><i class="iconfont">&#xe63d;</i>Delete</span>
        </p>
        <p>+001123455534545</p>
        <p>608 kingsley st</p>
        <p>United States, 61761</p>
        <p class="set-default"><span class="icon-select"></span>Set as Default Shipping Address</p>
      </li>
    </ul>
    <div class="add-address">
      + ADD NEW ADDRESS
    </div>
  </div>
</template>
<script>
export default {
  data() {

  },
  mounted() {

  },
  methods: {

  }
}
</script>
<style lang="less">
.address-book{
  padding-top: 20px;
  .address-list{
    .address-item{
      width: 445px;
      height: 230px;
      padding: 5px 14px 5px 30px; 
      position: relative; 
      background-color: #E4E4E4;
      box-shadow:0px 0px 0px 0px rgba(228,228,228,1), 0px 0px 0px 0px rgba(228,228,228,1), 0px 0px 0px 0px rgba(228,228,228,1);
      &:nth-child(odd) {
        margin-right: 20px;
      }
      .line{
        position: absolute;
        left: 0;
        width: 8px;
        height: 100%;
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
      p{
        font-size: 16px;
        font-weight: bold;
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
    margin-top: 30px;
    width:200px;
    height:40px;
    line-height: 40px;
    border:1px solid rgba(222,82,94,1);
    border-radius:4px;
    color: #DE525E;
    cursor: pointer;
  }
}

</style>

