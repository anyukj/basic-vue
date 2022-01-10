import _ from 'lodash';
import * as types from '@/store/mutations-types';
import { apiOperation, commonMutations, commonActions } from '@/utils/vuexHelper';
import menuApi from '@/api/SysMenu';

export default {
  namespaced: true,
  state: {
    loading: {},
    userMenu: [],
    userMenuUri: [],
  },
  getters: {
    userTreeMenu: (state) => {
      // 首页左侧菜单格式（a-menu组件）
      const forMenu = (menus) => {
        return menus.map((item) => {
          return {
            ...item,
            name: _.chain(item.path).camelCase().upperFirst(),
            meta: { title: item.name, icon: item.icon },
            children: item.children && forMenu(item.children),
          };
        });
      };
      return forMenu(state.userMenu);
    },
  },
  mutations: {
    ...commonMutations,
  },
  actions: {
    ...commonActions(menuApi),
    userMenu({ commit }, payload) {
      return apiOperation({ commit, payload, api: menuApi.currentUserMenu, loadingName: 'userMenu' }, (res) => {
        const forMenu = (menus) => {
          return _.flatMap(menus, (item) => {
            const childrenPath = item.children && forMenu(item.children);
            return childrenPath ? _.concat(item.path, childrenPath) : item.path;
          });
        };
        commit({ type: types.QUERY_LIST, name: 'userMenu', value: res });
        commit({ type: types.QUERY_LIST, name: 'userMenuUri', value: forMenu(res) });
      });
    },
    allMenu({ commit }, payload) {
      return apiOperation({ commit, payload, api: menuApi.allMenu, loadingName: 'allMenu' });
    },
  },
};
