import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';

const useDeliveryMan = () => {
     const {user, loading}= useAuth();
     // console.log(user);
     const axiosSecure= useAxiosSecure();
     const isDeliveryMen = async () => {
          const res = await axiosSecure.get(`/user/${user?.email}`);
          return res;
     }
     const { data, isPending: deliveryMenLoading  } = useQuery({
          queryKey: ['isDeliveryMen'],
          enabled: !loading,
          queryFn: isDeliveryMen,
     });
     console.log('deliveryMen',data?.data?.userType);
     if (data?.data?.userType ==='deliveryMen') {
          let deliveryMen =true;
          return{deliveryMen, deliveryMenLoading}
          
     }else{
         let deliveryMen =false;
          return{deliveryMen, deliveryMenLoading}   
     }
};

export default useDeliveryMan;


