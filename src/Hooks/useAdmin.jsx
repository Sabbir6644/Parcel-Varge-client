import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';



const useAdmin = () => {
     const {user, loading}= useAuth();
     // console.log(user);
     const axiosSecure= useAxiosSecure();
     const isAdmin = async () => {
          const res = await axiosSecure.get(`/user/${user?.email}`);
          return res;
     }
     const { data, isPending: adminLoading  } = useQuery({
          queryKey: ['isAdmin'],
          enabled: !loading,
          queryFn: isAdmin,
     });
     console.log('useAdmin',data?.data?.userType);
     if (data?.data?.userType ==='admin') {
          let admin =true;
          return{admin, adminLoading}
          
     }else{
         let admin =false;
          return{admin, adminLoading}   
     }
     
    
};

export default useAdmin;