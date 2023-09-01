import React, { useEffect, useState } from 'react'
import "../styles/Hero.css"
import {Link} from "react-router-dom";
import { FaArrowRight } from 'react-icons/fa6';

export default function Hero() {

  const [data, setData] = useState({
    totalUsers: "",
    totalPosts: "",
    totalLikes: "",
    totalComments: ""
  })

  useEffect(()=>{
    setData({
      totalUsers:formatNumber(800),
      totalPosts: formatNumber(1500),
      totalLikes: formatNumber(39100),
      totalComments: formatNumber(54620)
    })
  },[])

  function formatNumber(number) {
    if (number < 1000) {
      return number.toString(); // No need to abbreviate
    } else if (number < 1000000) {
      return (number / 1000).toFixed(1) + 'K';
    } else {
      return (number / 1000000).toFixed(1) + 'M';
    }
  }
  
  
  
  return (
    <section id='hero'>
      <div className="welcome-container">
        <h1 className="title">Welcome to SocialSphere 👋🏼</h1>
        <p className="text">Discover a 🌍 of connections and limitless horizons with SocialSphere.<br/> ✨ It's your time to explore! 🚀🌟</p>
        <Link  className='join' to="/signup" >Join now <div className="icon"><FaArrowRight size={14}/></div> </Link>
      </div>
      <div className="image">
        <img src='../assets/banner.jpg'/>
      </div>
      <div className="info">
        <div className="user-info">
          <div className="number">{data.totalUsers}</div>
          <div className="title">users</div>
        </div>
        <div className="post-info">
          <div className="number">{data.totalPosts}</div>
          <div className="title">posts</div>
        </div>
        <div className="like-info">
          <div className="number">{data.totalLikes}</div>
          <div className="title">likes</div>
        </div>
        <div className="comment-info">
          <div className="number">{data.totalComments}</div>
          <div className="title">comments</div>
        </div>
      </div>
      <div className="line">
        <span className="circle left"></span>
        <span className="circle right"></span>
      </div>
    </section>
  )
}
