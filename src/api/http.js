import axios from 'axios'
import qs from 'qs'
import app from '../main'

/*
  使用方法 import $http from 'api/http'
  let res = await $http({
    url: '',
    data: {}
  })
*/

if (process.env.NODE_ENV == 'development') {//开发环境
  axios.defaults.baseURL = '/api'
} else if (process.env.NODE_ENV == 'production') {//生产环境
  axios.defaults.baseURL = '获取数据的地址'
}

axios.interceptors.request.use(config => {
  app.$Progress.start()
  return config
}, error => {
  return Promise.reject(error)
})

axios.interceptors.response.use(response => {
  app.$Progress.finish()
  return response
}, error => {
  app.$Progress.fail()
  return Promise.resolve(error)
})

function checkStatus (response) {
  // 如果http状态码正常，则直接返回数据
  if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
    return response
  }
  // 异常状态下，把错误信息返回去
  return {
    status: -404,
    msg: '网络异常'
  }
}

function checkCode (res) {
  // 如果code异常(这里已经包括网络错误，服务器错误，后端抛出的错误)，可以弹出一个错误提示，告诉用户
  if (res.status === -404) {
    app.$message.error(res.msg)
  }
  if(res.data && res.data.Code != 0) {
    app.$message.error(res.data.Msg)
  }
  return res
}

const DEFAULT_REQUEST_OPTIONS = {
  url: '',
  data: {},
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  method: 'POST',
  timeout: 10000,
  // 设置跨越
  withCredentials: true
}

export default async function $http(opts) {
  let options = Object.assign({}, DEFAULT_REQUEST_OPTIONS, opts);
  let { url, data, headers, method, timeout, withCredentials } = options;

  const res = await axios({
    url,
    data,
    headers,
    method,
    timeout,
    withCredentials,
    transformRequest: [function (data, headers) {
      // 请求前根据 content-type 的不同设置 data 数据的转换
      if (headers['Content-Type'] === 'application/x-www-form-urlencoded') {
        return qs.stringify(data)
      }
      // 上传文件或者图片设置 'multipart/form-data'
      else if (headers['Content-Type'] === 'multipart/form-data') {
        return data
      }
      else {
        headers['Content-Type'] = 'application/json'
      }
      return JSON.stringify(data)
    }]
  })
  const res_1 = checkStatus(res)
  return checkCode(res_1)
}