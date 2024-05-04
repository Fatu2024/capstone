import axios from 'axios'

const API_URL = 'http://localhost:3000/';

//register user:
//make the request and store the result in the response variable
const register = async (userData) => {

    const response = await axios.post(API_URL, userData)

    //make sure we have response data
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

//login
const login = async (userData) => {
    
    const response = await axios.post(API_URL + 'login', userData)

    //make sure we have response data
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}


//logout
const logout = async () => {
    localStorage.removeItem('user')
};

const authService = {
    register,
    logout,
    login
}

export default authService;