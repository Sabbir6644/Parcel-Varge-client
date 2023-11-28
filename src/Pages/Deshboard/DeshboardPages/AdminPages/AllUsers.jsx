import { useState } from 'react';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../../Components/Loading/Loading';
// import useAuth from './../../../../Hooks/useAuth';
import Swal from 'sweetalert2';

const AllUsers = () => {

     const axiosSecure = useAxiosSecure();

     const allUser = async () => {
          const res = await axiosSecure.get('/aggregateDataByEmail');
          return res;
     }
     const { data, isFetching, isLoading, refetch } = useQuery({
          queryKey: ['allUser'],
          queryFn: allUser,
     });
     const users = data?.data;

     // console.log('All user', users);


     const [currentPage, setCurrentPage] = useState(1);
     const usersPerPage = 5;

     // Logic to calculate pagination
     const indexOfLastUser = currentPage * usersPerPage;
     const indexOfFirstUser = indexOfLastUser - usersPerPage;
     const currentUsers = users?.slice(indexOfFirstUser, indexOfLastUser);

     const paginate = (pageNumber) => setCurrentPage(pageNumber);

     const changeStatus = async (id, status) => {
          const type = status.toUpperCase();
          Swal.fire({
               title: "Are you sure?",
               text: `You want to make ${type}!`,
               icon: "warning",
               showCancelButton: true,
               confirmButtonColor: "#3085d6",
               cancelButtonColor: "#d33",
               confirmButtonText: "Yes, i want!"
          }).then(async (result) => {
               if (result.isConfirmed) {
                    const response = await axiosSecure.patch(`/updateParcelStatus/${id}`, {
                         status: status,
                    });
                    //    console.log(response?.data);
                    if (response?.data?.modifiedCount > 0) {
                         refetch();
                         Swal.fire({
                              title: "Updated!",
                              text: "Status Updated",
                              icon: "success",
                              showConfirmButton: false,
                              timer: 1500
                         });
                    }
               }
          })


     };



     return (
          <div>
               {
                    isFetching || isLoading ? (
                         <Loading />
                    ) : (
                         <div>
                              <h2 className="text-center text-3xl font-semibold my-5">All Users</h2>
                              <div className="overflow-auto max-h-[450px] rounded-md uppercase">
                              <table className="table-auto border-collapse border w-full border-gray-500">
                                   <thead className="bg-gray-200 text-base">
                                             <tr className='w-full'>
                                                  <th className="border border-gray-500 px-4 py-2">#</th>
                                                  <th className="border border-gray-500 px-4 py-2">Users Name</th>
                                                  <th className="border border-gray-500 px-4 py-2">Phone Number</th>
                                                  <th className="border border-gray-500 px-4 py-2">Parcels Booked</th>
                                                  <th className="border border-gray-500 px-4 py-2">Total Spent</th>
                                                  <th className="border border-gray-500 px-4 py-2 text-center">Action</th>
                                                  

                                                  
                                             </tr>
                                        </thead>
                                        <tbody>
                                             {currentUsers?.map((user,index) => (

                                                  <tr key={user?._id}>
                                                       <td className='border border-gray-500 px-4 py-2'>{index+1}</td>
                                                       <td className='border border-gray-500 px-4 py-2'>{user?.name}</td>
                                                       <td className='border border-gray-500 px-4 py-2'>{user?.parcels[0]?.phoneNumber ? user?.parcels[0]?.phoneNumber : user?.phoneNumber ? user?.phoneNumber : 'no number'}</td>
                                                       <td className='border text-center border-gray-500 px-4 py-2'>{user?.parcels?.length}</td>
                                                       <td className='border border-gray-500 px-4 py-2 text-center'>
                                                            {user?.parcels?.length > 0
                                                                 ? user?.parcels.reduce((acc, parcel) => acc + parcel.price, 0)
                                                                 : 0}
                                                       </td>
                                                       <td className='border border-gray-500 px-4 py-2 flex flex-col gap-2 '>
                                                            {
                                                                 user?.userType === 'deliveryMen' ? <button className='btn' disabled="disabled">Make Delivery Men</button> :
                                                                      <button className='btn' onClick={() => changeStatus(user._id, 'deliveryMen')}>Make Delivery Men</button>
                                                            }
                                                            {
                                                                 user?.userType === 'admin' ? <button className='btn' disabled="disabled">Make Admin</button> :
                                                                      <button className='btn' onClick={() => changeStatus(user._id, 'admin')}>Make Admin</button>
                                                            }

                                                       </td>
                                                  </tr>
                                             ))}
                                        </tbody>
                                   </table>
                              </div>

                              {/* Pagination */}
                              <div className='flex justify-center gap-1 my-5'>
                                   <button
                                        onClick={() => paginate(currentPage - 1)}
                                        disabled={currentPage === 1}
                                        className={`py-2 px-4 rounded-lg ${currentPage === 1 ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : 'bg-blue-600 text-white'}`}
                                   >
                                        Previous
                                   </button>

                                   {Array.from({ length: Math.ceil(users?.length / usersPerPage) }).map((_, index) => (
                                        <button
                                             key={index}
                                             onClick={() => paginate(index + 1)}
                                             className={`py-2 px-4 rounded-lg ${currentPage === index + 1 ? 'bg-blue-300 text-white' : 'bg-white text-black'}`}
                                        >
                                             {index + 1}
                                        </button>
                                   ))}

                                   <button
                                        onClick={() => paginate(currentPage + 1)}
                                        disabled={currentPage === Math.ceil(users?.length / usersPerPage)}
                                        className={`py-2 px-4 rounded-lg ${currentPage === Math.ceil(users?.length / usersPerPage) ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : 'bg-blue-600 text-white'}`}
                                   >
                                        Next
                                   </button>
                              </div>



                         </div>
                    )
               }
          </div>
     );
};

export default AllUsers;
