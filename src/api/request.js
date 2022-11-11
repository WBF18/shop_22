//对于axios进行二次封装
import axios from "axios"
// 引入进度条
import nProgress from "nprogress"
// 引入进度条的样式
import "nprogress/nprogress.css"


// 在当前模式中引入store
import store from '@/store'
// console.log(nProgress)
// start: 进度条开始 done:进度条结束

// 1.利用axios对象的方法create，去创建一个axios实例
// 2.request就是axios，只不过稍微配置一下

const requests =axios.create({
    //  配置对象
    // 基础路径，发请求的时候，路径当中会出现api
    baseURL:"/api",
    // 代表请示超时的时间5s
    timeout:5000,
})

// 请示拦截器，在发送之前，请示拦截器可以检测到，可以在请求发出去之前做一些事情
// interceptors 拦截器
requests.interceptors.request.use((config)=>{
    // config:配置对象，对象里面有一个属性很重要，headers请求头
    if(store.state.detail.uuid_token){
        // 請求頭添加一個字段（userTempId)和后臺商量好了
        config.headers.userTempId=store.state.detail.uuid_token
    }
    // 需要携带token带给服务器
    if(store.state.user.token){
        config.headers.token=store.state.user.token
    }
    nProgress.start()
    return config
})

// 响应拦截器
requests.interceptors.response.use((res)=>{
    // 进度条结束
    nProgress.done()
    return res.data
},(error)=>{
    // 响应失败的回调函数
    return Promise.reject(new error('faile'))
})

// 对外暴露
export default requests