/* eslint-disable react/prop-types */
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "./AuthProvider";


const PrivateRoute = ({ children }) => {
     const location = useLocation();
     const { user, loading } = useContext(AuthContext);
     // console.log('user:', user);
     // console.log('location.pathname:', location.pathname);
     if (loading) {
          return null;
     }
     
     return (
          <div>
               {user ? (
                    children
               ) : (
                    <Navigate state={{ from: location.pathname }} to="/login" />
               )}
          </div>
     );
};

export default PrivateRoute;






