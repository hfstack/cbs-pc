export function loginHandler (self) {
  /**
   * @note 登录助手
   * @param self Vue钩子
   **/
   // APP内置方法 提供登录信息
  if (window.MailaApp && window.MailaApp.isLogin) {
    try {
      let isLogin = JSON.parse(window.MailaApp.isLogin());
      if (isLogin.success && isLogin.list) {
        self.$store.dispatch('setLogin', true);
        self.$store.dispatch('setUsername', isLogin.list.taobaoNick);
        self.$store.dispatch('setAvator', isLogin.list.avatarUrl);
      } else {
        self.$store.dispatch('setLogin', false);
        self.$store.dispatch('setUsername', '');
      }
    } catch (e) {
      // 返回非正常json格式
    }
  };
  // APP内置方法 提供cookie信息
  if (window.MailaApp && window.MailaApp.getCookieInfo) {
    try {
      let cookieInfo = JSON.parse(window.MailaApp.getCookieInfo());
      if (cookieInfo.success && cookieInfo.list) {
        cookieInfo.list._dragon_sea && self.$cookie.set('_dragon_sea', cookieInfo.list._dragon_sea, { expires: '1Y' });
        cookieInfo.list._coll_ci && self.$cookie.set('_coll_ci', cookieInfo.list._coll_ci, { expires: '1Y' });
      } else {
        self.$cookie.delete('_dragon_sea');
        self.$cookie.delete('_coll_ci');
      }
    } catch (e) {
      // 返回非正常json格式
    }
  }
};
