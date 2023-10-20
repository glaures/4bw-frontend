import axios from 'axios'

const AUTHTOKEN_LOCAL_STORAGE_KEY = "api.4bw.authtoken";

const instance = axios.create({
    baseURL: String
});

instance.interceptors.response.use(originalResponse => {
    return originalResponse;
});

instance.interceptors.response.use((response) => response, (error) => {
    if (error?.response && error.response.status === 401) {
        setAuthtoken(null)
    }
    return Promise.reject(error)
});


function init() {
    instance.defaults.baseURL = import.meta.env.VITE_4BW_API_URL
    window.console.log('4BW API base URL: ' + instance.defaults.baseURL)
    const authtoken = localStorage.getItem(AUTHTOKEN_LOCAL_STORAGE_KEY)
    if(authtoken)
        setAuthtoken(authtoken)
}

function setAuthtoken(authtoken) {
    console.log('authentication token ' + authtoken)
    localStorage.setItem(AUTHTOKEN_LOCAL_STORAGE_KEY, authtoken)
    instance.defaults.headers.common['Authorization'] = 'Bearer ' + authtoken
}

init();

export default instance;