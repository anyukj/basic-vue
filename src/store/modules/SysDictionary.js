import * as types from '@/store/mutations-types';
import { apiOperation, commonMutations, commonActions } from '@/utils/vuexHelper';
import dictionaryApi from '@/api/SysDictionary';

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
    ...commonActions(dictionaryApi),
  },
};
