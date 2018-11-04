<template>
  <div class="my-orders">
    <ul class="order-tabs">
      <li v-for="item in tabs" :key="item.type" @click="tabClick(item)" :class="{'active': item.active}" class="order-tabitem">
        {{item.name}}
      </li>
    </ul>
    <table class="tab-orders">
      <thead>
        <tr class="tr-header">
          <th v-bind:class="column.className" v-bind:style="{width: column.width + 'px'}" v-for="(column, index) in columns" :key="index">
            {{column.title}}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr class="tr-items" v-for="(item, index) in orders" :key="index">
          <template v-for="column in columns">
            <template v-if="column.action">
              <td v-if="column.goods">
                <div class="order-goods">
                  <div :style="{'width': '100px'}">
                    <img v-show="ele.show" class="product-img" v-for="ele in item.ordergoods" width="100" height="100" :src="ele.img" />
                    <p>{{item.ordergoods.length}} items</p>
                    <span class="turn-left" @click="turnClick(item.ordergoods, 'left')"></span>
                    <span class="turn-right"  @click="turnClick(item.ordergoods,'right')"></span>
                  </div>
                </div>
              </td>
              <td class="td-actions" v-else>
                <div class="operate-item operate-two" v-if="item.orderHandle.pay"><router-link :to="{path: '/cart/secure?orderId=' + item.orderid}">Pay now {{item.finalTime || ''}}</router-link></div>
                <div class="operate-item operate-two" @click="handleCollect(item)" v-if="item.orderHandle.collect">I get it</div>
                <div class="operate-item operate-one" @click="getLogistics(item)" v-if="item.orderHandle.logistic">Logistics Info</div>
                <div class="operate-item operate-one" v-if="item.orderHandle.delete" @click="handleDelete(item)">Delete</div>
              </td>
            </template>
            <template v-else>
              <td v-if="column.render" v-html="column.render(item[column.dataIndex] || '', item, index)">
              </td>
              <td v-else v-html="item[column.dataIndex]"> </td>
            </template>
          </template>
        </tr>
      </tbody>
    </table>
    <confirm :show.sync="confirmModal.show" :title="confirmModal.title"  :content="confirmModal.content" :on-ok="confirmModal.action"  okText="Yes"></confirm>
  </div>
</template>
<script>
export default {
  data() {
    const columns = [
      {
        title: 'Order NO. & Date',
        render: function(text, item, index) {
          return '' +
          '<p class="order-no">' + item.orderid + '</p>' +
          '<p class="order-time">' + item.ordertime + '</p>';
        }
      },
      {
        title: 'Products',
        width: '160',
        action: true,
        goods: true,
        // render: function(text, item, index) {
        //   let str = `<div class="order-goods"><div style="width: ${100 * item.ordergoods.length}px">`;
        //   for (let i = 0; i < item.ordergoods.length; i++) {
        //     str += `<img class="product-img" width="100" height="100" src="${item.ordergoods[i].img}" />`;
        //   }
        //   str += `</div><p>${item.ordergoods.length} items</p><span class="turn-left"></span><span class="turn-right"></span></div>`;
        //   return str;
        // }
      },
      {
        title: 'Order Total',
        dataIndex: 'orderTotal',
        render: function(text, item, index) {
          var str = `<p class="order-total">$${item.total_amount}</p>`;
          return str;
        }
      },
      {
        title: 'Order Status',
        dataIndex: 'orderstatus',
        render: function(text, item, index) {
          const str = `<p class="order-status">${item.orderHandle.orderStatusDesc}</p><p class="order-detail"><a href="orders/detail?orderId=${item.orderid}">Track Order Details</a></p>`;
          return str;
        },
      },
      {
        title: 'Operation',
        action: true
      }
    ];
    return {
      finalTime: 0,
      orders: [],
      params: {
        page: 1
      },
      columns: columns,
      confirmModal: {},
      loadingContent: '',
      isFinishedLoading: true,
      loadingEmpty: false,
      tabs: [
        {
          name: 'Unpaid',
          active: false,
          type: 1
        },
        {
          name: 'Shipping',
          active: false,
          type: 4
        },
        {
          name: 'All',
          active: true,
          type: 0
        }
      ]
    };
  },
  mounted() {
    this.getOrderList();
    this.loadMore();
  },
  methods: {
    tabClick(item) {
      this.tabs.forEach(element => {
        element.active = false;
      });
      item.active = true;
      this.params.type = item.type;
      this.getOrderList();
    },
    // 获取订单的可操作项
    getOrderHandle(item) {
      let handle = {};
      if (+item.orderstatus === 1) {
        handle.orderStatusDesc = 'Unpaid';
        handle.delete = true;
        handle.pay = true;
      } else if (+item.orderstatus === 3) {
        handle.orderStatusDesc = 'Preparing';
      } else if (+item.orderstatus === 4) {
        handle.orderStatusDesc = 'Shipped';
        // 确认收货、查看物流信息
        handle.logistic = true;
        handle.collect = true;
      } else if (+item.orderstatus === 5) {
        handle.orderStatusDesc = 'Delivered';
      } else if (+item.orderstatus === 6) {
        handle.orderStatusDesc = 'Cancelled';
        handle.delete = true;
      }
      return handle;
    },
    turnClick(data, type) {
      let cindex = 0;
      data.forEach((item, index) => {
        if(item.show) {
          cindex = index;
        }
        item.show = false;
      })
      if(type === 'left') {
        cindex === 0 ? cindex = data.length - 1 : cindex -= 1;
        console.log(cindex)
      }
      if(type === 'right') {
        cindex === data.length-1 ? cindex = 0 : cindex += 1
      }
      data[cindex]['show'] = true;
    },
    getOrderList() {
       // 初始化
      this.loadingContent = 'Loading...';
      this.isFinishedLoading = false;
      this.loadingEmpty = false;
      if (this.params.page === 1) {
        this.orders = [];
      }
      this.request('OrdersList', this.params).then((res) => {
        if (res.status === 200) {
          let orders = res.content.orderData || [];
          orders.forEach((item) => {
            item.orderHandle = this.getOrderHandle(item);
            item.ordergoods.forEach((ele, index) => {
              if(index === 0) {
                ele.show = true;
              } else {
                ele.show = false;
              }
              this.orders.push(item);
            })
          });
          if (this.params.page < res.content.total_page) {
            this.loadingEmpty = false;
          } else {
            this.loadingContent = 'No More';
            this.loadingEmpty = true;
          }
          this.isFinishedLoading = true;
        } else {
          this.$Messagebox({
            title: res.msg,
            type: 'error'
          });
          // this.$Toast(res.msg);
        }
      }, err => {
        // this.$Toast(err.data.msg);
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
          self.params.page = self.params.page + 1
          self.getOrderList();
        }
      }
    },
    // 确认收货
    handleCollect() {
      this.confirmModal = {
        show: true,
        title: 'Do you confirm receipt?',
        onText: 'Yes',
        content: `Confirm receipt can get ${Math.floor(this.finalAmount)} points!`,
        action: this.handleCollectCb
      };
    },
    // 确认收货 回调
    handleCollectCb() {
      this.request('OrdersSign', {
        order_id: this.orderid
      }).then((res) => {
        if (res.status === 200) {
          this.confirmModal.show = false;
          this.handleCb && this.handleCb();
          // this.$Toast('success');
        }
      }, err => {
        // this.$Toast(err);

      });
    },
    // 确认收货
    handleDelete(item) {
      this.confirmModal = {
        show: true,
        type: 'confirm',
        content: 'Are you sure to delete the order？',
        action: this.handleDeleteCb,
        item
      };
    },
    // 删除订单
    handleDeleteCb() {
      this.request('OrdersDelete', {
        order_id: this.confirmModal.item.orderid
      }).then((res) => {
        if (res.status === 200) {
          this.confirmModal.show = false;
          this.getOrderList();
          this.handleCb && this.handleCb();
        } else {
          this.$Messagebox({
            title: res.msg,
            type: 'error'
          });
        }
      }, err => {
        this.$Messagebox({
          title: res.msg,
          type: 'error'
        });
      });
    },
    // 物流信息
    getLogistics() {
      this.$router.push({
        name: 'logistics',
        query: {
          order_id: this.orderid
        }
      });
    }
  }
};
</script>
<style lang="less">
@import '~less/tool.less';

