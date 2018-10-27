import axios from 'axios';
import Qs from 'qs';
import router from '@/router';
const config = {
  // baseURL: '',
  timeout: 200000, //
  // `withCredentails` 选项表明了是否是跨域请求
  withCredentials: true,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'X-Requested-With': 'XMLHttpRequest'
  },
  transformRequest: [function (data) {
    // 这里可以在发送请求之前对请求数据做处理，比如form-data格式化等，这里可以使用开头引入的Qs（这个模块在安装axios的时候就已经安装了，不需要另外安装）
    if (window.localStorage.getItem('userToken')) {
      data['token'] = window.localStorage.getItem('userToken');
    }
    data = Qs.stringify(data);
    return data;
  }],
  // 返回数据类型
  responseType: 'json'
};
const AxiosInst = axios.create(config);
//  请求拦截器
AxiosInst.interceptors.request.use((config) => {
  // if (window.localStorage.getItem('userToken')) {
  //     config.headers.Authorization = 'Bearer ' + `${window.localStorage.getItem('userToken')}`;
  // }
  return config;
}, (err) => {
  return Promise.reject(err);
});
// 响应拦截器
AxiosInst.interceptors.response.use(response => {
  const resp = response.data;
  let code = resp.status;
  // 检查数据是否返回NULL
  // if (response.content === null) {
  //     return Promise.reject(response);
  // }
  // 检查是否有权限
  if (code === 1001) {
    return Promise.reject(response);
  }
  // 没有token是402，token失效是403
  if (code === 402 || code === 403) {
    window.localStorage.removeItem('userInfo');
    window.localStorage.removeItem('userToken');
    router.push({
      name: '/login'
    });
    return Promise.reject(response);
    // return response;
  }
  return response;
}, (error) => {
  console.log(error);
  // 下面是接口回调的status ,因为我做了一些错误页面,所以都会指向对应的报错页面
  if (error.response.status === 404) {
    router.push({
      name: '404'
    });
  }
  // 请求错误时做些事
  return Promise.reject(error);
});
export default AxiosInst;
