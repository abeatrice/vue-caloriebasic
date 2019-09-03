import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import routes from './routes';
import store from './store';

Vue.use(VueRouter);

Vue.config.productionTip = false

new Vue({
  store,
  router: new VueRouter(routes),
  render: h => h(App)
}).$mount('#app')
