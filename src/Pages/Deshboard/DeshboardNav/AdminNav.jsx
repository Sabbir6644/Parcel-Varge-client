import { NavLink } from "react-router-dom";


const AdminNav = () => {
     return (
          <>
               <li><NavLink to={'/deshboard/allParcel'}>All Parcels</NavLink></li>
               <li><NavLink to={'/deshboard/allUser'}> All Users</NavLink></li>
               <li><NavLink> All Delivery Men</NavLink></li>
               <li><NavLink to={'/deshboard/statistic'}>Statistics</NavLink></li>
               
              
               
          </>
     );
};

export default AdminNav;