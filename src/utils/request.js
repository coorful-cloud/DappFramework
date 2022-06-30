import axios from 'axios'

const service = axios.create({
    headers: {'content-type': 'application/json'},
    // baseURL: process.env.NODE_ENV === 'production' ? publicConfig.BASE_API : process.env.VUE_APP_API_BASE_URL,
    timeout: 60 * 1000
})

service.interceptors.request.use(config => {
    // Content-Type
    config.headers['Content-Type'] = 'application/json;charset=utf-8'

    return config
})

service.interceptors.response.use((response) => {
    const result = response.data
    // api error
    if (response.status !== 200 || !result) {
        return Promise.reject(response)
    }
    return result
}, (error) => {
    // network error
    // const errMsg = ((error.response || {}).data || {}).message || 'There was an error in the network request. Please try again later!'
    return Promise.reject(error)
})

const installer = {
    vm: {},
    install (Vue) {
        Vue.use(VueAxios, service)
    }
}

export {
    installer as VueAxios,
    service as request
}
