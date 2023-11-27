import { useEffect, useState } from "react";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Loading from "../../../../Components/Loading/Loading";
import Rating from "react-rating";


const MyReviews = () => {

  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [reviews, setReviews]= useState([]);

  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
       const fetchData = async () => {
            try {
                 // Get user information
                 const userRes = await axiosSecure.get(`/user/${user?.email}`);
                 const userId = userRes.data?._id;
                 // console.log(userId);

                 // Get delivery list using user ID
                 const reviewData = await axiosSecure.get(`/review/${userId}`);
                 const reviews = reviewData.data || [];

                 setReviews(reviews);
                 setIsFetching(false);
            } catch (error) {
                 // Handle errors
                 console.error('Error fetching data:', error);
                 setIsFetching(false);
            }
       };

       if (user) {
            setIsFetching(true);
            fetchData();
       }
  }, [axiosSecure, user]);



// console.log(reviews);




     return (
          <div className="container mx-auto p-8">
          {
            isFetching? <Loading/>:
            <div>
{
  reviews.length<1? <div className="flex justify-center items-center min-h-screen">
    <h2 className="text-3xl font-semibold mb-6">You have no Review</h2>
  </div>: <div>
  <h2 className="text-3xl text-center font-semibold mb-6">My Reviews</h2>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {reviews?.map((review) => (
      <div
        key={review._id}
        className="bg-white rounded border border-blue-600 p-6 flex flex-col justify-between"
      >
        <div>
          <div className="flex items-center mb-4">
            <img
              src={review?.reviewGiverImage}
              alt={review?.reviewGiversName}
              className="w-12 h-12 rounded-full mr-2"
            />
            <span className="font-semibold text-lg">{review?.reviewGiverName}</span>
          </div>
          <p className="text-sm text-gray-500 mb-4">{review.reviewDate}</p>
          <div className="flex items-center mb-4">
            <span className="mr-2">Rating:</span>
            <div className="flex items-center">
            <Rating
            initialRating={review?.review}
            emptySymbol={<span className="text-gray-300">&#9734;</span>}
            fullSymbol={<span className="text-yellow-500">&#9733;</span>}
            readonly={true}
          />
            </div>
          </div>
          <p>Feedback: {review.feedback}</p>
        </div>
      </div>
    ))}

  </div>
  </div>
}


            </div>
          }
        </div>
     );
};

export default MyReviews;