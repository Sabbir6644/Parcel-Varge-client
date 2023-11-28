import { NavLink } from "react-router-dom";


const DeliveryMenNav = () => {
     return (
          <>
               <li><NavLink to={'/deshboard/myDeliveryList'}>My Delivery List</NavLink></li>
               <li><NavLink to={'/deshboard/myReviews'}>My Reviews</NavLink></li>
               <li><NavLink to={'/'}><button className="md:hidden">Home</button></NavLink></li>
          </>
     );
};

export default DeliveryMenNav;