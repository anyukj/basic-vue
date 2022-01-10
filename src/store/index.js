import Vue from 'vue';
import Vuex from 'vuex';

// 遍历modules目录下的js文件加入vuex
const modulesFiles = require.context('./modules', true, /\.js$/);
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1');
  modules[moduleName] = modulesFiles(modulePath).default;
  return modules;
}, {});

Vue.use(Vuex);
export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules,
});
