import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://reacta-app-burger.firebaseio.com/',
});

export default instance 