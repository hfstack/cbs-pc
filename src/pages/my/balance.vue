<template>
  <div>
    <div class="my-card-main">
      <a  href="javascript:;" class="card-detail clearfix">
        <div class="img fl">
          <i class="iconfont">&#xe655;</i>
        </div>
        <div class="info fl clearfix">
          <div class="label fl">Balance: </div>
          <div class="price fl">${{money}}</div>
        </div>
      </a>
      <ul class="card-info clearfix">
        <li>
          <a href="javascript:;">
            <i class="iconfont">&#xe695;</i>
            <div class="value">${{income}}</div>
            <p>Accumulated Income</p>
          </a>
        </li>
        <li>
          <a href="javascript:;">
            <i class="iconfont">&#xe694;</i>
            <div class="value">${{wait_account}}</div>
            <p>Wait for an account</p>
          </a>
        </li>
        <li>
          <a href="javascript:;">
            <i class="iconfont">&#xe697;</i>
            <div class="value">${{funs}}</div>
            <p>My fans</p>
          </a>
        </li>
      </ul>
    </div>
    <div class="account-detial">
      <p class="account-detail-title">Details</p>
      <ul class="navs">
        <li v-for="(item, index) in navs" @click="navsChange(item)" :key="index" :class="{'active': item.active}">{{item.name}}</li>
      </ul>
      <div class="detail-list" :style="detailHeight">
        <div v-for="item in finance" class="detail-item finance" :key="item.id" v-if="type === 'balance'">
          <p class="item item1 clearfix"><span class="name fl">{{item.operate_type}}</span><span class="price fr" :style="{'color': item.amount > 0 ? '#FF0000' : '#9ABD00'}">{{item.amount > 0 ? '+ $' + Math.abs(item.amount) : '- &' + Math.abs(item.amount)}}</span></p>
          <p class="item item2 clearfix"><span class="detail fl">{{item.operate_description}}</span><span class="time fr">{{item.created_at}}</span></p>
        </div>
        <div v-for="item in incomes" class="detail-item incomes" :key="item.id" v-if="type === 'income'">
          <img class="avator" :src="item.image" />
          <p class="item item1 clearfix"><span class="name fl">{{item.type}}</span><span class="price fr" :style="{'color': item.amount > 0 ? '#FF0000' : '#9ABD00'}">{{item.amount > 0 ? '+ $' + Math.abs(item.amount) : '- &' + Math.abs(item.amount)}}</span></p>
          <p class="item item2 clearfix"><span class="detail fl">{{item.description}}</span><span class="time fr">{{item.date}}</span></p>
        </div>
        <div v-for="item in waits" class="detail-item waits" :key="item.id" v-if="type === 'wait'">
          <img class="avator"  :src="item.image"/>
          <p class="item item1 clearfix"><span class="name fl">{{item.type}}</span><span class="price fr" :style="{'color': item.amount > 0 ? '#FF0000' : '#9ABD00'}">{{item.amount > 0 ? '+ $' + Math.abs(item.amount) : '- &' + Math.abs(item.amount)}}</span></p>
          <p class="item item2 clearfix"><span class="detail fl">{{item.description}}</span><span class="time fr">{{item.date}}</span></p>
        </div>
         <div class="fans"  v-if="type === 'fans'">
           <table>
             <tr>
               <th>Fans Info</th>
               <th>Her fans</th>
               <th>Benefit</th>
             </tr>
             <tbody>
                <tr v-for="item in fans" :key="item.id">
                  <td>
                    <img class="img" :src="item.image" alt="">
                    <div style="text-align: left">
                      <p class="name">{{item.name}}</p>
                      <p class="date">{{item.date}}</p>
                    </div>
                  </td>
                  <td style="color: #FF0000">
                    {{item.sub_fans}}
                  </td>
                  <td :style="{'color': item.benefit > 0 ? '#FF0000' : '#9ABD00'}">
                    {{item.benefit > 0 ? '+ $' + Math.abs(item.benefit) : '- &' + Math.abs(item.benefit)}}
                  </td>
                </tr>
             </tbody>
            
           </table>
          <!-- <img class="avator" :src="item.image"/>
          <p class="item item1 clearfix"><span class="name fl">{{item.operate_type}}</span><span class="price fr" :style="{'color': item.amount > 0 ? '#FF0000' : '#9ABD00'}">{{item.amount > 0 ? '+ $' + Math.abs(item.amount) : '- &' + Math.abs(item.amount)}}</span></p>
          <p class="item item2 clearfix"><span class="detail fl">{{item.operate_description}}</span><span class="time fr">{{item.created_at}}</span></p> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      money: 0,
      integral: 0,
      wait_account: 0,
      income: 0,
      funs: 0,
      navs: [
        {
          id: '',
          active: true,
          type: 'balance',
          name: 'Balance'
        },
        {
          id: '',
          active: false,
          type: 'income',
          name: 'Accumulated Income'
        },
        {
          id: '',
          active: false,
          type: 'wait',
          name: 'Wait for an account'
        },
        {
          id: '',
          active: false,
          type: 'fans',
          name: 'My Fans'
        }
      ],
      finance: [],
      waits: [],
      incomes: [],
      fans: [],
      type: '',
      isFinishedLoading: true, // 停止loading
      loadingEmpty: false // 结束loading
    };
  },
  computed: {
    detailHeight: () => {
      if(this.type === 'balance' && this.finance.length > 10) {
        return {
          height: '900px',
          overflow: 'scrollY'
        }
      } else if (this.type === 'income' && this.incomes.length > 10) {
        return {
          height: '900px',
          overflow: 'scrollY'
        }
      } else if (this.type === 'wait' && this.waits.length > 10) {
        return {
          height: '900px',
          overflow: 'scrollY'
        }
      } else if (this.type === 'fans' && this.fans.length > 10) {
        return {
          height: '900px',
          overflow: 'scrollY'
        }
      }
    }
  },
  mounted() {
    this.type = this.$route.query.type || 'balance'
    this.getPersonalIndex();
    this.getDetail();
  },
  methods: {
    getDetail() {
      this.isFinishedLoading = false;
      this.loadingEmpty = false;
      if (this.type === 'balance') {
        this.getFinanceDetail();
      } else if (this.type === 'income') {
        this.getIncome();
      } else if (this.type === 'wait') {
        this.getAccount();
      } else if(this.type === 'fans') {
        this.getFans();
      }
    },
    // 个人主页
    getPersonalIndex() {
      this.request('PersonalIndex').then((res) => {
        if (res.status === 200) {
          this.isFinishedLoading = true;
          this.money = res.content.money; // 用户余额
          this.integral = res.content.integral; // 积分
          this.wait_account = res.content.wait_account; // 待入账
          this.income = res.content.income; // 收入
          this.funs = res.content.funs;
          if (this.page === res.content.total_page) {
            this.loadingEmpty = true;
          }
        }
      });
    },
    getFinanceDetail() {
      this.request('PersonalFinance').then((res) => {
        if (res.status === 200) {
          this.isFinishedLoading = true;
          this.money = res.content.money || 0;
          this.finance = res.content.finance || 0;
        } else {
          this.$Messagebox({
            title: res.msg || '',
            type: 'error'
          });
        }
      });
    },
    // 累计收益
    getIncome() {
      this.request('PersonalIncome', {
        page: this.page
      }).then((res) => {
        if (res.status === 200) {
          this.isFinishedLoading = true;
          this.incomes = res.content.incomes || [];
          if (this.page === res.content.total_page) {
            this.loadingEmpty = true;
          }
        } else {
          this.$Messagebox({
            title: res.msg || '',
            type: 'error'
          });
        }
      }, err => {
        this.$Messagebox({
          title: err.data.msg || '',
          type: 'error'
        });
      });
    },
    // 待入账
    getAccount() {
      this.request('PersonalAccount', {
        page: this.page
      }).then((res) => {
        if (res.status === 200) {
          this.isFinishedLoading = true;
          this.waits = res.content.incomes || [];
          if (this.page === res.content.total_page) {
            this.loadingEmpty = true;
          }
        } else {
          this.$Messagebox({
            title: res.msg || '',
            type: 'error'
          });
        }
      }, err => {
        this.$Messagebox({
          title: err.data.msg || '',
          type: 'error'
        });
      });
    },
    navsChange(item) {
      this.page = 1;
      this.navs.forEach(element => {
        element.active = false;
      });
      item.active = true;
      this.type = item.type;
      this.getDetail();
    },
    getFans() {
      this.request('PersonalFans', {
        page: this.page
      }).then((res) => {
        if (res.status === 200) {
          this.isFinishedLoading = true;
          this.fans = res.content.incomes || [];
          if (this.page === res.content.total_page) {
            this.loadingEmpty = true;
          }
        } else {
          this.$Messagebox({
            title: res.msg || '',
            type: 'error'
          });
        }
      }, err => {
        this.$Messagebox({
          title: err.data.msg || '',
          type: 'error'
        });
      });
    },
    // 加载更多
    loadMore () {
      let self = this;
      window.onscroll = function () {
        var a = document.documentElement.scrollTop || document.body.scrollTop; // 滚动条y轴上的距离
        var b = document.documentElement.clientHeight || document.body.clientHeight; // 可视区域的高度
        var c = document.documentElement.scrollHeight || document.body.scrollHeight; // 可视化的高度与溢出的距离（总高度）
        if (a + b >= c - 200 && self.isFinishedLoading && !self.loadingEmpty) {
          self.page = self.page + 1;
          self.getDetail();
        }
      }
    },
  }
};
</script>

