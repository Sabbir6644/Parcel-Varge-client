import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../../SharedComponents/Hooks/useAuth';
import useAxiosSecure from '../../../../SharedComponents/Hooks/useAxiosSecure';
const useCartData = () => {
     const { user } = useAuth();    
     const axiosSecure = useAxiosSecure();
     
     const cartData = async () => {
       const res = await axiosSecure.get(`/cart/${user?.email}`);
       return res;
     }
   
     const { data, refetch, isFetching} = useQuery({
       queryKey: ['cartData'],
       queryFn: cartData,
     });
   
     const cartItems = data?.data;
     return {cartData, cartItems, refetch, isFetching}
 
};

export default useCartData;