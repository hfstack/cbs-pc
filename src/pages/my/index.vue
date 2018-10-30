<template>
  <div>
    <headers></headers>
    <div class="c-my">
      <div class="siderbar">
        <p class="siderbar-title">{{selectedRouter}}</p>
        <ul class="siderbar-ul">
          <li class="siderbar-item" @click="getBarDetail(item)" v-for="(item, index) in bars" :key="index" :class="{'active': item.active }">{{item.title}}</li>
        </ul>
      </div>
      <div class="c-content">
        <p class="page-title">{{selectedRouter}}</p>
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
    getBarDetail: function(item) {
      this.$router.push({
        name: item.routerName
      });
    }
  }
};
</script>
<style lang="less">
@import '~less/tool.less';

.c-my {
  width: 1240px;
  min-height: 630px;
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
      color: @orange
    }
  }
  .c-content{
    width: 913px;
    .page-title{
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
