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
                                                                      <option value={'delivered'}>Delivered</option>
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
                                                                                parcel?.status === 'pending' ? <td className="flex gap-2"><Link to={`/deshboard/update/${parcel?._id}`}><button className="btn">Update</button></Link>
                                                                                     <button onClick={() => handleCancel(parcel._id)} className="btn">Cancel</button></td> : <td className="flex gap-2"><button className="btn" disabled="disabled">Update</button>
                                                                                     <button className="btn" disabled="disabled">Cancel</button></td>
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