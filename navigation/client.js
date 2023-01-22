import { create } from 'apisauce';

const apiClient = create({
    baseURL: 'exp://131.179.19.86:19000' // Use your local network IP
})

export default apiClient;