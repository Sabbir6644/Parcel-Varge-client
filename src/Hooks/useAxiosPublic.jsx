import axios from 'axios';
const instance = axios.create({
     baseURL: 'http://localhost:5000',
     withCredentials: true
});
// https://assignment-12-server-gilt.vercel.app
// http://localhost:5000
const useAxiosPublic = () => {
     return instance;
};

export default useAxiosPublic;