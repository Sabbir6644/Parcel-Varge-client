import { Outlet } from "react-router-dom";
import Header from "../Pages/SharedPages/Header";
import Footer from "../Pages/SharedPages/Footer";


const MainLayout = () => {
     return (
          <div>
               <Header/>
               <Outlet/>
               <Footer/>
               
          </div>
     );
};

export default MainLayout;