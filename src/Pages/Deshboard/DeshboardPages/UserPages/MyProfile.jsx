import { updateProfile } from "firebase/auth";
import useAuth from "../../../../Hooks/useAuth";
import { ImageUpload } from "../../../../Components/ImageUpload/ImageUpload";
import { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../../Components/Loading/Loading";



const MyProfile = () => {
     const { user } = useAuth();

     const axiosSecure = useAxiosSecure();

     const myInfo = async () => {
          const res = await axiosSecure.get(`/parcelBook/${user.email}`);
          return res;
     }
     const { data, isFetching, isLoading, refetch } = useQuery({
          queryKey: ['myInfo'],
          queryFn: myInfo,
     });
     const info = data?.data;
     // console.log(info);

     const [image, setImage] = useState()
     const [selectedImage, setSelectedImage] = useState(null);

     const handleImageUpload = (e) => {
          const file = e.target.files[0];
          const reader = new FileReader();
          reader.onloadend = () => {
               setSelectedImage(reader.result);
          };
          reader.readAsDataURL(file);
          imageUpload(file);
     };

     const imageUpload = async (photo) => {
          try {
               const uploadeImage = await ImageUpload(photo)
               const imageUrl = (uploadeImage?.data?.display_url);
               setImage({ profilePicture: imageUrl });
          } catch (error) {
               console.error('Image upload failed:', error);
          }
     };
     const handleUpdate = () => {

            updateProfile(user, {
               photoURL: image?.profilePicture,
          })
          .then(                            
               Swal.fire({
               position: 'center',
               icon: 'success',
               title: 'Profile has been updated!',
               showConfirmButton: false,
               timer: 1500
             })
             .then(refetch())
             )
            .catch((error) => {
              console.error('Error updating profile:', error);
            })
          }
        
        
        
     return (
          <div className="py-20">
               {
                    isFetching || isLoading?(
                         <Loading/>
                    ):(
                         <div className="mx-auto max-w-2xl p-8 bg-gray-100 rounded-lg shadow-lg">
                    <h1 className="text-2xl text-center font-semibold mb-4">My Profile</h1>

                    <div className="flex flex-col space-y-4">
                         <div className="flex items-center space-x-4">
                              <div className="w-20 h-20 rounded-full overflow-hidden">
                                   {selectedImage ? (
                                        <img src={selectedImage} alt="Profile" className="w-full h-full object-cover" />
                                   ) :

                                        <img
                                             src={user?.photoURL || '/default-profile-pic.jpg'} // Display default image if profile picture URL is empty
                                             alt="Profile"
                                             className="w-full h-full object-cover"
                                        />
                                   }
                              </div>
                              <label htmlFor="profile-pic-upload" className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer">
                                   Upload
                              </label>
                              <input
                                   type="file"
                                   id="profile-pic-upload"
                                   accept="image/*"
                                   className="hidden"
                                   onChange={handleImageUpload}
                              />
                         </div>

                         <div>
                              <p className="text-lg font-semibold">Name: {user?.displayName}</p>
                              <p className="text-lg font-semibold">Email: {user?.email}</p>
                              <p className="text-lg font-medium">Parcel Booking: {info?.length}</p>
                         </div>

                         <button
                         onClick={handleUpdate}
                              className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
                              
                         >
                              Update Profile
                         </button>
                    </div>
               </div>
                    )
               }



          </div>
     );
};

export default MyProfile;