import * as types from '@/store/mutations-types';
import { apiOperation, commonMutations } from '@/utils/vuexHelper';
import fileApi from '@/api/SysFile';

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
    downTemplate({ commit }, payload) {
      apiOperation({ commit, payload, api: fileApi.downTemplate, loadingName: 'downTemplate' }).then((res) => {
        let url = window.URL.createObjectURL(new Blob([res]));
        let link = document.createElement('a');
        link.style.display = 'none';
        link.href = url;
        link.setAttribute('download', payload.fileName);
        document.body.appendChild(link);
        link.click();
      });
    },
    upload({ commit }, payload) {
      return apiOperation({ commit, payload, api: fileApi.uploadFile, loadingName: 'upload' });
    },
  },
};
