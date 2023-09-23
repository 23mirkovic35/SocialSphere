import React, { useEffect, useState } from "react";
import Review from "./Review";
import "../styles/Reviews.css";
import { FaArrowRight } from "react-icons/fa6";
import "swiper/css"; // Import Swiper styles
import "swiper/css/navigation"; // Import additional modules if needed
import "swiper/css/pagination"; // Import additional modules if needed
import { Swiper, SwiperSlide } from "swiper/react";
import axios from "axios";

export default function Reviews() {
  const [reviwes, setReviews] = useState([]);

  useEffect(() => {
    axios
      .post("http://localhost:5000/users/getAllReviews", {})
      .then((response) => {
        setReviews(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <section id="reviews">
      <h1 className="section-title">Our reviews</h1>
      <div className="reviews-container">
        <Swiper
          freeMode={true}
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
          {reviwes.map((review) => (
            <SwiperSlide key={review.id} className="swiper-slide">
              <Review key={review.id} {...review} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
