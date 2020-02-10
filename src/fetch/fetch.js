import axios from 'axios';

let config = {
    baseURL: 'http://123.56.226.100:82', //服务器ip
    //baseURL: '/api',                    //final
    transformRequest: [
        function(data) {
            let ret = '';
            for (let it in data){
                ret += encodeURIComponent(it)+'='+encodeURIComponent(data[it])+'&'
            }
            return ret;
        }
    ],
    transformResponse: [
        function(data){
            return data
        }
    ],
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    timeout: 10000,
    withCredentials: true,
    responseType: 'json'
};
export function post(url,data){
    return axios.post(url,data,config)
}
export function get(url){
    return axios.get(url,config);
}