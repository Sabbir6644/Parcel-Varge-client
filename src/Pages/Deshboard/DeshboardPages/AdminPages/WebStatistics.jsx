import Chart from 'react-apexcharts';

const WebStatistics = () => {

     const bookingsByDate = {
          options: {
            xaxis: {
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
            },
          },
          series: [
            {
              name: 'Bookings',
              data: [30, 40, 45, 50, 49, 60, 70],
            },
          ],
        };
      
        const parcelsComparison = {
          options: {
            xaxis: {
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
            },
          },
          series: [
            {
              name: 'Booked',
              data: [20, 25, 30, 35, 40, 45, 50],
            },
            {
              name: 'Delivered',
              data: [15, 20, 25, 30, 35, 40, 45],
            },
          ],
        };

     return (
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
     );
};

export default WebStatistics;




