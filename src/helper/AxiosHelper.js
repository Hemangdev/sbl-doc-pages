import axios from "axios";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
const public_path = process.env.REACT_APP_PUBLIC_URL

const commonHeadres = () => {
    axios.defaults.baseURL = process.env.REACT_APP_API_URL;
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
    axios.defaults.headers.common['x-api-key'] = process.env.REACT_APP_API_KEY;
}

const CheckError = (res) => {
    if (res.status === 401) {
        var path = window.location.pathname;
        var exclude = ['/reset-password', '/login', '/profile']
        if (!exclude.includes(path)) {
            toast.error('Token Expired, Please login Again.')
            localStorage.removeItem('token')
        }
        return <Navigate to={`${public_path}/login`} />
    }
}

const errorData = (error) => {
    var bool_value = process.env.REACT_APP_LOG_ERRORS_IN_CONSOLE === 'true';
    bool_value && console.log(error.response);
    CheckError(error.response)
    return error.response;
}

const AxiosHelper = {
    getData: async (url, formData = null) => {
        try {
            commonHeadres()
            var data = await axios.get(url, { params: formData })
            return data;
        } catch (error) {
            return errorData(error)
        }
    },
    postData: async (url, formData, type) => {
        try {
            commonHeadres()
            var data = await axios.post(url, formData, { headers: { "Content-Type": type ? "multipart/form-data" : "application/json" } })
            return data;
        } catch (error) {
            return errorData(error)
        }
    },

    downloadFile: async (url, formData) => {
        try {
            commonHeadres()
            var data = await axios.post(url, formData, { responseType: 'blob' })
            return data;
        } catch (error) {
            return errorData(error)
        }
    },
    putData: async (url, formData, type) => {
        try {
            commonHeadres()
            var data = await axios.put(url, formData, { headers: { "Content-Type": type ? "multipart/form-data" : "application/json" } })
            return data;
        } catch (error) {
            return errorData(error)
        }
    },
    deleteData: async (url) => {
        try {
            commonHeadres()
            var data = await axios.delete(url)
            return data;
        } catch (error) {
            return errorData(error)
        }
    }
}

export default AxiosHelper;