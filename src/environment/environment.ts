import axios from 'axios';

const http = axios.create({
    baseURL: 'https://portohoot-backend.vercel.app/api/'
});

export default http;