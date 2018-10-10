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
      path: '*',
      redirect: '/home'
    }
  ]
});
