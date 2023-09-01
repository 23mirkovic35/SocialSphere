import React, { useState } from 'react'
import '../styles/About.css'
import { FaArrowRight } from 'react-icons/fa6';
import ReadMore from './ReadMore';

function About() {

  const [showMore,setShowMore] = useState(false)

  return (
    <section className='About' id='about'>
      <h1 className="title">About us</h1>
      <div className="content">
        <div className="image">
          <img id='img-about' src='../assets/about.jpg' />
        </div>
        <div className="text">
          <div className="title-text">What is <span>SocialSphere</span>? 👇🏻</div>
          <div className="text-content"> 
            We are more than just a social network – we are a community that connects people worldwide through passionate interests, shared goals, and priceless moments.
            In SocialSphere, we believe that every face holds a story worth telling, and every comment, photo, or video can build bridges between us. We are made up of diversity, and it's precisely that diversity that we celebrate – fostering dialogues that inspire, promote growth, and open new horizons.
          </div>
          <button className='read-btn' onClick={()=>setShowMore(true)}> Read more <div className="icon"><FaArrowRight size={14}/></div></button>
        </div>
      </div>
      {showMore===true && <ReadMore setShowMore = {setShowMore}/>}
    </section>
  )
}

export default About;