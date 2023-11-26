import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import {  useRef, useState } from "react";
import { FcGoogle } from 'react-icons/fc';


import Swal from 'sweetalert2'
import useAuth from './../../Hooks/useAuth';
import useAxiosPublic from "../../Hooks/useAxiosPublic";







const Login = () => {
     const {success, userLogin, signInWithGoogle}=useAuth();
     const axiosPublic= useAxiosPublic();
     const navigate = useNavigate();
     const location = useLocation();
     const [alram, setAlram] = useState(null);
     const [show, setShow] = useState(false);
     const handleShow = () => {

          setShow(!show)
     }
     const isStrongPassword = (password) => {

          const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{6,}$/;
          return regex.test(password);
     };

     const emailRef = useRef(null);
     const passwordRef = useRef(null);
     const handleGoogle = () => {
          signInWithGoogle()

          .then((res) => {
               // console.log(res?.user);
               const userInfo = {
                    email: res?.user?.email,
                    name: res?.user?.displayName,
                    photoURL: res.user?.photoURL,
                    phoneNumber: res.user?.phoneNumber,
                    userType:"user"

               }
               console.log('res from login',res);
               axiosPublic.post('/regigter', userInfo)
               .then(response=>{
                    console.log(response.data);
               })
               Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Login Successfully!',
                    showConfirmButton: false,
                    timer: 1500
               })
               // console.log(location.state);
               // console.log(success);
             
                    navigate(location?.state?.from ? location.state.from : '/');
          }
          )



     }

     const handleSubmit = e => {
          e.preventDefault();
          const email = e.target.email.value;
          const password = e.target.password.value;

          if (!isStrongPassword(password)) {
               return Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Password must contain at least one capital letter one number and a special character.',
               })

          } else {
               userLogin(email, password)
                    .then(() => {
                         Swal.fire({
                              position: 'center',
                              icon: 'success',
                              title: 'Login Successful!',
                              showConfirmButton: false,
                              timer: 1500
                         })

                         if (success) {
                              navigate(location?.state?.from ? location.state.from : '/');
                         }


                         emailRef.current.value = '';
                         passwordRef.current.value = '';
                         setAlram('')
                    })
                    .catch((err) => {
                         setAlram(err.message);

                    })
          }


     }
     return (
          <div className="flex flex-col md:flex-row min-h-screen items-center max-w-5xl mx-auto">
              
               <div>
               <h2 className="text-center md:hidden text-5xl font-bold font-rancho text-blue-700 mb-9">Please login</h2>
                    <img src="https://i.ibb.co/rZDRDrF/loginImg.png" alt="" />
               </div>

               <div className=" w-11/12 md:w-[500px] mx-auto shadow-md p-5">
                    <div>

                         <div>
                              <h2 className="text-center text-5xl hidden md:block font-bold font-rancho text-blue-700 mb-9">Please login</h2>
                              <form onSubmit={handleSubmit}>
                                   <input ref={emailRef} className="border p-2 w-full" type="email" name="email" placeholder="Email..." required />

                                   <div className="relative">
                                        <input ref={passwordRef} className="border p-2 w-full my-4"
                                             type={show ? "text" : "password"}
                                             name="password"
                                             placeholder="Password..." required />
                                        <span className="absolute top-6 right-2"><button className="text-xl"
                                             onClick={(e) => {
                                                  e.preventDefault();
                                                  handleShow();
                                             }}>{show ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}</button></span>
                                   </div>
                                   <input className="border p-2 w-full bg-blue-500 hover:bg-blue-700  text-white" type="submit" value="Login" />
                              </form>
                              <div className="flex justify-between text-black">
                                   <p>If you have no account? Please <Link className="text-blue-800" to={'/registration'}>Registration</Link></p>
                              </div>
                         </div>
                    </div>
                    {
                         alram ? <p className="text-red-600">{alram}</p> : ''
                    }

                    <div className="mt-3">
                         <button onClick={handleGoogle} className="w-full py-2 border rounded-md text-lg text-black font-medium flex gap-1 items-center justify-center"> <span className="text-3xl"><FcGoogle /></span> Continue with Google</button>
                    </div>
               </div>

          </div>
     );
};

export default Login;