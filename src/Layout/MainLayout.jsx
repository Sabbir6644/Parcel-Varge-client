import { Outlet } from "react-router-dom";
import Header from "../Pages/SharedPages/Header";
import Footer from "../Pages/SharedPages/Footer";


const MainLayout = () => {
     return (
          <div>
               <Header/>
               <div className="md:min-h-screen">
               <Outlet/>
               </div>
               <Footer/>
               
          </div>
     );
};

export default MainLayout;