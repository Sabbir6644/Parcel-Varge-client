/* eslint-disable react/prop-types */

import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../../Hooks/useAdmin";

const AdminRoutte = ({children}) => {
     const location = useLocation();
     const { admin, adminLoading } = useAdmin();
     // console.log('user:', user);
     // console.log('location.pathname:', location.pathname);
     if (adminLoading) {
          return null;
     }
     
     return (
          <div>
               {admin ? (
                    children
               ) : (
                    <Navigate state={{ from: location.pathname }} replace to="/login" />
               )}
          </div>
     );
};

export default AdminRoutte;