<template>
  <div class="c-nav">
    <ul class="c-nav-ul">
      <li class="nav-item" v-for="(item, index) in navs" :class="{'active': item.id === +cate}" :key="index">{{item.name}}</li>
      <!-- <li class="nav-item" v-for="(item, index) in category" :class="{'active': item.id === +cate}" :key="index">
        {{item.name}}
        <div class="sub-nav">
          <div v-for="ele in item.sub">
            <p class="sub-title">{{ele.name}}</p>
            <p v-for="p in ele.sub">{{p.name}}</p>
          </div>
        </div>
      </li> -->
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      cate: '',
      category: [],
      navs: [
        {
          name: 'NEW IN',
          id: 1
        },
        {
          name: 'WOMEN',
          id: 2
        },
        {
          name: 'MEN',
          id: 3
        },
        {
          name: 'BEAUTY',
          id: 4
        },
        {
          name: 'KIDS & MOM',
          id: 5
        },
        {
          id: 6,
          name: 'ELECTRONICS'
        },
        {
          name: 'HOME & LIVING',
          id: 7
        },
        {
          name: 'SPORTS',
          id: 8
        },
        {
          name: 'FLASH SALE',
          id: 9
        }
      ]
    };
  },
  mounted() {
    this.cate = this.$route.query.cate || '';
    // this.getCategory();
  },
  methods: {
    // 获取分类
    getCategory() {
      this.request('Category', {}).then((res) => {
        if (res.status === 200) {
          this.category = res.content || [];
        } else {
          this.$Messagebox({
            title: 'res.msg',
            type: 'error'
          })
        }
      })
    }
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
    margin-right: 70px;
    font-weight: bold;
    .height(30);
    &:last-child {
      margin-right:0;
    }
    cursor: pointer;
    &:hover{
      color: @orange
    }
    &.active{
      color: @orange;
      border-bottom: 3px solid @orange
    }
  }
  .clearfix();
}
</style>
