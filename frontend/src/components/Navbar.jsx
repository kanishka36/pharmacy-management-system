import React, { useState } from 'react';
import Button from './Button';

const Navbar = () => {
  const links = [ 
    { name: "Home", link: "/" },
    { name: "Shop", link: "/" },
    { name: "About Us", link: "/" },
    { name: "Contact", link: "/" },
  ];

  const [open, setOpen] = useState(false);

  const toggleMenu = () => {
    setOpen(!open);
  };

  const closeMenuOnMobile = () => {
    if (window.innerWidth <= 150) {
      setOpen(false);
    }
  };

  return (
    <div className='md:flex items-center justify-between bg-white py-4 px-7 md:px-5'>
      <div onClick={toggleMenu} className='text-3xl cursor-pointer md:hidden'>
        <ion-icon name={open ? 'close' : 'menu'}></ion-icon>
      </div>

      <nav className={`w-full md:w-auto md:pl-0 pl-9 "px-15 py-15" ${open ? 'block' : 'hidden'} md:block`}>
        <ul className={`flex flex-col md:flex-row gap-10 items-center justify-center  md:pb-0 pb-12 bg-white absolute md:static w-full left-0 transition-all duration-500 ease-in ${open ? "top-20 opacity-100" : "top-[-490px]"} md:opacity-100 opacity-0`} onClick={closeMenuOnMobile}>
          {links.map((link) => (
            <li key={link.name} className='md:ml-8 text-xl md:my-7'>
              <a href={link.link} className='text-blue-800 hover:text-orange-400'>{link.name}</a>
            </li>
          ))}
        
        <div className="flex flex-col gap-5  md:flex-row items-center justify-center ">
          <div className='  text-xl md:my-5'>
            <Button>Upload your Prescription</Button>
          </div>
          <div className=' text-xl md:my-7'>
            <Button>Sign in</Button>
          </div>
        </div>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;

