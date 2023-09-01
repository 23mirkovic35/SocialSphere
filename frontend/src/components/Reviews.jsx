import React from 'react'
import Review from './Review'
import '../styles/Reviews.css'
import { FaArrowRight } from 'react-icons/fa6';
import 'swiper/css'; // Import Swiper styles
import 'swiper/css/navigation'; // Import additional modules if needed
import 'swiper/css/pagination'; // Import additional modules if needed
import { Swiper, SwiperSlide } from 'swiper/react';

export default function Reviews() {

  const reviwes = [
    {
      id:0,
      author: "Milica Golubović",
      username: "milica_golubovic",
      image: "../assets/milica.png",
      title: "Great App!",
      text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab eaque quo veritatis modi nihil ad dolorum assumenda eius exercitationem sint, iste, id neque similique ullam? Totam vitae nesciunt eos explicabo?",
      rating: 5
    },
    {
      id:1,
      author: "Marko Mitrovic",
      username: "maremitrovic",
      image: "../assets/mare.png",
      title: "Better then Facebook",
      text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab eaque quo veritatis modi nihil ad dolorum assumenda eius exercitationem sint, iste, id neque similique ullam? Totam vitae nesciunt eos explicabo?",
      rating: 4
    },
    {
      id:2,
      author: "Miroslav Mirković",
      username: "mmirkovic99",
      image: "../assets/ja.jpg",
      title: "I like it a lot!",
      text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab eaque quo veritatis modi nihil ad dolorum assumenda eius exercitationem sint, iste, id neque similique ullam? Totam vitae nesciunt eos explicabo?",
      rating: 5
    },
    {
      id:3,
      author: "Nenad Mirković",
      username: "nenad.mirkovic98",
      image: "../assets/nenad.png",
      title: "I don't like it at all",
      text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab eaque quo veritatis modi nihil ad dolorum assumenda eius exercitationem sint, iste, id neque similique ullam? Totam vitae nesciunt eos explicabo?",
      rating: 2
    },
    {
      id:4,
      author: "Predrag Mirković",
      username: "pedja.mirkovic98",
      image: "../assets/pedja.jpg",
      title: "Much space to improve",
      text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab eaque quo veritatis modi nihil ad dolorum assumenda eius exercitationem sint, iste, id neque similique ullam? Totam vitae nesciunt eos explicabo?",
      rating: 3
    },     
  ]

  return (
    <section id="reviews">
        <h1 className="section-title">
          Our reviews
        </h1>
        <div className="reviews-container">
          <Swiper
            freeMode = {true}
            grabCursor={true}
            spaceBetween={0}
            slidesPerView={4}
            navigation={false}
            breakpoints={{
              350: {
                slidesPerView: 1,
              },
              640: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 3,
              },
              1024: {
                slidesPerView: 4,
              },
            }}
          >
            {reviwes.map(review=><SwiperSlide key={review.id} className="swiper-slide"><Review key={review.id} {...review}/></SwiperSlide>)}
            

          </Swiper>
        </div>
        <div className="btn-container">
          <button className='show-all'>Show all <div className="icon"><FaArrowRight size={14}/></div></button>
        </div>
    </section>
  )
}
