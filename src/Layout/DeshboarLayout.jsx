import { Outlet, useLocation } from "react-router-dom";

import DeshboardNav from './../Pages/Deshboard/DeshboardNav/DeshboardNav';
// import AdminNav from './../Pages/Deshboard/DeshboardNav/AdminNav';
import UserNav from './../Pages/Deshboard/DeshboardNav/UserNav';
import useAdmin from "../Hooks/useAdmin";
import AdminNav from "../Pages/Deshboard/DeshboardNav/AdminNav";
import useDeliveryMan from "../Hooks/useDeliveryMan";
import DeliveryMenNav from "../Pages/Deshboard/DeshboardNav/DeliveryMenNav";
import Loading from "../Components/Loading/Loading";
import WebStatistics from "../Pages/Deshboard/DeshboardPages/AdminPages/WebStatistics";


const DeshboarLayout = () => {
     const { admin, adminLoading } = useAdmin();
     const { deliveryMen, deliveryMenLoading } = useDeliveryMan();
     const location = useLocation();
     // console.log(location);
     return (
          <div className="max-w-7xl mx-auto">
               <div>
                    <DeshboardNav />
               </div>
               <div className="flex">

                    <div className="w-1/4 pl-5 py-5 bg-blue-100 shadow-lg md:block hidden">
                         <ul className="text-lg font-medium">
                              
                              {
                                   adminLoading || deliveryMenLoading ? (
                                        <Loading/>
                                   ) : admin ? (
                                        <AdminNav />
                                   ) : deliveryMen ? (
                                        <DeliveryMenNav />
                                   ) : (
                                        <UserNav />
                                   )
                              }


                         </ul>
                    </div>
                    <div className="md:w-3/4 w-full min-h-screen px-2">
                              {
                                   admin && location.pathname==='/deshboard'?<WebStatistics/>:<Outlet />
                              }
                         
                    </div>

               </div>

          </div>
     );
};

export default DeshboarLayout;