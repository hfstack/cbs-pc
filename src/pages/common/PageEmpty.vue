<template>
    <div class="page-empty" :style="{'margin-top': marginTop / rem + 'rem'}">
      <div class="empty-icon"><i class="iconfont" v-html="icon"></i></div>
      <p class="desc">
        {{desc}}
      </p>
    </div>
</template>
<script>
export default {
  props: {
    icon: {
      type: String,
      default: ''
    },
    desc: {
      type: String,
      default: ''
    },
    marginTop: {
      type: Number,
      default: 280
    }
  },
  data() {
    return {
      rem: 100
    }
  }
}
</script>
<style lang="less">
@import "~less/tool.less";
.page-empty{
  margin: 0 auto;
  .empty-icon{
    margin: 0 auto;
    width: 180/@rem;
    height: 180/@rem;
    border-radius: 50%;
    color: #fff;
    background-color: #DEDEDE;
    text-align: center;
    .iconfont{
      font-size: 100/@rem;
      line-height: 180/@rem;
    }
  }
  .desc{
    width: 100%;
    margin-top: 36/@rem;
    color: #393939;
    font-size: 32/@rem;
    line-height: 40/@rem;
    text-align: center;
    padding: 0 35/@rem;
  }
}
</style>

