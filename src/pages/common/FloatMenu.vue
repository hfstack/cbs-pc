<template>
  <div class="global-float-menu" v-show="show">
    <div class="float-menu">
      <div class="btn-menu" :class="{'cur': isBackMenuShow}" @click="clickBackMenu">{{isBackMenuShow ? 'BACK' : 'MENU'}}</div>
      <ul class="a-fadeinB" :class="{'show': isBackMenuShow}">
        <li>
          <div class="name">HOME</div>
          <router-link :to="{path: '/home'}"><i class="iconfont">&#xe618;</i></router-link>
        </li>
        <li>
          <div class="name">CATEGORIES</div>
          <router-link :to="{path: '/categories'}"><i class="iconfont">&#xe620;</i></router-link>
        </li>
        <li>
          <div class="name">CART</div>
          <router-link :to="{path: '/cart'}"><i class="iconfont">&#xe624;</i></router-link>
        </li>
        <li>
          <div class="name">Account</div>
          <router-link :to="{path: '/my'}"><i class="iconfont">&#xe62b;</i></router-link>
        </li>
      </ul>
    </div>
    <div class="bg-mask" :class="{'show': isMaskShow}" @click="clickChangeMask"></div>
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
    return {
      isBackMenuShow: false, // back菜单按钮
      isMaskShow: false
    }
  },
  methods: {
    // 返回菜单
    clickBackMenu () {
      this.isMaskShow = !this.isMaskShow;
      this.isBackMenuShow = !this.isBackMenuShow;
      document.documentElement.style.overflow = this.isMaskShow ? 'hidden' : 'auto';
    },
    // 点击黑点底层
    clickChangeMask() {
      this.isMaskShow = !this.isMaskShow;
      document.documentElement.style.overflow = 'auto';
      this.isBackMenuShow = false;
    }
  }
}
</script>

<style lang="less">
@import "~less/tool.less";
.global-float-menu {
  .float-menu {
    position: fixed;
    z-index: 101;
    right: 30/@rem;
    bottom: 200/@rem;
    width: 88/@rem;
    height: 88/@rem;

    .btn-menu {
      // opacity: 0;
      display: inline-block;
      width: 88/@rem;
      height: 88/@rem;
      // line-height: 88/@rem;
      line-height: 0.85rem;
      border: 1px solid @gray3;
      border-radius: 50%;
      background-color: #FFF;
      text-align: center;
      box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.1);
      &.cur {
        background-color: @red;
        color: #fff;
        border: 1px solid @red;
      }
    }
    ul {
      display: none;
      position: absolute;
      right: 0;
      bottom: 90/@rem;
      &.show {
        display: block;
      }
      li {
        position: relative;
        width: 260/@rem;
        height: 80/@rem;
        margin-bottom: 30/@rem;
        .name {
          width: 170/@rem;
          height: 80/@rem;
          padding-top: 25/@rem;
          text-align: right;
          color: #fff;
        }
        a {
          position: absolute;
          top: 0;
          right: 0;
          display: inline-block;
          width: 80/@rem;
          height: 80/@rem;
          line-height: 80/@rem;
          border-radius: 50%;
          background-color: #FFF;
          text-align: center;
          i {
            display: inline-block;
          }
        }
        &:nth-child(3) a > i {
          margin-top: .03rem;
          margin-left: -.01rem;
        }
      }
    }
  }
}
</style>


