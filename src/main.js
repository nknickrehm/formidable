// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuex from 'vuex';
import vuexI18n from 'vuex-i18n';
import axios from 'axios';
import VueAxios from 'vue-axios';
import VueAuth from '@websanova/vue-auth';
import App from './App';
import router from './router';
import config from './config';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    i18n: vuexI18n.store,
  },
});
Vue.use(vuexI18n.plugin, store);
Vue.i18n.set('de');

Vue.use(VueAxios, axios);

Vue.axios.defaults.baseURL = config.api;

Vue.router = router;

/* eslint-disable global-require */
Vue.use(VueAuth, {
  auth: require('@websanova/vue-auth/drivers/auth/bearer.js'),
  http: require('@websanova/vue-auth/drivers/http/axios.1.x.js'),
  router: require('@websanova/vue-auth/drivers/router/vue-router.2.x.js'),
  tokenStore: ['localStorage', 'cookie'],
  registerData: {
    url: 'enroll',
    fetchUser: false,
  },
  loginData: {
    url: 'login',
    fetchUser: false,
    redirect: null,
  },
  logoutData: {
    makeRequest: false,
  },
  refreshData: {
    enabled: false,
  },
  fetchData: {
    enabled: false,
  },
});

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
});
