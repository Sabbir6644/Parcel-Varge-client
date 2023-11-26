import { NavLink } from "react-router-dom";


const DeliveryMenNav = () => {
     return (
          <>
               <li><NavLink to={'/deshboard/myDeliveryList'}>My Delivery List</NavLink></li>
               <li><NavLink>My Reviews</NavLink></li>

          </>
     );
};

export default DeliveryMenNav;