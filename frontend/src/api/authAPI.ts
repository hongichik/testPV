import Axios from "../utils/axios"

const login = async (data:FormData) => {
    return await Axios.post('login',data);
}
const register = async (data:FormData) => {
    return await Axios.post('register',data);
}

const passwordReset = async (data:string) => {
    return await Axios.get('/passwordResetToken?email='+data);
}


const passwordResetUpdate = async (data:FormData) => {
    return await Axios.post('/passwordReset',data);
}
const info = async () => {
    return await Axios.get('user/info');
}

const logout = async () => {
    return await Axios.get('logout');
}

const permission = async (slug: string) => {
    return await Axios.get('user/permission/'+slug);
}

const authAPI = {
    login,
    info,
    logout,
    register,
    passwordReset,
    passwordResetUpdate,
    permission
}

export default authAPI;