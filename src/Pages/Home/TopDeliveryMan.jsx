
import Rating from 'react-rating';

const TopDeliveryMan = () => {
  // Your data for the top 5 delivery men
  const deliveryMen = [
     {
       name: 'John Doe',
       image: 'https://via.placeholder.com/150',
       delivered: 215,
       ratings: 4.8,
     },
     {
       name: 'Jane Smith',
       image: 'https://via.placeholder.com/150',
       delivered: 189,
       ratings: 4.5,
     },
     {
       name: 'Jane Smith',
       image: 'https://via.placeholder.com/150',
       delivered: 189,
       ratings: 4.5,
     },
     {
       name: 'Jane Smith',
       image: 'https://via.placeholder.com/150',
       delivered: 189,
       ratings: 3.5,
     },
     {
       name: 'Jane Smith',
       image: 'https://via.placeholder.com/150',
       delivered: 189,
       ratings: 4.5,
     },
     // Add more delivery men data as needed
   ];
   

  return (
     <div className="py-5">
          <h2 className="text-3xl font-semibold text-center mb-8">Top Delivery Man</h2>
    <div className="flex flex-wrap justify-center gap-4">
      {deliveryMen.map((deliveryMan, index) => (
        <div
          key={index}
          className="max-w-md rounded overflow-hidden shadow-lg bg-white"
        >
          <img
            className="w-full"
            src={deliveryMan.image}
            alt={deliveryMan.name}
          />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">
              {deliveryMan.name}
            </div>
            <p className="text-gray-700 text-base">
              Parcels Delivered: {deliveryMan.delivered}
            </p>
            <p className="text-gray-700 text-base">
              Average Ratings: 
              <Rating
            initialRating={deliveryMan.ratings}
            emptySymbol={<span className="text-gray-300">&#9734;</span>}
            fullSymbol={<span className="text-yellow-500">&#9733;</span>}
            readonly={true}
          />
            </p>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
};

export default TopDeliveryMan;
