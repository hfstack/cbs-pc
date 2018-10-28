/**
 * 请求地址API
 */
const methodMap = {
  /** 首页 **/
  Home: {url: '/home', method: 'post'},
  /** 商品详情 **/
  ProductsDetail: {url: '/products/detail', method: 'get'},
  /** 商品列表 **/
  ProductsList: {url: '/products/list', method: 'post'},
  /** 购物车 **/
  Carts: {url: '/carts', method: 'post'},
  /** 购物车添加 **/
  CartsAdd: {url: '/carts/add', method: 'post'},
  /** 银行卡列表 **/
  CardsList: {url: '/cards/list', method: 'post'},
  /** 银行卡信息 **/
  CardsInfo: {url: '/cards/info', method: 'post'},
  /** 设置默认银行卡 **/
  CardsDefault: {url: '/cards/default', method: 'post'},
  /** 银行卡编辑 **/
  CardsEdit: {url: '/cards/edit', method: 'post'},
  /** 银行卡删除 **/
  CardsDelete: {url: '/cards/delete', method: 'post'},
  /** 购物车提交 **/
  OrdersCheckout: {url: '/orders/checkout', method: 'post'},
  /** 支付确认页面 **/
  OrdersPayment: {url: '/orders/payment', method: 'post'},
  /** 去支付 **/
  OrdersPay: {url: '/orders/pay', method: 'post'},
  /** 支付paypal **/
  PaymentPalExec: {url: '/payment/palExec', method: 'post'},
  /** 支付银行卡 **/
  PaymentStatus: {url: '/payment/status', method: 'post'},
  /** 地址信息 **/
  AddressInfo: {url: '/address/info', method: 'post'},
  /** 地址列表 **/
  AddressList: {url: '/address/list', method: 'post'},
  /** 地址添加 **/
  AddressAdd: {url: '/address/add', method: 'post'},
  /** 地址删除 **/
  AddressDelete: {url: '/address/delete', method: 'post'},
  /** 地址默认 **/
  AddressDefault: {url: '/address/default', method: 'post'},
  /** 注册 **/
  UsersRegister: {url: '/users/register', method: 'post'},
  /** 登录 **/
  UsersLogin: {url: '/users/login', method: 'post'},
  /** 密码重置 */
  PwdReset: {url: '/users/pwreset', method: 'post'},
  /** 用户中心 **/
  PersonalIndex: {url: '/personal/index', method: 'post'},
  /** 积分详情 **/
  PersonalIntegral: {url: '/personal/integral', method: 'post'},
  /** 优惠券列表 **/
  CouponList: {url: '/personal/coupons', method: 'post'},
  /** 交易流水 **/
  PersonalFinance: {url: '/personal/finance', method: 'post'},
  /** 累计收益 **/
  PersonalIncome: {url: '/personal/income', method: 'post'},
  /** 粉丝列表 **/
  PersonalFans: {url: '/personal/fans', method: 'post'},
  /** 待入账 **/
  PersonalAccount: {url: '/personal/account', method: 'post'},
  /** 资料修改 **/
  PersonalEdit: {url: '/personal/edit', method: 'post'},
  /** 订单详情 **/
  OrdersList: {url: '/orders/list', method: 'post'},
  /** 订单详情 **/
  OrdersDetail: {url: '/orders/detail', method: 'post'},
  /** 订单详情 **/
  PromotionsList: {url: '/promotions/list', method: 'get'},
  /** 订单删除 **/
  OrdersDelete: {url: '/orders/delete', method: 'post'},
  /** 订单签收 **/
  OrdersSign: {url: '/orders/sign', method: 'post'},
  /** 物流信息 **/
  OrdersLogDetail: {url: '/orders/logDetail', method: 'post'},
  /** 物流信息 **/
  PersonalInfo: {url: '/personal/info', method: 'post'},
  /** 类目 */
  Category: {url: '/cates', method: 'post'},
  /** 热门关键词 */
  SearchHotword: {url: '/search/hotword', method: 'post'},
  /** 优惠券领取 */
  CouponReceive: {url: '/coupons/receive', method: 'post'},
  /** 优惠券apply */
  CouponsApply: {url: '/coupons/apply', method: 'post'},
  /** PC首页 */
  PCHome: {url: '/pc/home', method: 'post'},
  /** Pc个人中心首页 */
  PCPersonalIndex: {url: '/pc/personal/index', method: 'post'}

};

export default methodMap;
