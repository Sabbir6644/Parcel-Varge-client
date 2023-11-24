import { NavLink } from "react-router-dom";


const AdminNav = () => {
     return (
          <>
               <li><NavLink>All Parcels</NavLink></li>
               <li><NavLink> All Users</NavLink></li>
               <li><NavLink> All Delivery Men</NavLink></li>
               <li><NavLink>Statistics</NavLink></li>
               
              
               
          </>
     );
};

export default AdminNav;