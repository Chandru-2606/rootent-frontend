import { apiClient } from "./http";

const registerUser = async(data)=>{
    try {
        const response = await apiClient.post('/users/register', data)
        return response;
    } catch (error) {
        throw error;
    }
}

const loginUser = async(data)=>{
    try {
        const response = await apiClient.post('/users/login', data)
        return response;
    } catch (error) {
        throw error;
    }
}

const getUserData = async()=>{
    try {
        const response = await apiClient.get('/users/me')
        return response;
    } catch (error) {
        throw error;
    }
}
export { registerUser, loginUser, getUserData }