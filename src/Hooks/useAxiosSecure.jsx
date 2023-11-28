import axios from 'axios';
import useAuth from './useAuth';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
const instance = axios.create({
     baseURL: 'http://localhost:5000',  
     withCredentials: true
});
// https://assignment-12-server-gilt.vercel.app
// http://localhost:5000
const useAxiosSecure = () => {

     const { logout }= useAuth();
     const navigate = useNavigate();
    useEffect(()=>{
     instance.interceptors.response.use(res=>{
          return res;
     }, error =>{
          if (error.response.status===401 || error.response.status===403) {
               // console.log('log out the user');
               logout()
               .then(()=>{
                    navigate('/login')
               })
               .catch(err=> console.log(err))
          }
     })
    },[logout,navigate])








     return instance;
};

export default useAxiosSecure;