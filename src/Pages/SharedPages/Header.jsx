
import { Link } from 'react-router-dom';

import useAuth from '../../Hooks/useAuth';
import { useState } from 'react';



const Header = () => {
  const { user, logout } = useAuth();
  const link = <>
    <Link to={'/'}>Home</Link>
 
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
  <Link className='hover:bg-gray-400 rounded-md px-1' to={'/myAddedFood'}>Deshboard</Link>
  <p onClick={handleLogOut} className="cursor-pointer hover:bg-gray-400 rounded-md px-1">Logout</p>
</>
  return (
    <div className="shadow-xl ">
      <div className="navbar max-w-7xl mx-auto">
        <div className="navbar-start">
          
          <img className='h-12 w-16' src="https://i.ibb.co/VDvtN8Z/Smart-Select-20231123-230405-Canva.jpg" alt="" />
          <h2 className='ml-0 md:2 text-xl sm:text-2xl md:text-4xl font-semibold text-red-900'>ParcelVerge</h2>
        </div>
        <div className="navbar-center flex">
          
        </div>
        <div className="navbar-end flex">
        <ul className="menu menu-horizontal px-1 gap-5 md:text-lg font-bold">
            {link}
          </ul>
          <div>
            {
              user ? <div className="flex gap-2 items-center">
                <div onClick={toggleDropdown} className="dropdown dropdown-bottom">
                  <label tabIndex={0} className=""><img className="rounded-full h-12 w-12 cursor-pointer" src={user?.photoURL} alt="" /></label>
                  {isDropdownOpen && (
                    <ul tabIndex={0} className="text-lg font-medium  dropdown-content z-[1] right-8 menu p-2 shadow bg-base-100 rounded-box w-52" onClick={closeDropdown}>
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