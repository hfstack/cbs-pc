<template>
  <div class="global-topbar">
    <div class="global-center">
      <template v-if="close">
        <a class="back" href="javascript:;" @click="pageBack"><i class="iconfont">&#xe63f;</i></a>
      </template>
      <template v-else>
        <router-link class="back" v-if="backUrl" :to="{path: '/' + backUrl}"><i class="iconfont" >&#xe62f;</i></router-link>
        <a class="back" href="javascript:;" v-else @click="pageBack"><i class="iconfont" >&#xe62f;</i></a>
      </template>
      <div class="title">{{title}}</div>
      <router-link :to="{path: '/cart?id=' + detailId}" v-if="$route.name === 'detail'">
        <i class="iconfont cart">&#xe624;</i>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // 数据
    title: {
      type: String,
      default: ''
    },
    // back url
    backUrl: {
      type: String,
      default: ''
    },
    // detail id
    detailId: {
      type: String,
      default: ''
    },
    close: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    pageBack() {
      this.$router.go(-1);
    }
  }
};
</script>
