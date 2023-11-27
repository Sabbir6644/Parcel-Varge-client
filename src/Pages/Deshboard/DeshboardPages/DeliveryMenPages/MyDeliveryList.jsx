
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import useAuth from '../../../../Hooks/useAuth';
// import { useQuery } from '@tanstack/react-query';
import Loading from '../../../../Components/Loading/Loading';
import { useEffect, useState } from 'react';
import MapViewModal from '../../SharedDesboard/ViewMap/MapViewModal';
import Swal from 'sweetalert2';

const MyDeliveryList = () => {
     const { user } = useAuth();
     //   /parcels?deliveryManId=6562a60e04707b9b30876bd5
     const axiosSecure = useAxiosSecure();
     const [parcelMapModals, setParcelMapModals] = useState({});

     // // console.log(parcels);
     const [parcels, setParcels] = useState([]);
     const [isFetching, setIsFetching] = useState(false);

     useEffect(() => {
          const fetchData = async () => {
               try {
                    // Get user information
                    const userRes = await axiosSecure.get(`/user/${user?.email}`);
                    const userId = userRes.data?._id;
                    // console.log(userId);

                    // Get delivery list using user ID
                    const deliveryListRes = await axiosSecure.get(`/parcels?deliveryManId=${userId}`);
                    const parcelData = deliveryListRes.data || [];

                    setParcels(parcelData);
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


     const handleUpdate = (parcelId, status) => {
          // console.log(parcelId, status);
          Swal.fire({
               title: "Are you sure?",
               text: `You want to ${status} this parcel!`,
               icon: "warning",
               showCancelButton: true,
               confirmButtonColor: "#3085d6",
               cancelButtonColor: "#d33",
               confirmButtonText: "Yes!"
          }).then(async (result) => {
               if (result.isConfirmed) {

                    const res = await axiosSecure.patch(`/updateParcelStatus/${parcelId}`, {
                         status,
                    })
                    console.log(res);
                    if (res.data.modifiedCount > 0) {
                         Swal.fire({
                              title: status,
                              text: `Parcel has been ${status}.`,
                              icon: "success",
                              showConfirmButton: false,
                              timer: 1500
                         });
                    }

               }
          });





     };


     const handleViewLocation = (parcelId) => {
          setParcelMapModals((prev) => ({
               ...prev,
               [parcelId]: true,
          }));
     };

     const handleCloseMapModal = (parcelId) => {
          setParcelMapModals((prev) => ({
               ...prev,
               [parcelId]: false,
          }));
     };


     return (
          <div>

               {
                    isFetching ? <Loading /> :

                         <div>
                              {
                                   parcels.length < 1 ? (
                                        <div className='flex justify-center items-center min-h-screen'>
                                             <h2 className='text-3xl font-semibold'>You have No Delivery history</h2>
                                        </div>
                                   ) : (
                                        <div className="container mx-auto">
                                        <h1 className="text-center text-3xl font-semibold my-5">My Delivery List</h1>
                                        <div className='overflow-auto'>
                                             <table className="table-auto border-collapse border w-full border-gray-500">
                                                  <thead>
                                                       <tr>
                                                            <th className="border border-gray-500 px-4 py-2">Users Name</th>
                                                            <th className="border border-gray-500 px-4 py-2">User Phone</th>
                                                            <th className="border border-gray-500 px-4 py-2">Receivers Name</th>
                                                            <th className="border border-gray-500 px-4 py-2">Recievers phone</th>
                                                            <th className="border border-gray-500 px-4 py-2">Requested Delivery Date</th>
                                                            <th className="border border-gray-500 px-4 py-2">Approximate Delivery Date</th>
                                                            <th className="border border-gray-500 px-4 py-2">Receivers Address</th>
                                                            {/* Add other table headers */}
                                                            <th className="border border-gray-500 px-4 py-2">Actions</th>
                                                       </tr>
                                                  </thead>
                                                  <tbody>
                                                       {
                                                            parcels?.map((parcel) => <tr key={parcel?._id}>
                                                                 <td className="border border-gray-500 px-4 py-2">{parcel?.name}</td>
                                                                 <td className="border border-gray-500 px-4 py-2">{parcel?.phoneNumber}</td>
                                                                 <td className="border border-gray-500 px-4 py-2">{parcel?.receiverName}</td>
                                                                 <td className="border border-gray-500 px-4 py-2">{parcel?.phoneNumber}</td>
                                                                 <td className="border border-gray-500 px-4 py-2">{parcel?.requestedDeliveryDate}</td>
                                                                 <td className="border border-gray-500 px-4 py-2">{parcel?.approximateDeliveryDate}</td>
                                                                 <td className="border border-gray-500 px-4 py-2">{parcel?.parcelDeliveryAddress}</td>
                                                                 {/* Add other table data */}
                                                                 <td className="border border-gray-500 flex flex-col gap-2 px-4 py-2">
                                                                      <div>
                                                                           <button
                                                                                onClick={() => handleViewLocation(parcel._id)} // Pass parcel ID
                                                                                className="mr-2 px-3 py-1 bg-blue-500 text-white rounded-md focus:outline-none focus:bg-blue-600"
                                                                           >
                                                                                View Location
                                                                           </button>
                                                                           {parcelMapModals[parcel?._id] && ( // Show modal if parcel's modal state is true
                                                                                <MapViewModal
                                                                                     latitude={parcel?.deliveryAddressLatitude} //parcel?.deliveryAddressLatitude||
                                                                                     longitude={parcel?.deliveryAddressLongitude} //parcel?.deliveryAddressLongitude ||
                                                                                     closeModal={() => handleCloseMapModal(parcel._id)} // Pass parcel ID
                                                                                />
                                                                           )}
                                                                      </div>
     
                                                                      {
                                                                           parcel?.status === 'Canceled' || parcel?.status === 'Delivered' ? <div className='flex flex-col gap-2'>
                                                                                <button disabled
     
                                                                                     className="mr-2 px-3 py-1 bg-gray-200 rounded-md focus:outline-none"
                                                                                >
                                                                                     Cancel
                                                                                </button>
                                                                                <button disabled
     
                                                                                     className="px-3 py-1 bg-gray-200 rounded-md focus:outline-none "
                                                                                >
                                                                                     Deliver
                                                                                </button>
                                                                           </div> : <div className='flex flex-col gap-2'>
                                                                                <button
                                                                                     onClick={() => handleUpdate(parcel?._id, 'Canceled')}
                                                                                     className="mr-2 px-3 py-1 bg-red-500 text-white rounded-md focus:outline-none focus:bg-red-600"
                                                                                >
                                                                                     Cancel
                                                                                </button>
                                                                                <button
                                                                                     onClick={() => handleUpdate(parcel?._id, 'Delivered')}
                                                                                     className="px-3 py-1 bg-green-500 text-white rounded-md focus:outline-none focus:bg-green-600"
                                                                                >
                                                                                     Deliver
                                                                                </button>
                                                                           </div>
                                                                      }
                                                                 </td>
                                                            </tr>
     
                                                            )}
                                                  </tbody>
     
                                             </table>
                                        </div>
     

     
                                   </div>
                                   )
                              }


                              
                         </div>




               }
          </div>
     );
};

export default MyDeliveryList;
