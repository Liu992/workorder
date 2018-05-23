import axios from 'axios';

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    if (response.data.unlogin) {
        return window.location.href = "/login"
    }
    return response
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error)
})
