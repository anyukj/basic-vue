import * as types from '@/store/mutations-types';
import { allRequest } from '@/api/BaseApi';
/**
 * vuex actions操作方法封装
 * @param commit veux的commit、用于提交数据给mutations
 * @param loadingName       成功后mutations处理loading的名称
 * @param api               http api接口名称
 * @param payload           http api提交内容
 * @param success           成功的回调
 * @returns {Promise<unknown>}
 */
export const apiOperation = ({ commit, loadingName, api, payload, updateState }, success) => {
  return new Promise((resolve, reject) => {
    commit({ type: types.LOADING, name: loadingName || api.name, value: true });
    api(payload)
      .then((res) => {
        if (res.success) {
          success && success(res.data);
          updateState && commit({ ...updateState, value: res.data });
          resolve(res.data);
        } else {
          throw new Error(res.message || '未知错误');
        }
      })
      .catch((error) => {
        reject(error);
        updateState && commit({ ...updateState, value: null });
      })
      .finally(() => {
        commit({ type: types.LOADING, name: loadingName || api.name, value: false });
      });
  });
};

export const commonMutations = {
  [types.LOADING](state, payload) {
    state.loading = {
      ...state.loading,
      [payload.name]: payload.value,
    };
  },
  [types.QUERY_LIST](state, payload) {
    state[payload.name] = payload.value || [];
  },
  [types.QUERY_ITEM](state, payload) {
    state[payload.name] = payload.value || {};
  },
};

export const commonActions = (api) => {
  function page({ commit }, payload) {
    return apiOperation({ commit, payload, api: api.pageRequest, loadingName: 'page' });
  }
  function item({ commit }, payload) {
    return apiOperation({ commit, payload, api: api.itemRequest, loadingName: 'item' });
  }
  function add({ commit }, payload) {
    return apiOperation({ commit, payload, api: api.addRequest, loadingName: 'add' });
  }
  function update({ commit }, payload) {
    return apiOperation({ commit, payload, api: api.updateRequest, loadingName: 'update' });
  }
  function remove({ commit }, payload) {
    return apiOperation({ commit, payload, api: api.removeRequest, loadingName: 'remove' });
  }
  return { page, item, add, update, remove };
};
