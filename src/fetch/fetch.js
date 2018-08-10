import axios from 'axios';

let config = {
    baseURL: '/api',
};
export functin post(url,data){
    return axios.post(url,data,config)
}