import { useState } from 'react';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../../Components/Loading/Loading';

const AllParcels = () => {
     const [showModal, setShowModal] = useState(false);
     const [selectedDeliveryMan, setSelectedDeliveryMan] = useState('');
     const [approximateDeliveryDate, setApproximateDeliveryDate] = useState('');
     // 
     const axiosSecure = useAxiosSecure();

     const allParcel = async () => {
          const res = await axiosSecure.get('/parcels');
          return res;
     }
     const deliveryMen = async () => {
          const res = await axiosSecure.get('/deliverymen');
          return res;
     }
     const { data, isFetching, isLoading, refetch } = useQuery({
          queryKey: ['allParcel'],
          queryFn: allParcel,
     });
     const parcels = data?.data;
     // 
     const { data:man } = useQuery({
          queryKey: ['deliveryman'],
          queryFn: deliveryMen,
     });
const deliveryMans= man?.data
// console.log(deliveryMans);

     const handleAssignDelivery = () => {
          // Handle the assignment logic here
          console.log('Assign Delivery:', selectedDeliveryMan, approximateDeliveryDate);
          setShowModal(false);
     };

     return (
          <div>
               {
                    isFetching || isLoading ? (
                         <Loading />
                    ) : (
                         <div className="container mx-auto">
                              <h1 className="text-center text-3xl font-semibold my-5">All Parcels</h1>

                              <div className='overflow-auto h-[450px] rounded-md uppercase'>
                                   <table className="table rounded-md">
                                        <thead className='bg-gray-200 text-base'>
                                             <tr>
                                                  <th>#</th>
                                                  <th>Users Name</th>
                                                  <th>Users Phone</th>
                                                  <th>Booking Date</th>
                                                  <th>Requested Delivery Date</th>
                                                  <th>Cost</th>
                                                  <th>Status</th>
                                                  <th>Manage</th>
                                             </tr>
                                        </thead>
                                        <tbody>
                                             {parcels?.map((parcel, index) => (
                                                  <tr key={index}>
                                                       <td>{index + 1}</td>
                                                       <td>{parcel?.name}</td>
                                                       <td>{parcel?.phoneNumber}</td>
                                                       <td>{parcel?.bookingDate ? parcel.requestedDeliveryDate.split('T')[0] : ''}</td>

                                                       <td>{parcel?.requestedDeliveryDate}</td>
                                                       <td>{parcel?.price}</td>
                                                       <td>{parcel?.status}</td>
                                                       <td>
                                                            <button
                                                                 onClick={() => setShowModal(true)}
                                                                 className="px-3 py-1 bg-blue-500 text-white rounded-md focus:outline-none focus:bg-blue-600"
                                                            >
                                                                 Manage
                                                            </button>
                                                       </td>
                                                  </tr>
                                             ))}
                                        </tbody>
                                   </table>
                              </div>

                              {/* Modal */}
                              {showModal && (
                                   <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
                                        <div className="bg-white p-8 rounded-lg">
                                             <h2 className="text-lg font-bold mb-4">Assign Delivery</h2>
                                             <div className="flex flex-col gap-4">
                                                  <select
                                                       className="border border-gray-300 rounded-md px-3 py-2"
                                                       onChange={(e) => setSelectedDeliveryMan(e.target.value)}
                                                  > 
                                                  <option value="">Select Delivery Man</option>
                                                  {
                                                       deliveryMans?.map((man)=><option key={man._id} value={man._id}>{man?.name}</option>)
                                                  }
                                                       
                                                       {/* Populate delivery men options here */}
                                                  </select>
                                                  <input
                                                       type="date"
                                                       className="border border-gray-300 rounded-md px-3 py-2"
                                                       value={approximateDeliveryDate}
                                                       onChange={(e) => setApproximateDeliveryDate(e.target.value)}
                                                  />
                                                  <button
                                                       onClick={handleAssignDelivery}
                                                       className="px-4 py-2 bg-blue-500 text-white rounded-md focus:outline-none focus:bg-blue-600"
                                                  >
                                                       Assign
                                                  </button>
                                                  <button
                                                       onClick={() => setShowModal(false)}
                                                       className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md focus:outline-none focus:bg-gray-400"
                                                  >
                                                       Close
                                                  </button>
                                             </div>
                                        </div>
                                   </div>
                              )}
                         </div>
                    )
               }
          </div>
     );
};

export default AllParcels;
