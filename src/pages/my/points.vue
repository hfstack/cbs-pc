<template>
  <div>
    <div class="my-points">
      <div class="point-null">
        <i class="iconfont points-icon">&#xe64a;</i>
        <div class="detail">
          <div class="points fl"><span class="zero">{{personal_integral}}</span><span class="points-content">Points</span></div>
          <p class="fl desc"><i class="iconfont icon">&#xe60c;</i>One point equals to U.S $0.01</p>
        </div>
      </div>
      <div class="history">
        <div class="history-title">History</div>
        <div class="content">
          <div class="content-list" v-if="integral.length > 0">
            <div class="clearfix content-item"  v-for="item in integral">
              <div class="fl">
                <p class="c-a">{{item.source_type}}</p>
                <div class="c-b">{{item.created_at}}</div>
              </div>
              <span class="fr c-c" :class="Number(item.integral) > 0 ? 'add' : 'reduce'">{{item.integral}}</span>
            </div>
          </div>
          <div class="empty" v-if="integral.length === 0">
             No history so far
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return  {
      personal_integral: 0,
      integral: [], // 历史纪录
      params: {
        page: 1
      }
    }
  },
  mounted() {
    this.getPoints();
  },
  methods: {
    getPoints: function() {
      this.request('PersonalIntegral', this.params).then((res) => {
        if(res.status === 200 && res.content) {
          this.integral = res.content.integral;
          this.personal_integral = res.content.personal_integral;
        }
      }, err => {
        this.$Toast(err);
      })
    }
  }
}
</script>
<style lang="less">
  .my-points {
    .point-null {
      position: relative;
      height: 160px;
      padding-top: 70px;
      // border-bottom: 1px solid #939399;
      background:rgba(254,254,254,1);
      box-shadow:1px 0px 0px rgba(240,240,243,1);
    }
    .points-icon{
      color: #fff;
      font-size: 28px;
      text-align: center;
      line-height: 59px;
      margin-right: 10px;
      position: absolute;
      left: 68px;
      display: block;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background-color: #FACC31;
      margin-top: 0;
    }
    .detail{
      padding-left: 137px;
      height: 60px;
      line-height: 60px;
      color: #939399;
      .icon{
        font-size: 22px;
        margin-right: 10px;
        color: #939399;
      }
      .desc {
         margin-left: 40px;
      }
    }
    .zero{
      display: inline-block;
      font-size: 45px;
      color: #000;
      margin-right: 10px;
      font-weight: bold;
    }
    .points{
      color: #000;
      height: 60px;
      line-height: 60px;
      span{
        display: inline-block;
      }
    }
    .points-content{
      line-height: 60px;
      vertical-align: top;
    }
    .history {
      padding: 30px;
      .history-title{
        font-size:20px;
        font-family:HelveticaNeue;
        font-weight:bold;
        color: #000;
        text-align: left;
      }
      .content{
        padding-top: 10px;
        color: #302F2F;
        font-family:PingFangSC-Regular;
      }
      .content-item{
        padding: 20px 0px;
        margin: 0 30px;
        height: 92px;
        border-bottom: 1px solid #E1E1E1;
        &:last-child {
          border-bottom: none;
        }
      }
      .c-a{
        color: #302F2F;
        font-size: 20px;
        font-weight: bold;
        text-align: left;
      }
      .c-b {
        color: #939399;
        font-size: 14px;
        margin-top: 9px;
      }
      .add{
        display: block;
        line-height: 52px;
        color: #FF0000
      }
      .reduce{
        display: block;
        line-height: 52px;
        color: #9ABD00
      }
    }
  }
</style>