<style lang="less">
@import '~less/tool.less';
.my-card-main {
  margin: 0 auto;
  width: 910px;
  height: 250px;
  background-color: #fff;
  .card-detail {
    position: relative;
    display: block;
    .img {
      margin-left: 40px;
      margin-top: 50px;
      width: 60px;
      height: 60px;
      text-align: center;
      border-radius: 50%;
      background-color: #ff473c;
      i {
        display: inline-block;
        color: #fff;
        font-size: 30px;
        line-height: 60px;
      }
    }
    .info {
      margin-top: 50px;
      .label {
        margin-left: 8px;
        font-weight: bold;
        margin-top: 22px;
        vertical-align: text-bottom;
      }
      .price {
        margin-top: 12px;
        margin-left: 10px;
        color:#000000;
        font-size: 28px;
        font-weight: bold;
      }
    }
    // .btn, .iright {
    //   position: absolute;
    //   color: @gray2;
    // }
    .btn {
      height: 30px;
      top: 75px;
      right: 80px;
    }
    .iright {
      height: 40px;
      top: 70px;
      right: 30px;
    }
  }
  .card-info {
    display: block;
    width: 100%;
    margin-top: 40px;
    li {
      float: left;
      width: 33.3%;
      a {
        display: block;
        text-align: center;
      }
      i {
        display: inline-block;
        color: #ff696d;
        font-size: 25px;
      }
      .value {
        color: #FF473C;
        margin-top: 10px;
        font-size: 16px;
      }
      p {
        color: #939399;
        text-align: center;
        font-size: 16px;
        line-height: 18px;
      }
    }
  }
}
.account-detial{
  width: 913px;
  margin: 0 auto;
  .account-detail-title {
    margin-top: 30px;
    margin-left: 10px;
    font-weight: #000000;
    font-size: 18px;
    text-align: left;
  }
  .navs{
    height: 36px;
    margin-top: 20px;
    li {
      float: left;
      color: #141414;
      width: 228px;
      height: 36px;
      border: 1px solid #444;
      border-right: none;
      line-height: 36px;
      cursor: pointer;
      text-align: center;
    }
    .active{
      background: #444444;
      color: #fff;
    }
    li:last-child{
      border-right: 1px solid #444;
    }
  }
  .detail-list{
    margin-top: 10px;
    background: #F7F9FA;
    .detail-item{
      box-sizing: border-box;
      width: 100%;
      height: 90px;
      padding-top: 16px;
      border-bottom: 1px solid #CACACA;
      position: relative;
      padding-left: 110px;
      padding-right: 40px;
      &.finance{
        padding-left: 40px;
      }
    }
    .fans{
      padding: 0 40px;
      table{
        width: 100%;
      }
      th{
        width: 33%;
        height: 60px;
        line-height: 60px;
        font-size: 20;
        font-weight: 400;
        color: #302F2F
      }
      tr{
        height: 90px;
        border-bottom: 1px solid #CACACA;
        .img{
          width: 65px;
          height: 65px;
          border-radius: 50%; 
        }
      }
      .name{
       font-size: 20px;
       color: #302F2F
      }
      .fans{
        color: @gray;
        margin-top: 15px;
      }
      td{
        text-align: center;
      }
    }
    .avator{
      position: absolute;
      top: 13px;
      left: 32px;
      width: 65px;
      height: 65px;
      border-radius: 50%;
    }
    .name{
      font-size: 20px;
      color: #302F2F;
    }
    .time{
      color: #302F2F;
      font-size: 16px;
    }
    .detail{
      color: #939399;
      font-size: 16px;
    }
    .price{
      font-size: 20px;
      color: #FF0000;
      font-weight: 400;
    }
    .item1{
      line-height: 37px;

    }
    span{
      display: inline-block;
    }
  }
}
</style>
