import axios from 'axios';
const instance = axios.create({
     baseURL: 'https://assignment-12-server-gilt.vercel.app',
     withCredentials: true
});
// https://assignment-12-server-gilt.vercel.app
// http://localhost:5000
const useAxiosPublic = () => {
     return instance;
};

export default useAxiosPublic;