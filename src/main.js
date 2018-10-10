// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import Http from './libs/http';
import initComponents from './initComponents';
import './less/index.less';

Vue.use(Http);
Vue.config.productionTip = false;
initComponents(Vue);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
