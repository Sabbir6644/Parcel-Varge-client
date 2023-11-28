/* eslint-disable react/prop-types */
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from './../../../public/firebase.config';
import useAxiosPublic from "../../Hooks/useAxiosPublic";




export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
     const [success, setSuccess]= useState(false);
     const [loading, setLoading] = useState(true);
     const [user, setUser] = useState();
     const axiosPublic = useAxiosPublic();


     // google login
     const googleProvider = new GoogleAuthProvider();
     const signInWithGoogle = () => {
          setLoading(true)
          return signInWithPopup(auth, googleProvider)
          
     }
     // Login with email and pass
     const userLogin = (email, password) => {
          return signInWithEmailAndPassword(auth, email, password)
     }
     // sign up with email
     const createUser = (email, password) => {
          return createUserWithEmailAndPassword(auth, email, password)
     }
     // logout
     const logout = () => {
          setLoading(true)
          return signOut(auth)

     }
     // Auth state change
     useEffect(() => {
          const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
               setUser(currentUser);
               // 
               const userEmail = currentUser?.email || user?.email;
               const loggedUser = { email:userEmail }
               if (currentUser?.email) {
                    axiosPublic.post('/jwt', loggedUser, {withCredentials:true})
                 .then(res =>{
                   setSuccess(res.data.success);
                   setLoading(false)
                 })
               }else{
                    axiosPublic.post('/logout', loggedUser, {withCredentials:true})
                    .then(res =>{
                      console.log(res.data);
                      setLoading(false)
                    })
                  }
               // 
               
               
          });
          return () => {
               unSubscribe()
          }
     }, [axiosPublic,user?.email])

     const authInfo = {
          user, success, signInWithGoogle, 
          logout, loading, setLoading, createUser, userLogin,
          
     }

     return (
         
               <AuthContext.Provider value={authInfo}>
                    {children}
                  
               </AuthContext.Provider>
         
     );
};

export default AuthProvider;


     


