import Axios from 'axios';
import Cookie from './cookie';

class AxiosClass {

    $axios;

    constructor() {
        this.$axios = Axios.create({
            baseURL: "http://103.179.188.83:3003/api/",
            timeout: 300000,
            headers: {
                Accept: 'multipart/form-data',
                'Content-Type': 'multipart/form-data',

            },
        });

        this.$axios.interceptors.request.use(function (config) {
            const accessToken = Cookie.GetCookie('accessToken');
            if (accessToken != null) {
                config.headers.Authorization = `Bearer `+accessToken;
            }
            return config;
        });
    }

    async get(url: string, query?: any) {
        try {
            const response = await this.$axios.get(url, { params: query });
            return response.data;
        } catch (error) {
            return false;
        }
    }

    async post(url: string, data?: FormData) {
        try {
            const response = await this.$axios.post(url, data);

            return response.data;
        } catch (error:any) {
            if (error.response && error.response.data) {
                return error.response.data; // Trả về dữ liệu lỗi từ phản hồi
            } else {
                return error; // Trả về đối tượng lỗi nếu không có dữ liệu phản hồi
            }
        }
    }

    async patch(url: string, data?: any) {
        try {
            const response = await this.$axios.patch(url, data);
            return response.data.data;
        } catch (error) {
            return false;
        }
    }

    async put(url: string, data: any) {
        try {
            const response = await this.$axios.put(url, data);
            return response.data.data;
        } catch (error) {
            return false;
        }
    }

    async delete(url: string) {
        try {
            const response = await this.$axios.delete(url);
            return response.data.data;
        } catch (error) {
            return false;
        }
    }
}

const adminAxios = new AxiosClass();
export default adminAxios;
