import { useContext, useRef, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { Link, useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth";
// import { AuthContext } from "./AuthProvider";
import Swal from "sweetalert2";
import { AuthContext } from "./AuthProvider";
import { ImageUpload } from './../ImageUpload/ImageUpload';
import useAxiosPublic from "../../Hooks/useAxiosPublic";






const Registration = () => {
     const { createUser } = useContext(AuthContext);
     const axiosPublic= useAxiosPublic();
     const navigate = useNavigate();
     // console.log(createUser);
     const [alram, setAlram] = useState(null);
     const [show, setShow] = useState(false);
     const handleShow = () => {
          setShow(!show)
     }
     const nameRef = useRef(null);
     const emailRef = useRef(null);
     const imageRef = useRef(null);
     const passwordRef = useRef(null);

     const isStrongPassword = (password) => {
          // Regex pattern for at least one capital letter and one number
          const regex = /^(?=.*[A-Z])(?=.*\d)/;
          return regex.test(password);
     };

     const handleSubmit = e => {
          e.preventDefault();
          const name = e.target.name.value;
          const email = e.target.email.value;
          const image = e.target.image.files[0];
          const password = e.target.password.value;
          const accept = e.target.terms.checked;
          const userType = e.target.userType.value;
          // const user = { name, email, image, password, userType };
          
          // console.log(accept, name, email, password);
          if (!accept) {
               return setAlram('Please accept our terms & condition ')
          } else if (password.length < 6) {
               return setAlram('pass must more then 6 ')
          } else if (!isStrongPassword(password)) {
               return setAlram('Password must contain at least one capital letter and one number.');
          } else {
// console.log(user);
               createUser(email, password)
                    .then(async(result) => {
                         setAlram('');
                         const imageData = await  ImageUpload(image)
                         const imageUrl= (imageData?.data?.display_url);
                         const userInfo = { name, email, imageUrl, userType };
                         axiosPublic.post('/register', userInfo)
                         .then(response=>{
                              console.log(response.data);
                         })
                   updateProfile(result.user, {
                        displayName: name,
                        photoURL: imageUrl,
                   }).then(                            
                        Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Registration Successful!',
                        showConfirmButton: false,
                        timer: 1500
                      }) 
                      
                      ).then(
                        navigate(location?.state?.from ? location.state.from : '/')
                      )                            
                        .catch(error => console.error(error))
               // 
                    .catch(() => {
                         setAlram('Already you have an account please try to login')
                    })
               nameRef.current.value = '';
               emailRef.current.value = '';
               passwordRef.current.value = '';
          }
                    )

     }
     }
     return (
          <div className="flex flex-col md:flex-row mx-auto min-h-screen max-w-4xl items-center">

               <div>
                    <h2 className="text-center block md:hidden text-5xl font-bold text-blue-700 mb-9">Please Registration </h2>
                    <img className="hidden md:block" src="https://i.ibb.co/9p3BtNr/registration.png" alt="" />
               </div>
               <div className=" w-11/12 md:w-[500px] mx-auto shadow-md p-5">
                    <div>
                         <h2 className="text-center hidden md:block text-5xl font-bold text-blue-700 mb-9">Please Registration </h2>
                         <form onSubmit={handleSubmit}>
                              <div className="flex flex-col md:col-span-1">
                                   <label htmlFor="name" className="block font-medium mb-1">
                                        Name
                                   </label>
                                   <input
                                        type="text"
                                        name="name"
                                        ref={nameRef} className="border p-2 w-full mb-4"
                                        placeholder="Name..." required
                                   />
                              </div>
                              <div className="flex flex-col md:col-span-1">
                                   <label htmlFor="email" className="block font-medium mb-1">
                                        Email
                                   </label>
                                   <input
                                        type="email"
                                        name="email"
                                        ref={emailRef} className="border p-2 w-full mb-4"
                                        placeholder="youremail@mail.com" required
                                   />
                              </div>
                              <div className="flex flex-col md:col-span-1">
                                   <label htmlFor="userType" className="block font-medium mb-1">
                                        User Type
                                   </label>
                                   <select
                                   required
                                   className="border p-2 w-full mb-4" placeholder="Select" name="userType">
                                   <option value="user">User</option>
                                   <option value="deliveryMen">Delivery Men</option>
                              </select>
                              </div>

                              <div className="flex flex-col md:col-span-1">
                                   <label htmlFor="email" className="block font-medium mb-1">
                                        Your Photo
                                   </label>
                                   <input
                                   
                                        type="file"
                                        name="image"
                                        ref={imageRef} className="border p-2 w-full mb-4"
                                        required
                                   />
                              </div>


                              <div className="relative flex flex-col md:col-span-1">
                              <label htmlFor="email" className="block font-medium mb-1">
                                        Password
                                   </label>
                                   <input ref={passwordRef} className="border p-2 w-full mb-4"
                                        type={show ? "text" : "password"}
                                        name="password"
                                        placeholder="Password..." required />
                                   <span className="absolute top-10 right-2"><button className="text-xl"
                                        onClick={(e) => {
                                             e.preventDefault();
                                             handleShow();
                                        }}>{show ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}</button></span>
                              </div>
                              <div className="mb-2 text-black">
                                   <input type="checkbox" name="terms" id="terms" /><label className="ml-2" htmlFor="terms">Accept our terms & condition.</label>
                              </div>
                              <input className="border p-2 w-full text-white bg-blue-500 hover:bg-blue-700" type="submit" value="Register" />
                         </form>
                         <p className="text-black">Have an account? Please <Link className="text-blue-800" to={'/login'}>Login</Link></p>
                    </div>
                    <div>
                         {
                              alram ? <p className="text-red-600">{alram}</p> : ''
                         }
                    </div>
               </div>
          </div>
     );
};

export default Registration;