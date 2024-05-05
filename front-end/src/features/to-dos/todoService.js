import axios from "axios";

const API_URL = 'http://localhost:3000/';

//create a new to do
const createToDo = async (todoData, token) => {

    //create config variable with objects
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    //make a post request to the api_url, send our to do data and pass in our config which has our token.
    //we need our token bc to dos is a protected route.
    const response = await axios.post(API_URL, todoData, config)

    return response.data

}

//get user to dos
const getToDos = async (token) => {

    //create config variable with objects
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get(API_URL, config)

    return response.data

}

//delete user to do
const deleteToDo = async (todoId, token) => {

    //create config variable with objects
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.delete(API_URL + todoId, config)

    return response.data

}

const todoService = {
    createToDo,
    getToDos,
    deleteToDo
}

export default todoService;