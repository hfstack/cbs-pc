# cbs-pc

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

##  对axios进行了简单的封装
新建接口 在src/libs/methodMap中添加  
每个接口的token参数已经添加到每个接口中，接口请求时无需添加token  
使用axios拦截器对接口状态进行管理
接口调用demo 
```
// userLogin 是在methodMap中定义的
this.request('UserLogin').then((res) => {
  if(res.status === 200) {

  }
})
```