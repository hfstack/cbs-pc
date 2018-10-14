/**
 * 请求地址API
 */
const methodMap = {
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
  PersonalInfo: {url: '/personal/info', method: 'post'}
};

export default methodMap;
