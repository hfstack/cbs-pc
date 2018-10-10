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
      path: '*',
      redirect: '/home'
    }
  ]
});
