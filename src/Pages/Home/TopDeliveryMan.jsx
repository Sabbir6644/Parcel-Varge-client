
import Rating from 'react-rating';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../Components/Loading/Loading';

const TopDeliveryMan = () => {

  const axiosPublic = useAxiosPublic();

  const topDeliveryMan = async () => {

    const res = await axiosPublic.get('/topDeliveryMen');
    return res;
  }
  const { data: deliveryManData, isFetching, isLoading } = useQuery({
    queryKey: ['topDeliveryMan'],
    queryFn: topDeliveryMan,
  });
  const deliveryMen = deliveryManData?.data;
  // const deliveryMen = [
  //    {
  //      name: 'John Doe',
  //      image: 'https://via.placeholder.com/150',
  //      delivered: 215,
  //      ratings: 4.8,
  //    },
  //    {
  //      name: 'Jane Smith',
  //      image: 'https://via.placeholder.com/150',
  //      delivered: 189,
  //      ratings: 4.5,
  //    },
  //    {
  //      name: 'Jane Smith',
  //      image: 'https://via.placeholder.com/150',
  //      delivered: 189,
  //      ratings: 4.5,
  //    },
  //    {
  //      name: 'Jane Smith',
  //      image: 'https://via.placeholder.com/150',
  //      delivered: 189,
  //      ratings: 3.5,
  //    },
  //    {
  //      name: 'Jane Smith',
  //      image: 'https://via.placeholder.com/150',
  //      delivered: 189,
  //      ratings: 4.5,
  //    },
  //    // Add more delivery men data as needed
  //  ];
   

  return (
     <div className="py-5">
          <h2 className="text-3xl font-semibold text-center mb-8">Top Delivery Man</h2>
    {
      isFetching || isLoading? <Loading/>:
      <div className="flex flex-wrap justify-center gap-4">
      {deliveryMen?.map((deliveryMan, index) => (
        <div
          key={index}
          className="max-w-[230px] rounded overflow-hidden shadow-lg bg-white"
        >
          <img
            className="w-full h-[60%]"
            src={deliveryMan?.photo}
            alt={deliveryMan?.name}
          />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">
              {deliveryMan?.name}
            </div>
            <p className="text-gray-700 text-base">
              Parcels Delivered: {deliveryMan?.totalDelivery}
            </p>
            <p className="text-gray-700 text-base flex gap-1">
              Ratings: 
              <Rating
            initialRating={deliveryMan?.averageReview}
            emptySymbol={<span className="text-gray-300">&#9734;</span>}
            fullSymbol={<span className="text-yellow-500">&#9733;</span>}
            readonly={true}
          />
            </p>
          </div>
        </div>
      ))}
    </div>
    }
    </div>
  );
};

export default TopDeliveryMan;
