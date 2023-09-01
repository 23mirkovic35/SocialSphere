import React, { useState } from 'react'
import '../styles/Home.css'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import About from '../components/About'
import Contact from '../components/Contact'
import Reviews from '../components/Reviews'

export default function Home() {
  return (
    <div className='Home'>
      <Navbar isHome = {true}/>
      <Hero/>
      <About/>
      <Reviews/>
      <Contact/>
    </div>
  )
}
