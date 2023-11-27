import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from './../../../../Hooks/useAxiosSecure';
import { Link } from "react-router-dom";
import Loading from "../../../../Components/Loading/Loading";
import Swal from "sweetalert2";
import { useMemo, useState } from "react";




const MyParcels = () => {
     const { user } = useAuth();
     const axiosSecure = useAxiosSecure();
     const [parcelId, setParcelId] = useState(0);
     const [deliveryMenId, setDeliveryMenId] = useState(0);
     const [rating, setRating] = useState(0);
     const [feedback, setFeedback] = useState('');
     const [showModal, setShowModal] = useState(false);
     const [reviewSubmittedForParcel, setReviewSubmittedForParcel] = useState({});

     const handleSubmit = async (event) => {
          event.preventDefault();
          axiosSecure.post('/review', {
               deliveryMenId: deliveryMenId,
               parcelId: parcelId,
               review: parseInt(rating),
               feedback: feedback,
               reviewGiverName: user?.displayName,
               reviewGiverImage: user?.photoURL,
               reviewDate: new Date().toISOString().split('T')[0],

          })
               .then(response => {
                    if (response.data?.acknowledged) {
                         setReviewSubmittedForParcel({
                              ...reviewSubmittedForParcel,
                              [parcelId]: true, // Update state to indicate review submission for the specific parcel
                            });
                         refetch();
                         Swal.fire({
                              title: "Review!",
                              text: "Review Submitted",
                              icon: "success",
                              showConfirmButton: false,
                              timer: 1500
                         });
                    }
               })


          setShowModal(false);
     };

     const myBookings = async () => {
          const res = await axiosSecure.get(`/parcelBook/${user.email}`);
          return res;
     }
     const { data, isFetching, isLoading, refetch } = useQuery({
          queryKey: ['myBooking'],
          queryFn: myBookings,
     });
     const myParcel = data?.data;
     const [statusFilter, setStatusFilter] = useState('');

     // Update the filter value when the dropdown changes
     const handleStatusFilterChange = (e) => {
          setStatusFilter(e.target.value);
     };


     const filteredData = useMemo(() => {
          let filteredParcels = myParcel;

          if (statusFilter && statusFilter !== 'Booking Status') {
               filteredParcels = myParcel.filter((parcel) => parcel.status === statusFilter);
          }

          return filteredParcels;
     }, [myParcel, statusFilter]);



     const handleCancel = async (id) => {
          Swal.fire({
               title: "Are you sure?",
               text: "You won't be able to revert this!",
               icon: "warning",
               showCancelButton: true,
               confirmButtonColor: "#3085d6",
               cancelButtonColor: "#d33",
               confirmButtonText: "Yes, delete bookings!"
          }).then(async (result) => {
               if (result.isConfirmed) {

                    const res = await axiosSecure.delete(`/cancelBooking/${id}`)
                    console.log(res);
                    if (res?.data?.deletedCount > 0) {
                         refetch();
                         Swal.fire({
                              title: "Deleted!",
                              text: "Your booking has been deleted.",
                              icon: "success",
                              showConfirmButton: false,
                              timer: 1500
                         });
                    }

               }
          });
     }

     return (
          <div>

               {
                    isFetching || isLoading ? (
                         <Loading />
                    ) :
                         (<div>
                              {
                                   myParcel?.length < 1 ? (
                                        <div className="flex justify-center items-center min-h-screen">
                                             <img src="https://i.ibb.co/HKnfZjp/empty.png" alt="" />
                                             <p className="text-5xl font-bold text-center font-rancho">You have no parcel history</p>
                                        </div>
                                   ) : (
                                        <div>
                                             <h2 className="text-center text-3xl font-semibold my-5">My parcel</h2>
                                             <div className="overflow-auto max-h-[500px] rounded-md uppercase">
                                                  <table className="table">
                                                       <thead className="bg-gray-200 text-base">
                                                            <tr>
                                                                 <th>#</th>
                                                                 <th>Parcel Type</th>
                                                                 <th>Requested Delivery Date</th>
                                                                 <th> Approximate Delivery Date</th>
                                                                 <th>Booking Date</th>
                                                                 <th>Delivery Men ID</th>
                                                                 <th><select value={statusFilter} onChange={handleStatusFilterChange}>
                                                                      <option>Booking Status</option>
                                                                      <option value={'pending'}>Pending</option>
                                                                      <option value={'on the way'}>On The Way</option>
                                                                      <option value={'Delivered'}>Delivered</option>
                                                                 </select>
                                                                 </th>
                                                                 <th className="text-center">Action</th>
                                                                 <th></th>
                                                            </tr>
                                                       </thead>
                                                       <tbody>
                                                            {
                                                                 filteredData?.map((parcel, index) =>
                                                                      <tr key={index}>
                                                                           <th>{index + 1}</th>
                                                                           {/* bookingDate  deliveryManId, approximateDeliveryDate */}
                                                                           <td>{parcel?.parcelType}</td>
                                                                           <td>{parcel?.requestedDeliveryDate}</td>
                                                                           <td>{parcel?.approximateDeliveryDate ? parcel?.approximateDeliveryDate : 'Not Decided'}</td>
                                                                           <td>{parcel?.bookingDate?.split("T")[0]}</td>
                                                                           <td>{parcel?.deliveryManId ? parcel?.deliveryManId : 'Not Assigned'}</td>
                                                                           <td>{parcel?.status}</td>
                                                                           {
                                                                                parcel?.status === 'Delivered' ?  (
                                                                                     reviewSubmittedForParcel[parcel._id] ? ( // Check if review is submitted for this parcel
                                                                                       <td className="flex justify-center">
                                                                                         <button className="btn" disabled>
                                                                                           Review Submitted
                                                                                         </button>
                                                                                       </td>
                                                                                     ):(
                                                                                          <td className="flex justify-center">
                                                                                            <button
                                                                                              onClick={() => {
                                                                                                setShowModal(true);
                                                                                                setParcelId(parcel._id);
                                                                                                setDeliveryMenId(parcel?.deliveryManId);
                                                                                              }}
                                                                                              className="btn"
                                                                                            >
                                                                                              Review
                                                                                            </button>
                                                                                          </td>
                                                                                        )) : (
                                                                                     parcel?.status === 'pending' ? (
                                                                                          <td className="flex gap-2">
                                                                                               <Link to={`/dashboard/update/${parcel?._id}`}>
                                                                                                    <button className="btn">Update</button>
                                                                                               </Link>
                                                                                               <button onClick={() => handleCancel(parcel._id)} className="btn">Cancel</button>
                                                                                          </td>
                                                                                     ) : (
                                                                                          <td className="flex gap-2">
                                                                                               <button className="btn" disabled="disabled">Update</button>
                                                                                               <button className="btn" disabled="disabled">Cancel</button>
                                                                                          </td>
                                                                                     )
                                                                                )
                                                                           }


                                                                      </tr>

                                                                 )
                                                            }
                                                       </tbody>
                                                  </table>
                                             </div>
                                        </div>
                                   )
                              }
                         </div>
                         )


               }

               {
                    showModal && <div className="fixed z-50 inset-0 overflow-y-auto bg-opacity-75 bg-gray-500 flex justify-center items-center">
                         <div className="bg-white rounded shadow-lg p-6 max-w-md w-full">
                              <h2 className="text-lg text-center font-semibold mb-4">Give Review</h2>
                              <form onSubmit={handleSubmit}>
                                   <div className="mb-2">
                                        <label className="block mb-1" htmlFor="rating">Name</label>
                                        <input
                                             type="text"
                                             value={user?.displayName}
                                             readOnly
                                             className="border rounded px-2 py-1 w-full"
                                        />
                                   </div>
                                   <div className="mb-2">
                                        <label className="block mb-1" htmlFor="rating">Your Photo</label>
                                        <input
                                             type="text"
                                             value={user?.photoURL}
                                             readOnly
                                             className="border rounded px-2 py-1 w-full"
                                        />
                                   </div>
                                   <div className="mb-2">
                                        <label className="block mb-1" htmlFor="rating">Delivery Men Id</label>
                                        <input
                                             type="text"
                                             value={deliveryMenId}
                                             readOnly
                                             className="border rounded px-2 py-1 w-full"
                                        />
                                   </div>
                                   <div className="mb-2">
                                        <label className="block mb-1" htmlFor="rating">Rating out of 5:</label>
                                        <input
                                             type="number"
                                             id="rating"
                                             min={1}
                                             max={5}
                                             value={rating}
                                             onChange={(e) => setRating(e.target.value)}
                                             className="border rounded px-2 py-1 w-full"
                                        />
                                   </div>
                                   <div className="mb-2">
                                        <label className="block mb-1" htmlFor="feedback">Feedback:</label>
                                        <textarea
                                             id="feedback"
                                             value={feedback}
                                             onChange={(e) => setFeedback(e.target.value)}
                                             className="border rounded px-2 py-1 w-full"
                                             rows="4"
                                        ></textarea>
                                   </div>
                                   {/* Add other form fields for user's name, image, etc. */}
                                   <button
                                        type="submit"
                                        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded shadow"
                                   >
                                        Submit Review
                                   </button>
                              </form>

                         </div>
                    </div>
               }

          </div>
     );
};

export default MyParcels;