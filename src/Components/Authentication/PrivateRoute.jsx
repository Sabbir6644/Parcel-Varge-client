/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";



const PrivateRoute = ({ children }) => {
     const location = useLocation();
     const { user, loading } = useAuth();
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
                    <Navigate state={{ from: location.pathname }} replace to="/login" />
               )}
          </div>
     );
};

export default PrivateRoute;






