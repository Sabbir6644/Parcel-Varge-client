import { useState } from 'react';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../../Components/Loading/Loading';
import Swal from 'sweetalert2';

const AllParcels = () => {
     const [showModal, setShowModal] = useState(false);
     const [selectedDeliveryMan, setSelectedDeliveryMan] = useState('');
     const [approximateDeliveryDate, setApproximateDeliveryDate] = useState('');
     const [parcelId, setParcelId] = useState('');


     const [fromDate, setFromDate] = useState('');
     const [toDate, setToDate] = useState('');
     // 
     const axiosSecure = useAxiosSecure();

     const allParcel = async (fromDate, toDate) => {
          const res = await axiosSecure.get(`/parcels?fromDate=${fromDate}&toDate=${toDate}`);
          return res;
     };

     const deliveryMen = async () => {
          const res = await axiosSecure.get('/allDeliveryMen');
          return res;
     }
     const { data, isFetching, isLoading, refetch } = useQuery({
          queryKey: ['allParcel', fromDate, toDate],
          queryFn: () => allParcel(fromDate, toDate),
     });

     const parcels = data?.data;
     // 
     const { data: man } = useQuery({
          queryKey: ['deliveryman'],
          queryFn: deliveryMen,
     });
     const deliveryMans = man?.data
     // console.log(deliveryMans);
     const filteredParcels = parcels?.filter((parcel) => {
          if (!fromDate && !toDate) {
               return true; // If no date range is selected, return all parcels
          }
          const requestedDeliveryDate = new Date(parcel.requestedDeliveryDate);
          const fromDateTime = fromDate ? new Date(fromDate) : new Date(0);
          const toDateTime = toDate ? new Date(toDate) : new Date();
          return requestedDeliveryDate >= fromDateTime && requestedDeliveryDate <= toDateTime;
     });

     const handleAssignDelivery = () => {
  
          axiosSecure.put(`/parcel/${parcelId}`, {
               status: 'on the way',
               deliveryManId: selectedDeliveryMan,
               approximateDeliveryDate: approximateDeliveryDate,
          })
               .then(response => {
                    if (response.data.modifiedCount > 0) {
                         refetch();
                         Swal.fire({
                              title: "Updated!",
                              text: "Status Updated",
                              icon: "success",
                              showConfirmButton: false,
                              timer: 1500
                         });
                    }
               })


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


                              <div className="flex justify-around mb-4">
                                   <div className='flex gap-2 items-center'>
                                        <label htmlFor="">From</label>
                                        <input
                                             type="date"
                                             className="border border-gray-300 rounded-md px-3 py-2"
                                             value={fromDate}
                                             onChange={(e) => setFromDate(e.target.value)}
                                        />
                                   </div>
                                   <div className='flex gap-2 items-center'>
                                        <label htmlFor="">To</label>
                                        <input
                                             type="date"
                                             className="border border-gray-300 rounded-md px-3 py-2"
                                             value={toDate}
                                             onChange={(e) => setToDate(e.target.value)}
                                        />
                                   </div>
                              </div>



                              {
                                   filteredParcels?.length ?

                                        (
                                             <div className='overflow-auto h-[450px] rounded-md uppercase'>
                                                  <table className="table-auto border-collapse border w-full border-gray-500">
                                                       <thead className='bg-gray-200 text-base'>
                                                            <tr>
                                                                 <th className="border border-gray-500 px-4 py-2">#</th>
                                                                 <th className="border border-gray-500 px-4 py-2">Users Name</th>
                                                                 <th className="border border-gray-500 px-4 py-2">Users Phone</th>
                                                                 <th className="border border-gray-500 px-4 py-2">Booking Date</th>
                                                                 <th className="border border-gray-500 px-4 py-2">Requested Delivery Date</th>
                                                                 <th className="border border-gray-500 px-4 py-2">Cost</th>
                                                                 <th className="border border-gray-500 px-4 py-2">Status</th>
                                                                 <th className="border border-gray-500 px-4 py-2">Manage</th>
                                                            </tr>
                                                       </thead>
                                                       <tbody>
                                                            {filteredParcels?.map((parcel, index) => (
                                                                 <tr key={index}>
                                                                      <td className='border border-gray-500 px-4 py-2'>{index + 1}</td>
                                                                      <td className='border border-gray-500 px-4 py-2'>{parcel?.name}</td>
                                                                      <td className='border border-gray-500 px-4 py-2'>{parcel?.phoneNumber}</td>
                                                                      <td className='border border-gray-500 px-4 py-2'>{parcel?.bookingDate ? parcel.bookingDate.split('T')[0] : ''}</td>
                                                                      <td className='border border-gray-500 px-4 py-2 text-center'>{parcel?.requestedDeliveryDate}</td>
                                                                      <td className='border border-gray-500 px-4 py-2'>{parcel?.price}</td>
                                                                      <td className='border border-gray-500 px-4 py-2'>{parcel?.status}</td>
                                                                      <td className='border border-gray-500 px-4 py-2'>
                                                                           {
                                                                                parcel?.status==='Delivered'?<button
                                                                                disabled
                                                                                className="px-3 py-1 bg-gray-200 text-white rounded-md focus:outline-none focus:bg-blue-600"
                                                                           >
                                                                                Manage
                                                                           </button>: <button
                                                                                onClick={() => {
                                                                                     setShowModal(true);
                                                                                     setParcelId(parcel._id);
                                                                                }}
                                                                                className="px-3 py-1 bg-blue-500 text-white rounded-md focus:outline-none focus:bg-blue-600"
                                                                           >
                                                                                Manage
                                                                           </button>
                                                                           }
                                                                      </td>
                                                                 </tr>
                                                            ))}
                                                       </tbody>
                                                  </table>
                                             </div>
                                        ) : <div className='flex justify-center items-center'>
                                             <h2 className=' text-2xl font-medium'>No Data Found</h2>
                                        </div>
                              }





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
                                                            deliveryMans?.map((man) => <option key={man._id} value={man?._id}>{man?.name}</option>)
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
