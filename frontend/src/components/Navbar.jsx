import React from 'react';
import Button from './Button';

const Navbar = () => {
  let Link = [
    { name: "Home", link: "/" },
    { name: "Shop", link: "/" },
    { name: "About Us", link: "/" },
    { name: "Contact", link: "/" },
  ];

  return (
<<<<<<< HEAD
    <div className='md:flex items-center justify-between bg-white py-4 px-7 md:px-10'>
      <div className='text-3xl cursor-pointer md:hidden'>
        <ion-icon name="menu"></ion-icon>
      </div>

      <ul className='md:flex md:items-center md:p-0 pd-12 absolute md:static bg-white md:z-auto z-[1] left-1 w-full md:W-auto md:pl-1 pl-4 transition-all duration-500 ease-in'>
        {Link.map((link) => (
          <li key={link.name} className='ml-8'>
            <a href={link.link} className='text-blue-800 hover:text-orange-400'>{link.name}</a>
          </li>
        ))}
      </ul>

      <div className="md:ml-8 absolute md:static bg-white margine top:50px md:z-auto z-[-1] left-0 w-full md:W-auto md:pl-0 pl-9 transition-all duration-500 ease-in">
        <Button>Upload your Prescription</Button>
      </div>
    </div>
  );
=======
    <div>
        <div className=''>
            <ul>
                <li>Home</li>
                <li>Shop</li>
                <li>About Us</li>
                <li>Contacts</li>
            </ul>
        </div>
        <div>
            <div>Upload Prescription</div>
        </div>
    </div>
  )
>>>>>>> 56a1e0344b8a881f678a8842a4009b4dc7f5e898
}

export default Navbar;
