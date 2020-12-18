import axios from 'axios'
import qs from 'qs'
export const callApi = async (method, args) => {
    const response = await axios.get(`/api/`, {
        params: {
            method,
            args
        },
        paramsSerializer: params => {
            return qs.stringify(params)
        }
    })
    if(response.data.result===false)
        return false;
    return response.data
}