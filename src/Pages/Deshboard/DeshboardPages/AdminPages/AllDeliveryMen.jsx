
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../../Components/Loading/Loading';
import Rating from 'react-rating';


const AllDeliveryMen = () => {
     const axiosSecure = useAxiosSecure();

  const allDeliveryMens = async () => {

     const res = await axiosSecure.get('/allDeliveryMen');
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
      <table className="table-auto border-collapse border w-full border-gray-500">
        <thead className="bg-gray-200 text-base">
          <tr>
            <th className="border border-gray-500 px-4 py-2">Name</th>
            <th className="border border-gray-500 px-4 py-2">Phone Number</th>
            <th className="border border-gray-500 px-4 py-2">Parcels Delivered</th>
            <th className="border border-gray-500 px-4 py-2">Average Rating</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {deliveryMens?.map((deliveryMan, index) => (
            <tr key={index}>
              <td className="border border-gray-500 px-4 py-2">{deliveryMan?.name}</td>
              <td className="border border-gray-500 px-4 py-2">{deliveryMan?.phone?deliveryMan?.phone:'Not Found'}</td>
              <td className="border border-gray-500 px-4 py-2 text-center">{deliveryMan?.totalDelivery}</td>
              <td className="border border-gray-500 px-4 py-2 text-center">{deliveryMan?.averageReview}  <Rating
            initialRating={deliveryMan?.averageReview}
            emptySymbol={<span className="text-gray-300">&#9734;</span>}
            fullSymbol={<span className="text-yellow-500">&#9733;</span>}
            readonly={true}
          /> </td>
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
