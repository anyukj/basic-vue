import * as types from '@/store/mutations-types';
import { apiOperation, commonMutations, commonActions } from '@/utils/vuexHelper';
import { setToken } from '@/utils/storageUtil';
import userApi from '@/api/SysUser';

export default {
  namespaced: true,
  state: {
    loading: {},
    userInfo: {},
  },
  getters: {},
  mutations: {
    ...commonMutations,
  },
  actions: {
    ...commonActions(userApi),
    login({ commit }, payload) {
      return apiOperation({ commit, payload, api: userApi.login, loadingName: 'login' }, (res) => {
        setToken(res);
      });
    },
    currentUser({ commit }, payload) {
      const updateState = { type: types.QUERY_ITEM, name: 'userInfo' };
      return apiOperation({ commit, payload, api: userApi.currentUser, loadingName: 'currentUser', updateState });
    },
    updatePassword({ commit }, payload) {
      return apiOperation({ commit, payload, api: userApi.updatePassword, loadingName: 'updatePassword' });
    },
    resetPassword({ commit }, payload) {
      return apiOperation({ commit, payload, api: userApi.resetPassword, loadingName: 'resetPassword' });
    },
    refreshToken({ commit }, payload) {
      return apiOperation({ commit, payload, api: userApi.refreshToken, loadingName: 'refreshToken' }, (res) => {
        setToken(res);
      });
    },
  },
};
