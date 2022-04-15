import axios from 'axios';
import {showMessage} from "./showMessage";
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'


//防止多次请求进度条重复加载
let loadingNum = 0;

// 设置接口超时时间
axios.defaults.timeout = 60000;

// 请求地址，这里是动态赋值的的环境变量，下一篇会细讲，这里跳过
// @ts-ignore
axios.defaults.baseURL = 'http://127.0.0.1:8000/api';

//http request 拦截器
axios.interceptors.request.use(
  config => {
    startLoading();
    // 配置请求头
    config.headers = {
      //'Content-Type':'application/x-www-form-urlencoded',   // 传参方式表单
      // 'Content-Type': 'application/json;charset=UTF-8',        // 传参方式json
    };
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

//http response 拦截器
axios.interceptors.response.use(
  response => {
    endLoading();
    return response.data;
  },
  error => {
    const {response} = error;
    if (response) {
      // 请求已发出，但是不在2xx的范围
      showMessage(response.status);           // 传入响应码，匹配响应码对应信息
      return Promise.reject(response.data);
    } else {
      console.log('网络连接异常,请稍后再试!');
    }
  }
);

//配置进度条参数
NProgress.configure({showSpinner: false, minimum: 0.2, speed: 1000});


function startLoading() {
  if (loadingNum == 0) {
    NProgress.start()
  }
  loadingNum++;
}

function endLoading() {
  loadingNum--
  if (loadingNum <= 0) {
    NProgress.done()
  }
}


// 封装 GET POST 请求并导出
export function request(url: string, params: object, type: string) {
//设置 url params type 的默认值
  return new Promise((resolve, reject) => {
    let promise: any;
    if (type.toUpperCase() === 'GET') {
      promise = axios({
        url,
        params
      })
    } else if (type.toUpperCase() === 'POST') {
      promise = axios({
        method: 'POST',
        url,
        data: params,
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        }
      })
    }
    //处理返回
    promise.then((res: any) => {
      resolve(res)
    }).catch((err: any) => {
      reject(err)
    })
  })
}
