import { Link } from "react-router-dom";
import AdminNav from "./AdminNav";
import UserNav from './UserNav';
import useAdmin from "../../../Hooks/useAdmin";
import useDeliveryMan from "../../../Hooks/useDeliveryMan";
import DeliveryMenNav from "./DeliveryMenNav";
import Loading from "../../../Components/Loading/Loading";




const DeshboardNav = () => {
  const { admin, adminLoading } = useAdmin();
  const { deliveryMen, deliveryMenLoading }= useDeliveryMan();
  return (
    <div>
      <div className="navbar bg-blue-500 px-4 text-white">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost md:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </label>
            <ul tabIndex={0} className="text-black dropdown-content mt-3 z-[1] p-2 shadow bg-primary-Color rounded-box w-52">
              {
                adminLoading || deliveryMenLoading ? (
                  <Loading/>
                ) : admin ? (
                  <AdminNav />
                ): deliveryMen?(
                  <DeliveryMenNav/>
                ) : (
                  <UserNav />
                )
              }

            </ul>
          </div>
          <img className='h-12 w-16' src="https://i.ibb.co/Xj7HDtz/logo.png" alt="" />
          <h2 className='ml-0 md:2 text-xl sm:text-2xl md:text-4xl font-semibold'>ParcelVerge</h2>
        </div>

        <div className="navbar-end">
          <Link to={'/'}><button className="btn">Home</button></Link>
        </div>
      </div>
    </div>
  );
};

export default DeshboardNav;