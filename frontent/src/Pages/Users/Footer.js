import React from 'react'
import logoi from '../../assets/le venner.png'
import './Footer.css'


function Footer() {
  return (
    <div>
       <footer className="coloring  shadow dark:bg-gray-900 m-4">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a href="https://flowbite.com/" className="flex items-center mb-4 sm:mb-0">
            <img src={logoi} className="h-8 mr-3" alt="Flowbite Logo" />
            <span className="self-center  Letag text-2xl font-semibold whitespace-nowrap dark:text-white">Le venner</span>
            {/* <p className='ptag'>We provide</p> */}
          </a>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-black-400">
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6 ">About</a>
            </li>
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6">Privacy Policy</a>
            </li>
            <li>
              <a href="#" className="mr-4 hover:underline md:mr-6 ">Licensing</a>
            </li>
            <li>
              <a href="#" className="hover:underline">Contact</a>
            </li>
          </ul>
          


        </div>
          <p className='ptaging'>Le venner provides a focused approach <br/>rental items in the wedding planning segment.<br/>with years of experience in the custmes and<br/> desingining industry, we stand on a stronger <br/>basewith the most creative, enthusiasticand <br/>committed team. </p>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span style={{fontFamily:'initial'}} className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="https://flowbite.com/" className="hover:underline">Le Venner</a>. All Rights Reserved.</span>
      </div>
    </footer>
  






    </div>
  )
}

export default Footer
