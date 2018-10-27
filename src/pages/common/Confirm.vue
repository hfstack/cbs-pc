<template>
    <div class="confirm-modal" v-if="show">
      <div class="confirm">
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
    width: 600/@rem;
    border-radius: 16/@rem;
    padding-top: 57/@rem;
    margin: 0 auto;
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    margin-top: -140/@rem;
  }
  .confirm-header{
    font-size: 34/@rem;
    color: #141414;
    font-weight: bold;
    text-align: center;
    margin-bottom: 30/@rem;
  }
  .confirm-content {
    font-size: 26/@rem;
    color: #141414;
    text-align: center;
    line-height: 30/@rem;
    margin-bottom: 40/@rem;
  }
  .confirm-footer {
    height: 95/@rem;
    border-top: 1px solid #E4E4E4;
    margin: 0 auto;
    a{
      display: block;
      color: #0C7BFF;
      font-size: 30/@rem;
      height: 95/@rem;
      line-height: 95/@rem;
      text-align: center;
      font-weight: bold
    }
    .confirm-type-a a{
      width: 50%;
      float: left;
    }
    .confirm-type-b a{
      width: 100%;
    }
    .cancle{
      border-right: 1px solid #E4E4E4;
    }
  }
  
}
</style>


