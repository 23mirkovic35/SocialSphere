import React from 'react'
import '../styles/Review.css'
import {FaStar} from 'react-icons/fa6';

function Review(props) {
  const {id, author,username, image, title, text, rating} = props

  const renderStar = () => {
    const items = [];
    for (let i = 0; i < 5; i++) {
        if(i<rating) 
            items.push(<FaStar size={25} color='#FFD700'/>);
        else 
            items.push(<FaStar size={25} color='rgba(171, 171, 171, 0.324)'/> )    
    }
    return items;
  }
  return (
    <div className='Review'>
        <div className="user-info">
            <div className="image">
                <img src={image} className='review-img'/>
            </div>
            <div className="other-info">
                <div className="name">{author}</div>
                <div className="username">@{username}</div>
            </div>
        </div>
        {/*<div className="review-date">August 16th 2023</div>*/}
        <div className="review-content">
            <div className="review-title">
                {title}
            </div>
            <div className="review-text"> {text} </div>
        </div>
        <div className="rating">
            {renderStar()}
        </div>
    </div>
  )
}

export default Review;