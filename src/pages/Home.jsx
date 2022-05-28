import React from 'react'
import Announcement from '../components/Announcement'
import Categories from '../components/Categories'
import Navbar from '../components/Navbar'
import Slider from '../components/Slider'
import Products from '../components/Products'
import Newsletter from '../components/Newsletter'
import Footer from '../components/Footer'


const Home = () => {
  return (
    <>
    <Announcement text={'Super Deal! Free Shipping on Orders over ₹999'}/>
    <Navbar />
    <Slider />
    <Categories />
    <Products />
    <Newsletter />
    <Footer />
    </>
  )
}

export default Home