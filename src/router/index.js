import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      name: 'home',
      path: '/home',
      component: function (resolve) {
        require.ensure([], function () {
          resolve(require('pages/home'));
        }, 'home');
      }
    },
    {
      name: 'detail',
      path: '/detail',
      component: function (resolve) {
        require.ensure([], function () {
          resolve(require('pages/home/Detail'));
        }, 'detail');
      }
    },
    {
      name: 'cart',
      path: '/cart',
      component: function (resolve) {
        require.ensure([], function () {
          resolve(require('pages/Cart'));
        }, 'cart');
      }
    },
    {
      name: 'secure',
      path: '/cart/secure',
      component: function (resolve) {
        require.ensure([], function () {
          resolve(require('pages/cart/Secure'));
        }, 'secure');
      }
    },
    {
      name: 'successful',
      path: '/cart/successful',
      component: function (resolve) {
        require.ensure([], function () {
          resolve(require('pages/cart/Successful'));
        }, 'successful');
      }
    },
    {
      name: 'failure',
      path: '/cart/failure',
      component: function (resolve) {
        require.ensure([], function () {
          resolve(require('pages/cart/Failure'));
        }, 'failure');
      }
    },
    {
      name: 'my',
      path: '/my',
      component: function (resolve) {
        require.ensure([], function () {
          resolve(require('pages/my/index'));
        }, 'home');
      },
      redirect: 'my/account',
      children: [
        {
          name: 'myAccount',
          path: 'account',
          component: function (resolve) {
            require.ensure([], function () {
              resolve(require('pages/my/account'));
            }, 'my');
          }
        },
        {
          name: 'myOrders',
          path: 'orders',
          component: function (resolve) {
            require.ensure([], function () {
              resolve(require('pages/my/orders'));
            }, 'my');
          }
        },
        {
          name: 'orderDetail',
          path: 'orders/detail',
          component: function (resolve) {
            require.ensure([], function () {
              resolve(require('pages/my/orderDetail'));
            }, 'my');
          }
        },
        {
          name: 'myPoints',
          path: 'points',
          component: function (resolve) {
            require.ensure([], function () {
              resolve(require('pages/my/points'));
            }, 'my');
          }
        },
        {
          name: 'myCoupons',
          path: 'coupons',
          component: function (resolve) {
            require.ensure([], function () {
              resolve(require('pages/my/coupons'));
            }, 'my');
          }
        },
        {
          name: 'myBalance',
          path: 'balance',
          component: function (resolve) {
            require.ensure([], function () {
              resolve(require('pages/my/balance'));
            }, 'my');
          }
        },
        {
          name: 'historyView',
          path: 'historyview',
          component: function (resolve) {
            require.ensure([], function () {
              resolve(require('pages/my/historyview'));
            }, 'my');
          }
        },
        {
          name: 'addressBook',
          path: 'addressbook',
          component: function (resolve) {
            require.ensure([], function () {
              resolve(require('pages/my/addressbook'));
            }, 'my');
          }
        },
        {
          name: 'profile',
          path: 'profile',
          component: function (resolve) {
            require.ensure([], function () {
              resolve(require('pages/my/profile'));
            }, 'my');
          }
        }
      ]
    },
    {
      name: 'login',
      path: '/login',
      component: function (resolve) {
        require.ensure([], function () {
          resolve(require('pages/my/login'));
        }, 'login');
      }
    },
    {
      name: 'forgetpwd',
      path: '/login/forgetpwd',
      component: function (resolve) {
        require.ensure([], function () {
          resolve(require('pages/my/forgetpwd'));
        }, 'forgetpwd');
      }
    },
    {
      name: 'sendsuccess',
      path: '/login/sendsuccess',
      component: function (resolve) {
        require.ensure([], function () {
          resolve(require('pages/my/sendSuccess'));
        }, 'sendsuccess');
      }
    },
    {
      name: 'setnewpwd',
      path: '/login/setnewpwd',
      component: function (resolve) {
        require.ensure([], function () {
          resolve(require('pages/my/setnewpwd'));
        }, 'setnewpwd');
      }
    },
    {
      name: 'activity',
      path: '/activity',
      component: function (resolve) {
        require.ensure([], function () {
          resolve(require('pages/activity/index'));
        }, 'activity');
      }
    },
    {
      name: 'categorySearch',
      path: '/category/search',
      component: function (resolve) {
        require.ensure([], function () {
          resolve(require('pages/categories/index'));
        }, 'category');
      }
    },
    {
      name: 'index',
      path: '/index',
      component: function (resolve) {
        require.ensure([], function () {
          resolve(require('pages/Home'));
        }, 'home');
      }
    },
    {
      path: '*',
      redirect: '/my'
    }
  ]
});
