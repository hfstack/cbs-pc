<template>
    <div class="confirm-modal" v-if="show">
      <div class="confirm">
        <i class="iconfont confirm-close" @click="close">&#xe63f;</i>
        <div class="confirm-header" v-if="title">{{title}}</div>
        <div class="confirm-content">{{content}}</div>
        <div class="confirm-footer">
          <div v-if="type === 'confirm'" class="confirm-type-a">
            <a href="javascript:;" class="cancle" @click="cancle">{{cancleText}}</a>
            <a href="javascript:;" class="sure" @click="sure">{{okText}}</a>
          </div>
          <div v-else class="confirm-type-b">
            <a href="javascript:;" @click="sure">{{okText}}</a>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    onOk: {
      type: Function,
      default: () => {}
    },
    content: {
      type: String,
      default: ''
    },
    cancleText: {
      type: String,
      default: 'No'
    },
    okText: {
      type: String,
      default: 'Yes'
    },
    type: {
      type: String,
      default: 'confirm'
    }
  },
  data() {
    return {
       
    }
  },
  methods: {
    // 确认
    sure: function() {
      if(this.type === 'confirm') {
        this.onOk();
      } else {
        this.cancle();
      }
    },
    cancle: function() {
      this.$emit('update:show', false)
    },
    close: function() {
      this.$emit('update:show', false)
    }
  }
}
</script>
<style lang="less">
@import "~less/tool.less";
.confirm-modal {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0,0, 0, .4);
  z-index: 1000;
  .confirm{
    background: #fff;
    width: 530px;
    border-radius: 4px;
    padding: 30px 85px;
    padding-top: 45px;
    margin: 0 auto;
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    margin-top: -95px;
  }
  .confirm-header{
    font-size: 20px;
    color: #141414;
    font-weight: bold;
    text-align: center;
    padding: 15px 0;
  }
  .confirm-content {
    font-size: 16px;
    color: #141414;
    text-align: center;
    line-height: 30px;
    margin-bottom: 30px;
  }
  .confirm-close{
    position: absolute;
    right: 10px;
    top: 10px;
    font-size: 12px;
    cursor: pointer;
  }
  .confirm-footer {
    height: 36px;
    margin: 0 auto;
    a{
      width: 160px;
      display: block;
      color: @orange;
      font-size: 16px;
      height: 36px;
      line-height: 36px;
      text-align: center;
      border: 1px solid @orange;
      border-radius:4px
    }
    .confirm-type-a a{
      float: left;
    }
    .confirm-type-b a{
      width: 100%;
    }
    .cancle{
      margin-right: 40px;
    }
    .sure{
      background: @orange;
      color: #fff;
    }
  }
  
}
</style>


