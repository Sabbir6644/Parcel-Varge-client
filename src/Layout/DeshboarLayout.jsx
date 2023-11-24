import { Outlet } from "react-router-dom";

// import useAdmin from "../../../SharedComponents/Hooks/useAdmin";
import DeshboardNav from './../Pages/Deshboard/DeshboardNav/DeshboardNav';
// import AdminNav from './../Pages/Deshboard/DeshboardNav/AdminNav';
import UserNav from './../Pages/Deshboard/DeshboardNav/UserNav';


const DeshboarLayout = () => {
     // const {admin, adminLoading} = useAdmin();
     return (
          <div className="max-w-7xl mx-auto">
               <div>
                    <DeshboardNav />
               </div>
               <div className="flex">

                    <div className="w-1/4 pl-5 py-5 bg-blue-100 shadow-lg md:block hidden">
                         <ul className="text-lg font-medium">
                              {/* <AdminNav/> */}
                              <UserNav/>
                              {/* {
                                   adminLoading ? (
                                        <p>Loading</p>
                                   ) : admin ? (
                                        <AdminNav />
                                   ) : (
                                        <UserNav />
                                   )
                              } */}


                         </ul>
                    </div>
                    <div className="md:w-3/4 w-full min-h-screen px-2">
                         <Outlet />
                    </div>

               </div>

          </div>
     );
};

export default DeshboarLayout;