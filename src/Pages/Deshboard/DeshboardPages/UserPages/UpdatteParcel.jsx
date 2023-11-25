
import { useParams } from 'react-router-dom';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../../Components/Loading/Loading';
import Swal from 'sweetalert2';
import { useState } from 'react';

const UpdatteParcel = () => {
     const { id } = useParams();
     const axiosSecure = useAxiosSecure();
     const parcel = async () => {
          const res = await axiosSecure.get(`/parcel/${id}`);
          return res;
     }
     const { data, isFetching, isLoading } = useQuery({
          queryKey: ['parcel'],
          queryFn: parcel,
     });
     const myParcel = data?.data;
     // console.log("from params", myParcel);

     // update 
     const today = new Date().toISOString().split('T')[0];
     const [formData, setFormData] = useState({
          name: myParcel?.name,
          email: myParcel?.email,
          phoneNumber: myParcel?.phoneNumber,
          parcelType: myParcel?.parcelType,
          parcelWeight: myParcel?.parcelWeight,
          receiverName: myParcel?.receiverName,
          receiverPhoneNumber: myParcel?.receiverPhoneNumber,
          parcelDeliveryAddress: myParcel?.parcelDeliveryAddress,
          requestedDeliveryDate: myParcel?.requestedDeliveryDate,
          deliveryAddressLatitude: myParcel?.deliveryAddressLatitude,
          deliveryAddressLongitude: myParcel?.deliveryAddressLongitude,
          price: myParcel?.price,
          bookingDate: myParcel?.bookingDate,
          status: myParcel?.status,
     });
     // console.log(formData);
     const calculatePrice = (weight) => {
          if (weight === 1) return 50;
          if (weight === 2) return 100;
          return 150;
     };

     const handleChange = (e) => {
          const { name, value } = e.target;
          setFormData({ ...formData, [name]: value });

          if (name === 'parcelWeight') {
               const weight = parseInt(value, 10); // Convert value to an integer
               const price = calculatePrice(weight);
               setFormData((prevFormData) => ({
                    ...prevFormData,
                    [name]: weight, // Update the parcelWeight value
                    price: price, // Update the calculated price
               }));
          } else {
               setFormData((prevFormData) => ({
                    ...prevFormData,
                    [name]: value, // Update other form fields
               }));
          }

     };

     const handleSubmit = async (e) => {
          e.preventDefault();
          const response = await axiosSecure.put(`/updateParcel/${id}`, formData)
          // console.log(response);
          // console.log('Form Data:', formData);
          if (response?.data?.modifiedCount>0) {
               Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Booking updated Successful!',
                    showConfirmButton: false,
                    timer: 1500
               })
          }
     };


     return (
          <div>
               {
                    isFetching || isLoading ? <Loading /> : (
                         <div>

                              <div className="w-full mx-auto p-6 bg-gray-100 rounded-md shadow-md">
                                   <h2 className="text-center text-3xl font-semibold my-5">Update Parcel</h2>
                                   <form onSubmit={handleSubmit}>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                             {/* Name */}
                                             <div className="flex flex-col md:col-span-1">
                                                  <label htmlFor="name" className="block font-medium mb-1">
                                                       Name
                                                  </label>
                                                  <input
                                                       type="text"
                                                       id="name"
                                                       name="name"
                                                       defaultValue={myParcel?.name}
                                                     
                                                       onChange={handleChange}
                                                       className="w-full border rounded-md px-3 py-2"
                                                       readOnly
                                                  />
                                             </div>

                                             {/* email */}
                                             <div className="flex flex-col md:col-span-1">
                                                  <label htmlFor="email" className="block font-medium mb-1">
                                                       Email
                                                  </label>
                                                  <input
                                                       type="email"
                                                       id="email"
                                                       name="email"
                                                       
                                                       defaultValue={myParcel?.email}
                                                       onChange={handleChange}
                                                       className="w-full border rounded-md px-3 py-2"
                                                       readOnly
                                                  />
                                             </div>
                                             {/* number */}
                                             <div className="flex flex-col md:col-span-1">
                                                  <label htmlFor="phoneNumber" className="block font-medium mb-1">
                                                       Phone Number
                                                  </label>
                                                  <input
                                                       type="tel"
                                                       id="phoneNumber"
                                                       name="phoneNumber"
                                                       defaultValue={myParcel?.phoneNumber}
                                                       onChange={handleChange}
                                                       className="w-full border rounded-md px-3 py-2"
                                                       required
                                                  />
                                             </div>
                                             {/* parcel type */}
                                             <div className="flex flex-col md:col-span-1">
                                                  <label htmlFor="parcelType" className="block font-medium mb-1">
                                                       Parcel Type
                                                  </label>
                                                  <input
                                                       type="text"
                                                       id="Parcel Type"
                                                       name="parcelType"
                                                       // value={formData.parcelType}
                                                       defaultValue={myParcel?.parcelType}
                                                       onChange={handleChange}
                                                       className="w-full border rounded-md px-3 py-2"
                                                       required
                                                  />
                                             </div>
                                             {/* Parcel Weight */}
                                             <div className="flex flex-col md:col-span-1">
                                                  <label htmlFor="parcelWeight" className="block font-medium mb-1">
                                                       Parcel Weight
                                                  </label>
                                                  <input
                                                       type="number"
                                                       id="parcelWeight"
                                                       name="parcelWeight"
                                                       defaultValue={myParcel?.parcelWeight}
                                                       onChange={handleChange}
                                                       min={1}
                                                       className="w-full border rounded-md px-3 py-2"
                                                       required
                                                  />
                                             </div>

                                             {/* Receiver’s Name */}
                                             <div className="flex flex-col md:col-span-1">
                                                  <label htmlFor="receiverName" className="block font-medium mb-1">
                                                       Receiver’s Name
                                                  </label>
                                                  <input
                                                       type="text"
                                                       id="receiverName"
                                                       name="receiverName"
                                                       defaultValue={myParcel?.receiverName}
                                                       onChange={handleChange}
                                                       className="w-full border rounded-md px-3 py-2"
                                                       required
                                                  />
                                             </div>
                                             {/* Receiver's number */}
                                             <div className="flex flex-col md:col-span-1">
                                                  <label htmlFor="receiverPhoneNumber" className="block font-medium mb-1">
                                                       Receiver Phone Number
                                                  </label>
                                                  <input
                                                       type="tel"
                                                       id="phoneNumber"
                                                       name="receiverPhoneNumber"
                                                       defaultValue={myParcel?.receiverPhoneNumber}
                                                       onChange={handleChange}
                                                       className="w-full border rounded-md px-3 py-2"
                                                       required
                                                  />
                                             </div>
                                             {/* Parcel Delivery Address */}
                                             <div className="flex flex-col md:col-span-1">
                                                  <label htmlFor="parcelDeliveryAddress" className="block font-medium mb-1">
                                                       Parcel Delivery Address
                                                  </label>
                                                  <input
                                                       type="text"
                                                       id="parcelDeliveryAddress"
                                                       name="parcelDeliveryAddress"
                                                       defaultValue={myParcel?.parcelDeliveryAddress}
                                                       onChange={handleChange}
                                                       className="w-full border rounded-md px-3 py-2"
                                                       required
                                                  />
                                             </div>
                                             {/* Requested Delivery Date(Date Input) */}
                                             <div className="flex flex-col md:col-span-1">
                                                  <label htmlFor="parcelDeliveryAddress" className="block font-medium mb-1">
                                                       Requested Delivery Date
                                                  </label>
                                                  <input
                                                       type="date"
                                                       id="requestedDeliveryDate"
                                                       name="requestedDeliveryDate"
                                                       defaultValue={myParcel?.requestedDeliveryDate}
                                                       onChange={handleChange}
                                                       min={today}

                                                       className="w-full border rounded-md px-3 py-2"
                                                       required
                                                  />
                                             </div>
                                             {/* Delivery Address Latitude */}
                                             <div className="flex flex-col md:col-span-1">
                                                  <label htmlFor="deliveryAddressLatitude" className="block font-medium mb-1">
                                                       Delivery Address Latitude
                                                  </label>
                                                  <input
                                                       type="text"
                                                       id="deliveryAddressLatitude"
                                                       name="deliveryAddressLatitude"
                                                       defaultValue={myParcel?.deliveryAddressLatitude}
                                                       onChange={handleChange}
                                                       className="w-full border rounded-md px-3 py-2"
                                                       required
                                                  />
                                             </div>
                                             {/* Delivery Address Longitude */}
                                             <div className="flex flex-col md:col-span-1">
                                                  <label htmlFor="deliveryAddressLongitude" className="block font-medium mb-1">
                                                       Delivery Address Longitude
                                                  </label>
                                                  <input
                                                       type="text"
                                                       id="deliveryAddressLongitude"
                                                       name="deliveryAddressLongitude"
                                                       defaultValue={myParcel?.deliveryAddressLongitude}
                                                       onChange={handleChange}
                                                       className="w-full border rounded-md px-3 py-2"
                                                       required
                                                  />
                                             </div>
                                             {/* Price */}
                                             <div className="flex flex-col md:col-span-1">
                                                  <label htmlFor="price" className="block font-medium mb-1">
                                                       Price (Tk)
                                                  </label>
                                                  <input
                                                       type="text"
                                                       id="price"
                                                       name="price"
                                                       value={formData.price ? formData.price : myParcel?.price}
                                                       readOnly
                                                       className="w-full border rounded-md px-3 py-2"
                                                  />
                                             </div>
                                        </div>
                                        {/* Repeat similar structure for other fields */}
                                        <div className="my-4">
                                             <label htmlFor="book" className="sr-only"></label>
                                             <button
                                                  type="submit"
                                                  className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition duration-300"
                                             >
                                                  Update
                                             </button>
                                        </div>
                                   </form>
                              </div>


















                         </div>
                    )
               }

          </div>
     );
};

export default UpdatteParcel;