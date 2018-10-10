/**
 * @note   setOnline 线上接口 配置
 * @param  name  本地接口名
 *         type  接口类型
 *         url   线上接口地址
 */
var fs = require('fs');
var setOnline = [
  {
    name: 'home',
    type: 'post',
    url: '/home'
  },
  {
    name: 'regionIndex',
    type: 'post',
    url: '/region/index'
  },
  {
    name: 'cartMultipleStoreCartInfo',
    type: 'post',
    url: '/cartMultipleStore/cartInfo'
  },
  {
    name: 'cartCartInfo',
    type: 'post',
    url: '/cart/cartInfo'
  },
  {
    name: 'cartCombineCartInfo',
    type: 'post',
    url: '/cart/combineCartInfo'
  },
  {
    name: 'detail',
    type: 'post',
    url: '/detail'
  },
  {
    name: 'cartCartTotalCount',
    type: 'post',
    url: '/cart/cartTotalCount'
  },
  {
    name: 'addressDelete',
    type: 'post',
    url: '/address/delete'
  },
  {
    name: 'addressEditAddress',
    type: 'post',
    url: '/address/editAddress'
  },
  {
    name: 'addressDefaultAddress',
    type: 'post',
    url: '/address/defaultAddress'
  },
  {
    name: 'storeDecodeAddress',
    type: 'post',
    url: '/store/decodeAddress'
  },
  {
    name: 'productsList',
    type: 'post',
    url: '/products/list'
  },
  {
    name: 'personalIndex',
    type: 'post',
    url: '/personal/index'
  },
  {
    name: 'personalSelf',
    type: 'post',
    url: '/personal/self'
  },
  {
    name: 'paymentConfirmPayment',
    type: 'post',
    url: '/payment/confirmPayment'
  },
  {
    name: 'pinPinList',
    type: 'post',
    url: '/pin/pinList'
  },
  {
    name: 'listsNewList',
    type: 'post',
    url: '/lists/newList'
  },
  {
    name: 'listsPromotionList',
    type: 'post',
    url: '/lists/promotionList'
  },
  {
    name: 'listsPromotionList',
    type: 'post',
    url: '/lists/promotionList'
  },
  {
    name: 'pinGoodDetail',
    type: 'post',
    url: '/pin/goodDetail'
  },
  {
    name: 'pinPinDetail',
    type: 'post',
    url: '/pin/pinDetail'
  },
  {
    name: 'searchSearchlist',
    type: 'post',
    url: '/search/searchlist'
  },
  {
    name: 'homeStoreList',
    type: 'post',
    url: '/home/storeList'
  },
  {
    name: 'listsGoodslist',
    type: 'post',
    url: '/lists/goodslist'
  },
  {
    // 我的积分
    name: 'personalIntegral',
    type: 'post',
    url: '/personal/integral'
  },
  {
    // 优惠券
    name: 'couponList',
    type: 'post',
    url: '/coupon/list'
  },
  {
    name: 'couponExchange',
    type: 'post',
    url: '/coupon/exchange'
  },
  {
    name: 'orderOrderList',
    type: 'post',
    url: '/order/orderList'
  },
  {
    name: 'orderOrderDetail',
    type: 'post',
    url: '/order/orderDetail'
  },
  {
    name: 'orderOrderDetail',
    type: 'post',
    url: '/order/orderDetail'
  },
  {
    name: 'orderOrderSignIntegral',
    type: 'post',
    url: '/order/orderSignIntegral'
  },
  {
    name: 'orderDelOrder',
    type: 'post',
    url: '/order/delOrder'
  },
  {// 交易流水
    name: 'personalFinance',
    type: 'post',
    url: '/personal/finance'
  },
  {
    name: 'rechargeGetAllRecharge',
    type: 'post',
    url: '/recharge/getAllRecharge'
  },
  {
    name: 'storeGetStore',
    type: 'post',
    url: '/store/getStore'
  },
  {
    name: 'storeSearchStore',
    type: 'post',
    url: '/store/searchStore'
  },
  {
    name: 'categoryGetcate',
    type: 'post',
    url: '/category/getcate'
  },
  {
    name: 'codeValiTokenCode',
    type: 'post',
    url: '/code/valiTokenCode'
  },
  {
    name: 'weixinGetJsApiSign',
    type: 'post',
    url: '/weixin/getJsApiSign'
  },
  {
    name: 'logStoreHistory',
    type: 'post',
    url: '/log/storeHistory'
  },
  {
    name: 'commentCommentlist',
    type: 'post',
    url: '/comment/commentlist'
  },
  {
    name: 'success',
    type: 'post',
    url: '/login/passwordFreeCodeLogin'
  },
  {
    name: 'success',
    type: 'post',
    url: '/login/passwordFreeLogin'
  },
  {
    name: 'historyViewList',
    type: 'get',
    url: '/store/historyview'
  },
  {// 注册
    name: 'register',
    type: 'post',
    url: '/users/register'
  },
  {// 登陆
    name: 'login',
    type: 'post',
    url: '/users/login'
  },
  {// 密码重置
    name: 'pwreset',
    type: 'post',
    url: '/users/pwreset'
  },
  {// 累计收益
    name: 'personalIncome',
    type: 'post',
    url: '/personal/income'
  },
  // 粉丝列表
  {
    name: 'personalFans',
    type: 'post',
    url: '/personal/fans'
  },
  // 待入账
  {
    name: 'personalAccount',
    type: 'post',
    url: '/personal/account'
  },
  // 订单详情
  {
    name: 'ordersDetail',
    type: 'post',
    url: '/orders/detail'
  },
  // 修改资料
  {
    name: 'personalEdit',
    type: 'post',
    url: '/personal/edit'
  },
  // 促销列表
  {
    name: 'promotionsList',
    type: 'post',
    url: '/promotions/list'
  },
  {// 订单删除
    name: 'ordersDelete',
    type: 'post',
    url: '/orders/delete'
  },
  {// 订单签收
    name: 'ordersSign',
    type: 'post',
    url: '/orders/sign'
  },
  {// 物流详情
    name: 'logDetail',
    type: 'post',
    url: '/orders/logDetail'
  },
  {// 个人信息
    name: 'personalInfo',
    type: 'post',
    url: '/personal/info'
  },
  
];

// 输出配置项
exports.setOnline = setOnline;

// 遍历输出json数据
for (var i = 0, len = setOnline.length; i < len; i++) {
  (function() {
    var name = setOnline[i].name;

    exports[name] = function(req, res) {
      res.setHeader('Content-Type', 'application/json; charset=utf-8');
      fs.readFile('./mock/' + name + '.json', function(err, data) {
        if (err) throw err;

        res.json(JSON.parse(data));
      });
    };
  })(i);
}

