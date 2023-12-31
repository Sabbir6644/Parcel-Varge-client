
import { Link } from 'react-router-dom';

import useAuth from '../../Hooks/useAuth';
import { useState } from 'react';
import { IoNotifications } from "react-icons/io5";



const Header = () => {
  const { user, logout } = useAuth();
  const link = <>
    <Link to={'/'}>Home</Link>
    <Link to={'/deshboard'}>Deshboard</Link>
    <Link><IoNotifications /></Link>
 
  </>

 
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };


  const handleLogOut = () => {
    logout()
  }
  const profile = <>
  <p>{user?.displayName}</p>
  <Link className='hover:bg-gray-400 rounded-md px-1' to={'/deshboard'}>Deshboard</Link>
  <p onClick={handleLogOut} className="cursor-pointer hover:bg-gray-400 rounded-md px-1">Logout</p>
</>
  return (
    <div className="shadow-xl text-white bg-blue-500">
      <div className="navbar max-w-7xl mx-auto">
        <div className="navbar-start">
        <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost md:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </label>
            <ul tabIndex={0} className="menu menu-sm text-black dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              {link}
            </ul>
          </div>
          
          <img className='h-12 w-16' src="https://i.ibb.co/Xj7HDtz/logo.png" alt="" />
          <h2 className='ml-0 md:2 text-xl sm:text-2xl md:text-4xl font-semibold'>ParcelVerge</h2>
        </div>
        <div className="navbar-center flex">
          
        </div>
        <div className="navbar-end flex">
        <ul className="hidden menu menu-horizontal md:flex items-center px-1 gap-2 md:text-xl font-bold">
            {link}
          </ul>
          <div>
            {
              user ? <div className="flex gap-2 items-center">
                <div onClick={toggleDropdown} className="dropdown dropdown-bottom">
                  <label tabIndex={0} className=""><img className="rounded-full h-12 w-12 cursor-pointer" src={user?.photoURL} alt="" /></label>
                  {isDropdownOpen && (
                    <ul tabIndex={0} className="text-md font-medium text-black  dropdown-content z-[1] right-8 menu p-2 shadow bg-base-100 rounded-box w-52" onClick={closeDropdown}>
                      {profile}
                    </ul>
                  )}
                </div>
              </div> :
                <Link to={'/login'}><button className="bg-gray-300 px-2 py-1 rounded-md font-medium">Login</button></Link>
            }
          </div>



        </div>
      </div>
    </div>
  );
};

export default Header;