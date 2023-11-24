import { NavLink } from "react-router-dom";


const UserNav = () => {
     return (
          <>
               <li><NavLink to={'/deshboard/bookParcel'}>Book a Parcel</NavLink></li>
               <li><NavLink>My Parcels</NavLink></li>
               <li><NavLink>My Profile</NavLink></li>

          </>
     );
};

export default UserNav;