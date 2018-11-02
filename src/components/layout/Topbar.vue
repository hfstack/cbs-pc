<template>
  <div class="topbar">
    <div class="content">
      <div class="lang fl">English</div>
      <div class="area fl">USD</div>
      FREE SHIPPING on orders over $19.00
      <div class="contact fr">Contact us</div>
      <div class="l-r fr" @click="login"  @mouseover="openNavs" v-if="!userToken">Log in | Register</div>
      <div class="l-r fr" @mouseover="openNavs" @mouseout="() => {personalBar = false}" v-if="userToken">{{userName}}
        <template v-if="personalBar">
          <span class="arrow"></span>
          <ul class="personal-navs">
            <li v-for="item in bars"><router-link :class="{'active': item.active}" :to="{name: item.routerName}">{{item.title}}</router-link></li>
            <li @click="signout"><a href="javascript:;">Sign Out</a></li>
          </ul>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userToken: localStorage.getItem('userToken'),
      userName: localStorage.getItem('userName') || window.localStorage.getItem('userEmail') || 'welcome!',
      personalBar: false,
      bars: [
        {
          title: 'My Account',
          routerName: 'myAccount',
          active: false
        },
        {
          title: 'My Orders',
          routerName: 'myOrders',
          active: false,
          children: [
            {
              title: 'Orders Details',
              routerName: 'orderDetail',
            }
          ]
        },
        {
          title: 'My Points',
          active: false,
          routerName: 'myPoints'
        },
        {
          title: 'My Coupons',
          active: false,
          routerName: 'myCoupons'
        },
        {
          title: 'My Balance',
          active: false,
          routerName: 'myBalance'
        },
        {
          title: 'History View',
          active: false,
          routerName: 'historyView'
        },
        {
          title: 'Address Book',
          active: false,
          routerName: 'addressBook'
        },
        {
          title: 'Profile',
          active: false,
          routerName: 'profile'
        }
      ]
    };
  },
  computed: {
    selectedRouter: function() {
      let selectName = '';
      const name = this.$route.name;
      for (let i = 0; i < this.bars.length; i++) {
        this.bars[i].active = false
        if (this.bars[i].routerName === name) {
          selectName = this.bars[i].title;
          this.bars[i].active = true
        }
        if(this.bars[i].children && this.bars[i].children.length) {
          this.bars[i].children.forEach(element => {
            if (element.routerName === name) {
              selectName = element.title;
              this.bars[i].active = true
            }
          });
        }
      }
      return selectName;
    }
  },
  methods: {
    login: function() {
      this.$router.push({
        name: 'login'
      })
    },
    // 打开导航
    openNavs() {
      this.personalBar = true;
    },
    signout() {
      localStorage.removeItem('userToken');
      this.$router.push({
        name: 'login'
      })
    }
  }
};
</script>
<style lang="less">
@import '~less/tool';
.topbar{
  height: 40px;
  width: 100%;
  background-color: #333333;
  .content {
    margin: 0 auto;
    width: 1240px;
    text-align: center;
    color: #fff;
    line-height: 40px;
    font-size: 12px;
    .contact{
      margin-left: 30px;
      cursor: pointer;
    }
    .lang{
      margin-right: 30px;
    }
    .l-r{
      cursor: pointer;
      position: relative;
    }
  }
  .arrow {
    position: absolute;
    right: 20px;
    top: 23px;
    width:0;
    height:0;
    border: 8px solid transparent;
    border-bottom-color: #fff;//左箭头
  }
  .personal-navs{
    position: absolute;
    right: 0;
    top: 40px;
    width:146px;
    height:370px;
    background:rgba(255,255,255,1);
    box-shadow:0px 3px 5px 0px rgba(225,225,225,1), 0px 3px 10px 0px rgba(225,225,225,1);
    z-index: 999;
    li {
      line-height: 40px;
      a:hover{
        color: @orange
      }
      a:active{
        color: @orange
      }
    }
  }
}
</style>
