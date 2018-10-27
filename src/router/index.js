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
          resolve(require('pages/home/index'));
        }, 'home');
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
      path: '*',
      redirect: '/my'
    }
  ]
});
