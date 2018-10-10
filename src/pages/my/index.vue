<template>
  <div>
    <headers></headers>
    <div class="c-my">
      <div class="siderbar">
        <p class="siderbar-title">{{selectedRouter}}</p>
        <ul class="siderbar-ul">
          <li class="siderbar-item" @click="getBarDetail(item)" v-for="(item, index) in bars" :key="index" :class="{'active': item.title === selectedRouter }">{{item.title}}</li>
        </ul>
      </div>
      <div class="c-content">
        <p class="title">{{selectedRouter}}</p>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      title: '',
      bars: [
        {
          title: 'My Account',
          routerName: 'myAccount'
        },
        {
          title: 'My Orders',
          routerName: 'myOrders'
        },
        {
          title: 'My Points',
          routerName: 'myPoints'
        },
        {
          title: 'My Coupons',
          routerName: 'myCoupons'
        },
        {
          title: 'My Balance',
          routerName: 'myBalance'
        },
        {
          title: 'History View',
          routerName: 'historyView'
        },
        {
          title: 'Address Book',
          routerName: 'myAddress'
        },
        {
          title: 'Profile',
          routerName: 'myProfile'
        }
      ]
    }
  },
  computed: {
    selectedRouter: function() {
      let selectName = '';
      const name = this.$route.name;
      const result = this.bars.filter((item) => {
        return item.routerName === name;
      })
      for(let i = 0; i < this.bars.length; i++) {
        if(this.bars[i].routerName === name) {
          selectName = this.bars[i].title;
        }
      }
      return selectName;
    }
  },
  methods: {
    getBarDetail: function(item) {
      this.$router.push({
        name: item.routerName
      })
    }
  }
}
</script>
<style lang="less">
.c-my {
  width: 1240px;
  height: 630px;
  margin: 0 auto;
  margin-top: 10px;
  background: #fff;
  position: relative;
  padding-left: 267px;
  .siderbar {
    position: absolute;
    left: 0;
    top: 0;
    width: 267px;
    padding: 20px 18px;
    .siderbar-ul {
      border-right: 1px solid #E1E1E1;
    }
    .siderbar-title{
      font-size: 24px;
      color: #222;
      text-align: left;
      padding-bottom: 22px;
      border-right: 1px solid #E1E1E1;
    }
    .siderbar-item{
      height: 44px;
      line-break: 44px;
      padding-left: 20px;
      text-align: left;
      cursor: pointer;
      font-weight: bold;
    }
    .active {
      color: #FF473C;
    }
  }
  .c-content{
    .title{
      margin: 0 30px;
      text-align: center;
      height: 62px;
      line-height: 62px;
      font-size: 24px;
      color: #222;
      border-bottom: 1px solid #E1E1E1;
    }
  }
}
</style>


