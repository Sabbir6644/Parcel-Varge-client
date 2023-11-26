
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../../Components/Loading/Loading';


const AllDeliveryMen = () => {
     const axiosSecure = useAxiosSecure();

  const allDeliveryMens = async () => {

     const res = await axiosSecure.get('/deliverymen');
     return res;
}
const { data, isFetching, isLoading } = useQuery({
     queryKey: ['allDeliveryMen'],
     queryFn: allDeliveryMens,
});
const deliveryMens = data?.data;

  return (
    <div>
     {
     isFetching || isLoading?(
          <Loading/>
     ):(
          <div className="container mx-auto">
      <h1 className="text-center text-3xl font-semibold my-5">All Delivery Men</h1>
      <div className='overflow-auto max-h-[450px] rounded-md'>
      <table className="table">
        <thead className="bg-gray-200 text-base">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone Number</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Parcels Delivered</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Average Review</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {deliveryMens?.map((deliveryMan, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap">{deliveryMan?.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{deliveryMan?.phoneNumber}</td>
              <td className="px-6 py-4 whitespace-nowrap">{deliveryMan?.parcelsDelivered}</td>
              <td className="px-6 py-4 whitespace-nowrap">{deliveryMan?.averageReview}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
     )
    }
    </div>
  );
};

export default AllDeliveryMen;
