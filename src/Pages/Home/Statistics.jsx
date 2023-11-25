
import CountUp from 'react-countup';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const Statistics = () => {
  const axiosPublic = useAxiosPublic();

     const parcelsDelivered = 1120;
      
     const allParcelsCount = async () => {
      const res = await axiosPublic.get('/parcelsCount');
      return res;
 }
     const allUserCount = async () => {
      const res = await axiosPublic.get('/userCount');
      return res;
 }
 const { data: count } = useQuery({
  queryKey: ['allUserCount'],
  queryFn: allUserCount,
});
 const { data: parcel } = useQuery({
  queryKey: ['allParcelsCount'],
  queryFn: allParcelsCount,
});
const parcelsBooked=(parcel?.data?.count);
const users=(count?.data?.count);
  return (
     <div>
          <h2 className="text-3xl font-semibold text-center my-8">Our Statistics</h2>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto justify-center items-center">
      
      <div className="w-full  p-4">
        <div className="bg-white p-6 rounded-md border border-blue-600 text-center">
          <h3 className="text-3xl text-blue-600 font-bold mb-2">Parcels Booked</h3>
          <CountUp className='text-xl  font-bold' start={0} end={parcelsBooked} duration={3} />
        </div>
      </div>
      <div className="w-full  p-4">
        <div className="bg-white border border-blue-600  p-6 rounded-lg shadow-lg text-center">
          <h3 className="text-3xl text-blue-600  font-bold mb-2">Parcels Delivered</h3>
          <CountUp className='text-xl font-bold' start={0} end={parcelsDelivered} duration={3} />
        </div>
      </div>
      <div className="w-full  p-4">
        <div className="bg-white border border-blue-600  p-6 rounded-lg shadow-lg text-center">
          <h3 className="text-3xl text-blue-600  font-bold mb-2">Users</h3>
          <CountUp className='text-xl font-bold' start={0} end={users} duration={3} />
        </div>
      </div>
    </div>
    </div>
  );
};

export default Statistics;
