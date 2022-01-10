import axios from '@/utils/request';

const get = (url, parameter, headers) => {
  return axios({
    url: url,
    method: 'GET',
    params: parameter,
    headers: { ...headers },
  });
};

const item = (url, parameter, headers) => {
  return axios({
    url: `${url}/${parameter}`,
    method: 'GET',
    headers: { ...headers },
  });
};

const post = (url, parameter, headers) => {
  return axios({
    url: url,
    method: 'POST',
    data: parameter,
    headers: { ...headers },
  });
};

const put = (url, parameter, headers) => {
  return axios({
    url: url,
    method: 'PUT',
    data: parameter,
    headers: { ...headers },
  });
};

const remove = (url, parameter, headers) => {
  return axios({
    url: url,
    method: 'DELETE',
    params: parameter,
    headers: { ...headers },
  });
};

const uploadFile = (url, parameter) => {
  const formData = new FormData();
  parameter.forEach((file) => {
    formData.append('files', file);
  });
  return axios({
    url: url,
    method: 'POST',
    data: formData,
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const allRequest = (baseApi) => {
  const pageRequest = (parameter) => get(baseApi, parameter);
  const itemRequest = (parameter) => item(baseApi, parameter);
  const addRequest = (parameter) => post(baseApi, parameter);
  const updateRequest = (parameter) => put(baseApi, parameter);
  const removeRequest = (parameter) => remove(baseApi, parameter);
  return { pageRequest, itemRequest, addRequest, updateRequest, removeRequest };
};

export default { get, item, post, put, remove, uploadFile };
