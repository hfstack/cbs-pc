<template>
  <div class="c-nav">
    <ul class="c-nav-ul">
      <li class="nav-item" v-for="(item, index) in category" @mouseover="catemousemove(item)"  @mouseout="item.show = false"  @click.capture="cateSelect(item)"  :class="{'active': item.id === firstSelect.id}" :key="index">
        <span class="first-cate" >{{item.name}}</span>
        <div class="sub-nav" v-show="item.show">
          <div v-for="ele in item.sub">
            <abbr class="sub-title" @click="cateSelect(ele)" title="" @mouseover="showTitle(e)" :class="{'active': ele.id === $route.query.cate}">{{ele.name}}</abbr>
            <p v-for="p in ele.sub" class="three-cate" @click="cateSelect(p)" :class="{'active': p.id === $route.query.cate}">{{p.name}}</p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      cate: '',
      category: []
    };
  },
  mounted() {
    this.cate = this.$route.query.cate || '';
    this.getCategory();
  },
  watch: {
    '$route.query': function() {
      this.cate = this.$route.query.cate || '';
    }
  },
  computed: {
    'firstSelect': function() {
      let firstSelect = {};
      if (!this.category.length) {
        return {};
      }
      for(let i = 0,len = this.category.length; i < len; i++) {
        const secondeCate = this.category[i].sub;
        let secondSelect = {};
        if (this.category[i].id === +this.$route.query.cate) {
          firstSelect = this.category[i];
        }
        secondeCate.length && secondeCate.forEach((item) => {
          const threeCate = item.sub;
          threeCate && threeCate.length && threeCate.forEach((ele) => {
            if(ele.id === +this.$route.query.cate) {
              console.log(ele)
              console.log(item)
              secondSelect = item;
            }
          })
        })
        if(secondSelect.id) {
          firstSelect = this.category[i];
        }
      }
      return firstSelect;
    }
  },
  methods: {
    showTitle(e){
      var e = e || window.event
      let target = e.target ||e.srcElement
      let text = target.innerText;
      this.$set(target,'title',text)
    },
    catemousemove(item) {
      // this.category.forEach((ele) => {
      //   ele.show = false;
      // })
      item.show = true;
    },
    getCategory() {
      this.request('PCCate').then((res) => {
        if (res.status === 200) {
          let cates = res.content.cates || [];
          cates.forEach(ele => {
            ele.show = false;
          });
          this.category = cates;
        } else {
          this.$Messagebox({
            title: 'res.msg',
            type: 'error'
          })
        }
      })
    },
    // 选中分类
    cateSelect(item) {
      this.category.forEach((ele) => {
        ele.show = false;
      })

      this.$router.push({
        name: 'categorySearch',
        query: {
          cate: item.id
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
  display: flex;
  justify-content: center;
  width: 1240px;
  margin: 0 auto;
  background: #fff;
  padding-left: 20px;
  // border: 1px solid black;
  .nav-item {
    font-family: Helvetica;
    font-weight: bold;
    position: relative;
    // border: 1px solid red;
    margin: 0 50px;
    .height(30);
    &:last-child {
      margin-right:0;
    }
    cursor: pointer;

    &.active{
      .first-cate{
        color: @orange;
        border-bottom: 3px solid @orange
      }
    }
  }
  .sub-nav{
    position: absolute;
    width: 200px;
    left: -26px;
    top: 31px;
    padding: 5px 26px;
    box-shadow: 0px 1px 5px 0px #eee, 0px 1px 10px 0px #eee;
    background: #fff;
    z-index: 100;
    .sub-title{
      display: block;
      text-decoration: none;
      color: #222222;
      font-weight: bold;
      white-space:nowrap;
      text-overflow:ellipsis;
      overflow:hidden;
      width:100%;
      &:hover {
      color: @orange;
    }
    }
    .three-cate {
      font-weight: normal;
      white-space:nowrap;
      text-overflow:ellipsis;
      overflow:hidden;
      width:100%;
    }
  }
  .first-cate{
    display: block;
    &:hover{
      color: @orange
    }
  }
  .three-cate{
     &:hover{
      color: @orange
    }
    &.active{
      color: @orange
    }
  }
  .clearfix();
}
</style>
