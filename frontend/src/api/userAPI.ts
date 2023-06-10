import Axios from "../utils/axios"

const getUsers = async (data: any) => {
    return await Axios.get('user',data);
}

const getUser = async (id:number) => {
    return await Axios.get('user/'+id);
}

const deleteUser = async (id:number) => {
    return await Axios.delete('user/'+id);
}

const updateUser = async (data: string,id:number) => {
    return await Axios.put('user/'+id+"?role="+data,data);
}

const userAPI = {
    getUser,
    getUsers,
    deleteUser,
    updateUser,
}

export default userAPI;