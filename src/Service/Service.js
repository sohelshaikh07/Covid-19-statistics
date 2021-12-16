import api from './api'

export const getAllData = async() => {
    const response = await api.get('/summary');
    return response.data;
}