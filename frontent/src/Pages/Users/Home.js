import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import './Home.css';
import image1 from '../../assets/Bride1.jpg';
import image2 from '../../assets/Groom3.jpg';

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div>
      <div className="col-sm-12 col-md-12 col-lg-12">
        <div>
          <Header />
        </div>
        <div className="banner1"></div>

        <header className="text-center m-8">
          <h1 className="mb-4 cata text-3xl mr-16 cat md:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white">
           
            Catagory
          </h1>
          <p className="ptaging10 border-b-2 md:ml-0">
            Browse through our dreamy catalog and enrobe your wishes.
          </p>
        </header>

        <div style={{height:"480px"}} className="flex flex-col md:flex-row items-center rounded group hover:bg-gray-100 transition duration-300 ease-in-out">
          <figure className="max-w-lg">
            <img
              className="h-auto max-w-full image1 rounded-lg m-5 p-5 hover:scale-110 hover:opacity-80"
              src={image1}
              alt="image description"
            />
          </figure>
          <div className="ml-5 bg-ef9595">
            <h1 className="Bridetag1 bg-sky-500 text-6xl font-serif text-center mt-8">
              Bride Collections
            </h1>
            <h2 className="text-2xl texter5 font-custom font-bold text-yellow-900 leading-tight">
              <span className="block block1">The perfect dress is the one that</span>
              <span className="block block1">makes a bride feel like the most</span>
              <span className="block block1">beautiful version of herself.</span>
            </h2>
          </div>
          <Link
            to="/outfit"
            style={{ marginLeft: "10px", marginTop: "155px" }}
            className="button_correcting1 relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
          >
            <span className="relative span1 px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Show Collections
            </span>
          </Link>
        </div>

        <div style={{height:'500px'}} className="flex flex-col md:flex-row items-center rounded group hover:bg-gray-100 transition duration-300 ease-in-out mt-8">
          <figure className="max-w-lg">
            <img
              className="h-auto max-w-full image2 texter5 text-yellow-900 leading-tight"
              src={image2}
              alt="image description"
            />
          </figure>
          <div className="ml-5 bg-ef9595">
            <h1 className="Bridetag2 bg-sky-500 text-6xl font-serif text-center mt-8">
              Groom Collections
            </h1>
            <h2 className="text-2xl texter6 font-custom font-bold text-yellow-900 leading-tight">
              <span className="block block2 block3">The groom's attire is not just</span>
              <span className="block block2">a suit; it's a statement of his style</span>
              <span className="block block2">and the beginning of a beautiful journey.</span>
            </h2>
          </div>
          <Link
            to="/outfitGroom"
            className=" button_correcting relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
          >
            <span className="relative collection px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Show Collections
            </span> 
          </Link>
        </div>

        <div className="aboutpage">
          <h1 className="about_tag">About us</h1>
          <p className="about_us_details">
            Explore our exquisite bridal and groom costume collection that caters to
            your unique style and personality. For brides, we offer a wide range of
            dresses, gowns, sarees, and accessories, from timeless classics to
            contemporary designs. Grooms can elevate their wedding day style with our
            selection of tuxedos, suits, sherwanis, and kurta sets, ensuring a sharp
            and confident appearance at the altar. What sets us apart is our commitment
            to quality and attention to detail, sourced from reputable designers and
            manufacturers. Our diverse range of styles, customization options, and
            affordability make luxury accessible to all. Our experienced team is ready
            to provide expert guidance, helping you select the perfect costume to make
            your special day truly memorable. Let us be a part of your journey to "I
            do." Contact us today for inquiries, custom orders, or any assistance you
            may need—we look forward to being a part of your wedding story.
          </p>
        </div>

        <div></div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
