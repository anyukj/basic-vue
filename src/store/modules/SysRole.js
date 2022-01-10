import * as types from '@/store/mutations-types';
import { apiOperation, commonMutations, commonActions } from '@/utils/vuexHelper';
import roleApi from '@/api/SysRole';

export default {
  namespaced: true,
  state: {
    loading: {},
  },
  getters: {},
  mutations: {
    ...commonMutations,
  },
  actions: {
    ...commonActions(roleApi),
    assignUsers({ commit }, payload) {
      return apiOperation({ commit, payload, api: roleApi.assignUsers, loadingName: 'assignUsers' });
    },
    relationUsers({ commit }, payload) {
      return apiOperation({ commit, payload, api: roleApi.getRelationUsers, loadingName: 'relationUsers' });
    },
    assignMenus({ commit }, payload) {
      return apiOperation({ commit, payload, api: roleApi.assignMenus, loadingName: 'assignMenus' });
    },
    relationMenus({ commit }, payload) {
      return apiOperation({ commit, payload, api: roleApi.getRelationMenus, loadingName: 'relationMenus' });
    },
  },
};
