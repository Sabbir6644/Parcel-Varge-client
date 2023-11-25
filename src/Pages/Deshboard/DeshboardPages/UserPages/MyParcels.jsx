import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from './../../../../Hooks/useAxiosSecure';
import { Link } from "react-router-dom";
import Loading from "../../../../Components/Loading/Loading";
import Swal from "sweetalert2";


const MyParcels = () => {
     const { user } = useAuth();
     const axiosSecure = useAxiosSecure();

     const myBookings = async () => {
          const res = await axiosSecure.get(`/parcelBook/${user.email}`);
          return res;
     }
     const { data, isFetching, isLoading, refetch } = useQuery({
          queryKey: ['myBooking'],
          queryFn: myBookings,
     });
     const myParcel = data?.data;
     // console.log('my parcel', myParcel);
     const handleCancel = async (id) => {
          // console.log('cancle id',_id);
          // console.log('cancle id',myParcel._id);
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

                    const res = await axiosSecure.delete(`/user/cancelBooking/${id}`)
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
                                   myParcel.length < 1 ? (
                                        <div className="flex justify-center items-center min-h-screen">
                                             <img src="https://i.ibb.co/HKnfZjp/empty.png" alt="" />
                                             <p className="text-5xl font-bold text-center font-rancho">You have no ordered any food</p>
                                        </div>
                                   ) : (
                                        <div>
                                             <h2 className="text-center text-3xl font-semibold my-5">My parcel</h2>
                                             <div className="overflow-x-auto rounded-md">
                                                  <table className="table">
                                                       <thead className="bg-gray-200">
                                                            <tr>
                                                                 <th>#</th>
                                                                 <th>Parcel Type</th>
                                                                 <th>Requested Delivery Date</th>
                                                                 <th> Approximate Delivery Date</th>
                                                                 <th>Booking Date</th>
                                                                 <th>Delivery Men ID</th>
                                                                 <th>Booking Status</th>
                                                                 <th className="text-center">Action</th>
                                                                 <th></th>
                                                            </tr>
                                                       </thead>
                                                       <tbody>
                                                            {
                                                                 myParcel?.map((parcel, index) =>
                                                                      <tr key={index}>
                                                                           <th>{index + 1}</th>
                                                                           {/* bookingDate */}
                                                                           <td>{parcel?.parcelType}</td>
                                                                           <td>{parcel?.requestedDeliveryDate}</td>
                                                                           <td>{parcel?.approximateDeliveryDate ? parcel?.approximateDeliveryDate : 'Not Decided'}</td>
                                                                           <td>{parcel?.bookingDate?.split("T")[0]}</td>
                                                                           <td>{parcel?.deliveryMenID ? parcel?.deliveryMenID : 'Not Assigned'}</td>
                                                                           <td>{parcel?.status}</td>
                                                                           {
                                                                                parcel?.status === 'pending' ? <td className="flex gap-2"><Link to={`/deshboard/update/${parcel?._id}`}><button className="btn">Update</button></Link>
                                                                                     <button onClick={() => handleCancel(parcel._id)} className="btn">Cancel</button></td> : <td></td>
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

          </div>
     );
};

export default MyParcels;