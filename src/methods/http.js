import axios from 'axios'
import qs from 'qs'

axios.interceptors.request.use(config => {
  //显示loading
  console.log('loading_start')
  return config
}, error => {
  return Promise.reject(error)
})

let request = (params) => {
  let Public = { //公共参数
    'srAppid': ""
  }
  let httpDefaultOpts = { //http默认配置
    method: params.method,
    // baseURL: 'http://localhost:10000',
    url: params.url,
    timeout: 10000,
    // params:Object.assign(Public, data),
    // data:qs.stringify(Object.assign(Public, data)),
    data:qs.stringify(params.data),
    headers: params.method=='get'?{
      'X-Requested-With': 'XMLHttpRequest',
      "Accept": "application/json",
      "Content-Type": "application/json; charset=UTF-8"
    }:{
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
  }

  if(params.method=='get'){
    delete httpDefaultOpts.data
  }else{
    delete httpDefaultOpts.params
  }

  axios(httpDefaultOpts)
  .then(
    (res) => {
      let data = res.data
      if (typeof data === 'string') {
        data = eval('(' + data + ')')
      }
      params.callback(data)
    }
  ).catch(
    (res) => {
      if (res.response.status === 401) {
        localStorage.setItem('token',null); // 将token清空
        window.location.reload();// 重新加载页面，跳转到登录
        console.log('登录信息过期，请重新登录')
      }
      if (res.response.status === 404) {
        console.log('接口不存在')
      }
      if (res.response.status === 500) {
        console.log('服务器报错')
      }
      if (res.response.status === 504) {
        console.log('连接服务器超时')
      }
    }
  )
}

export default {
  request
}



