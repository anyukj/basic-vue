import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import moment from 'moment';
import _ from 'lodash';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import '@/components/base/global.less';
import { PageView, SplitLayout } from '@/components/layouts';

// 引入自定义全局组件
Vue.use(Antd);
Vue.component('PageView', PageView);
Vue.component('SplitLayout', SplitLayout);

Vue.prototype.moment = moment;
Vue.prototype._ = _;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
