import Chart from 'react-apexcharts';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../../Components/Loading/Loading';

const WebStatistics = () => {
  const axiosSecure = useAxiosSecure();
  const bookings = async () => {

    const res = await axiosSecure.get('/bookings-by-date');
    return res;
  }
  const parcel = async () => {

    const res = await axiosSecure.get('/parcel-counts');
    return res;
  }
  const { data: parcelData } = useQuery({
    queryKey: ['parcel'],
    queryFn: parcel,
  });
  const parcelsCounts = parcelData?.data;
  // console.log(parcelsCounts);
  const { data: bookingData, isFetching, isLoading } = useQuery({
    queryKey: ['bookings'],
    queryFn: bookings,
  });
  const bookingDatas = (bookingData?.data?.bookingsByDate);

  const categories = bookingDatas?.map((item) => item._id);
  const counts = bookingDatas?.map((item) => item.count);


  const bookingsByDate = {
    options: {
      xaxis: {
        categories: categories,
      },
    },
    series: [
      {
        name: 'Bookings',
        data: counts,
      },
    ],
  };

  const parcelsComparison = {
    options: {
      xaxis: {
        categories: ['Total Parcels', 'Delivered Parcels'],
      },
    },
    series: [
      {
        name: 'Parcels',
        data: [parcelsCounts?.totalParcels, parcelsCounts?.deliveredParcels],
      },
    ],
  };


  return (
    <div>
      {
        isFetching || isLoading? <Loading/>:
        <div className="container mx-auto">
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Bookings by Date</h2>
        <div className='overflow-x-auto'>
          <Chart

            options={bookingsByDate.options}
            series={bookingsByDate.series}
            type="bar"
            height={400}

          />
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Booked vs Delivered Parcels</h2>
        <div className='overflow-x-auto'>
          <Chart
            options={parcelsComparison.options}
            series={parcelsComparison.series}
            type="line"
            height={400}
          />
        </div>
      </div>
    </div>
      }
    </div>
  );
};

export default WebStatistics;