.my-orders {
  .order-tabs{
    height: 36px;
    width: 362px;
    border: 1px solid #444;
    border-radius: 4px;
    margin: 20px auto 10px;
    text-align: center;
    cursor: pointer;
    .order-tabitem{
      float: left;
      width: 120px;
      height: 36px;
      line-height: 36px;
      border-right: 1px solid #444444;
      color: #444444;
      font-size: 16px;
      &:last-child {
        border-right: none;
      }
      &.active{
        color: #fff;
        background:rgba(68,68,68,1);
      }
    }
  }
  .tab-orders{
    width: 914px;
    text-align: center;
    td{
      position: relative;
    }
    .tr-items {
      padding: 20px 0;
      height: 160px;
      .order-total{
        color: #F35262;
        font-size: 22px;
      }
      .order-status{
        color: #131313;
        margin-bottom: 18px;
        font-size: 14px;
      }
      .order-detail{
        font-size: 16px;
        a{
          color: #939399;
          text-decoration: underline
        }
      }
      .operate-two{
        border: 1px solid #939399;
        color: #939399;
        width: 120px;
        height: 40px;
        line-height: 40px;
        font-size: 16px;
        text-align: center;
        margin: 0 auto;
        margin-bottom: 10px;
        cursor: pointer;
      }
      .operate-one {
        text-decoration: underline;
        color: #939399;
        cursor: pointer;
      }
    }
    .tr-header{
      background-color: #E4E4E4;
      height: 35px;
      line-height: 35px;
      color: #000;
      font-size: 14px;
    }
    .order-no{
      font-size: 14px;
      line-height: 30px;
      text-align: left;
      padding-left: 23px;
    }
    .order-time{
      font-size: 14px;
      line-height: 30px;
      text-align: left;
      padding-left: 23px;
    }
    .order-goods{
      width: 100px;
      overflow: scroll;
      margin: 0 auto;
      .product-img{
        width: 100px;
        height: 100px;
        display: inline-block;
      }
      .turn-left {
        display: block;
        position: absolute;
        left: 0px;
        top: 60px;
        z-index: 22;
        cursor: pointer;
        width:0;
        height:0;
        border: 8px solid transparent;
        border-right-color: @orange;//左箭头
      }
      .turn-right {
        cursor: pointer;
        display: block;
        position: absolute;
        right: -0px;
        top: 60px;
        z-index: 22;
        width:0;
        height:0;
        border: 8px solid transparent;
        border-left-color: @orange;//左箭头
      }
    }
  }
}
</style>