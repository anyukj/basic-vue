import Vue from 'vue';
import VueRouter from 'vue-router';
import { routerMap } from '@/router/router.config';
import { getToken } from '@/utils/storageUtil';
import NProgress from 'nprogress';
import '@/components/base/NProgress/nprogress.less';
NProgress.configure({ showSpinner: false });
Vue.use(VueRouter);

const route = new VueRouter({
  mode: 'history',
  routes: routerMap,
});

route.beforeEach((to, from, next) => {
  if (to.matched.length === 0) {
    next('/exception/404');
  } else if (getToken() || to.path === '/user/login') {
    NProgress.start();
    next();
  } else {
    next(`/user/login?redirect=${to.path}`);
  }
});

route.afterEach(() => {
  NProgress.done();
});

export default route;
