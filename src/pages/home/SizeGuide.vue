<template>
  <div class="size-guide" v-show="show">
    Size Guide
  </div>
</template>

<script>
export default {
   props: {
    show: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {}
  },
  methods: {
  }
}
</script>

<style lang="less">
@import "~less/tool.less";
.size-guide {
  font-weight: bold;
  text-decoration:underline;
  color: @gray;
  position: absolute;
  left: 45px;
  top: -1px;
  cursor: pointer;
}
</style>


