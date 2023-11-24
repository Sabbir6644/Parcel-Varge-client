// import { useQuery } from '@tanstack/react-query';
// import useAxiosSecure from './useAxiosSecure';
// import useAuth from './useAuth';



// const useAdmin = () => {
//      const {user, loading}= useAuth();
//      const axiosSecure = useAxiosSecure();
//      const isAdmin = async () => {
//           const res = await axiosSecure.get(`users/${user?.email}`);
//           return res;
//      }
//      const { data, isPending: adminLoading  } = useQuery({
//           queryKey: ['userInfo'],
//           enabled: !loading,
//           queryFn: isAdmin,
//      });
//      // console.log(data?.data?.userRole);
//      const admin = data?.data?.userRole
//      return {admin, adminLoading};
// };

// export default useAdmin;