import Axios from 'axios'
import storage from '@/common/storage'

const config = require('config')

const axios = Axios.create({
  timeout: 15000, //max 15秒接口请求
});

// 添加axios响应拦截器
axios.interceptors.response.use(response => {
  // 对响应数据做点什么
  return response;
}, function (error) {
  // 对响应错误做点什么
  console.error(JSON.stringify(error))
  if (error.code == 'ECONNABORTED') {
    //后台连接超时
    location.hash = '#/shtml/error'
  }
  return Promise.reject(error);
});

/**
 * http方法
 */
function http(method, router, args) {
  method = method.toLowerCase()
  router = config.apiWxHost + router + '?accessToken=' + storage.tokenInfo('accessToken')
  let req = null
  switch (method) {
    case 'get':
      req = axios.get(router, { params: args })
      break
    case 'post':
      req = axios.post(router, args)
      break
    case 'put':
      req = axios.put(router, args)
      break
    case 'delete':
      req = axios.delete(router, args)
      break;
    case 'all':
      req = axios.all(router)
      break
    default:
      console.error('http method is invalid')
      break
  }
  return req
}

export default {
  http
}
