import axios from 'axios';
import { preAxiosInstance } from './interseptor';

const commonGetApi = async (url) => {
    try {
        const res = await axios.get(url);
        return res;
    } catch (error) {
        return false;
    }
};

export default commonGetApi;

export const commonAllApi = async (url='',data='',method='get',obj={}) => {
    try {
        const res = await preAxiosInstance?.[method](url,data,obj);
        return res;
    } catch (error) {
        return false;
    }
};

