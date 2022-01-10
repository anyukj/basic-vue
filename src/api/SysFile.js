import baseApi from './BaseApi';

// 提供文件信息接口
const api = {
  downTemplate: '/sysFile/downTemplate',
  upload: '/sysFile/upload',
};

const downTemplate = (parameter) => baseApi.get(api.downTemplate, parameter);
const uploadFile = (parameter) => baseApi.uploadFile(api.upload, parameter);

export default { downTemplate, uploadFile };
