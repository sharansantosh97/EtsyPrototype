import axios from 'axios';
import config from '../util/config';

export default axios.create({
    baseURL: config.baseUrl,
    headers:{
        Authorization: `Bearer ${localStorage.getItem('token')}`
    }
});