import { NavLink } from "react-router-dom";


const UserNav = () => {
     return (
          <>
               <li><NavLink to={'/deshboard/bookParcel'}>Book a Parcel</NavLink></li>
               <li><NavLink to={'/deshboard/myParcel'}>My Parcels</NavLink></li>
               <li><NavLink to={'/deshboard/myProfile'}>My Profile</NavLink></li>
               <li><NavLink to={'/'}><button className="md:hidden">Home</button></NavLink></li>

          </>
     );
};

export default UserNav;