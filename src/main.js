import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import routes from './routes';
import store from './store';

Vue.use(VueRouter);

Vue.config.productionTip = false;

const router = new VueRouter(routes);

//set headers before each route
router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next();
});

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app');
