<template>
  <div class="c-nav">
    <ul class="c-nav-ul">
      <li class="nav-item" v-for="(item, index) in navs" :key="index">{{item.name}}</li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      navs: [
        {
          name: 'NEW IN'
        },
        {
          name: 'WOMEN'
        },
        {
          name: 'MEN'
        },
        {
          name: 'BEAUTY'
        },
        {
          name: 'KIDS & MOM'
        },
        {
          name: 'ELECTRONICS'
        },
        {
          name: 'HOME & LIVING'
        },
        {
          name: 'SPORTS'
        },
        {
          name: 'FLASH SALE'
        }
      ]
    };
  }
};
</script>
<style lang="less">
@import '~less/tool';
.c-nav{
  width: 100%;
  box-shadow:1px 0px 0px rgba(225,225,225,1);
}
.c-nav-ul{
  display: block;
  width: 1240px;
  margin: 0 auto;
  padding-left: 15px;
  .nav-item {
    float: left;
    margin-right: 73px;
    font-weight: bold;
    .height(30);
    &:last-child {
      margin-right:0;
    }
  }
  .clearfix();
}
</style>
