import axios from 'axios';
import * as config from '../config';

axios.defaults.baseURL = config.extractifyBaseUrl;

const getAPIConfig = (contentType = 'application/json') => ({
  headers: {
    'Content-Type': contentType,
  }
});

const post = (url, data, config = getAPIConfig() ) => axios.post(url, data, { ...config });

const get = (url, params = {}) => axios.get(url, { ...getAPIConfig(), params });

const fileUpload= ( url, formData, requestParams = {} ) => {

  return post(url, formData, { ...getAPIConfig("multipart/form-data"), params: requestParams});
};

const ApiClient = { get, fileUpload }

export default ApiClient;
