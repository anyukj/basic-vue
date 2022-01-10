import baseApi, { allRequest } from './BaseApi';

// 提供字典信息接口
const api = {
  base: '/sysDictionary',
};

export default { ...allRequest(api.base) };
