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
    if (window.innerWidth <= 1150) {
      setOpen(false);
    }
  };

  return (
    <div className='md:flex items-center justify-between bg-white py-4 px-7 md:px-10'>
      <div onClick={toggleMenu} className='text-3xl cursor-pointer md:hidden'>
        <ion-icon name={open ? 'close' : 'menu'}></ion-icon>
      </div>

      <nav className='justify-between items-center w-[92%]'>
        <ul className={`flex items-center flex-gap-[4vw] md:pb-0 pb-12 absolute md:static bg-white left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? "top-20 opacity-100" : "top-[-490px]"} md:opacity-100 opacity-0`} onClick={closeMenuOnMobile}>
          {links.map((link) => (
            <li key={link.name} className='md:ml-8 text-xl md:my-7'>
              <a href={link.link} className='text-blue-800 hover:text-orange-400'>{link.name}</a>
            </li>
          ))}
          
          <div className='flex items-right gap-6 md:w-auto pl-9'>
            <Button>Upload your Prescription</Button>
            <Button>Sign in</Button>
          </div>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
